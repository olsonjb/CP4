<template>
  <div class="notes">
    <div class="edit" style="width: 25em" v-if="findNote">
      <h1>Edit Note</h1>
      <div class="row">
        <input v-model="findNote.title" placeholder="Note Title" />
      </div>
      <div class="row">
        <input v-model="findNote.speaker" placeholder="Speaker" />
      </div>
      <div class="row">
        <input v-model="findNote.session" placeholder="Session" />
      </div>
      <div class="row">
        <textarea v-model="findNote.note" placeholder="Note" />
      </div>
      <div class="note-actions">
        <button @click="selectNote(null)">Cancel</button>
        <button @click="editNote(findNote)">Save changes</button>
      </div>
    </div>
    <h1>Notes</h1>
    <hr />
    <section class="list">
      <div v-for="note in notes" :key="note.id">
        <h2>{{ note.title }}</h2>
        <p>
          <em>{{ note.speaker }} - {{ note.session }}</em>
        </p>
        <p>{{ note.note }}</p>
        <div class="note-actions">
          <button @click="selectNote(note)">Edit</button>
          <button @click="deleteNote(note)">Delete</button>
        </div>
        <hr />
      </div>
    </section>
    <h1>Add a New Note</h1>
    <div class="add">
      <div style="width: 25em" class="form">
        <div class="row">
          <input v-model="title" placeholder="Note Title" />
        </div>
        <div class="row">
          <input v-model="speaker" placeholder="Speaker" />
        </div>
        <div class="row">
          <input v-model="session" placeholder="Session" />
        </div>
        <div class="row">
          <textarea v-model="note" placeholder="Note" />
        </div>
        <button @click="upload" style="margin-top: 1em">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NotesView",
  data() {
    return {
      title: "",
      speaker: "",
      session: "",
      note: "",
      file: null,
      addNote: null,
      notes: [],
      findTitle: "",
      findNote: null,
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        let r2 = await axios.post("/api/notes", {
          title: this.title,
          speaker: this.speaker,
          session: this.session,
          note: this.note,
        });
        this.addNote = r2.data;
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async getNotes() {
      try {
        let response = await axios.get("/api/notes");
        this.notes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectNote(note) {
      this.findNote = note;
      this.getNotes();
    },
    async deleteNote(note) {
      try {
        await axios.delete("/api/notes/" + note._id);
        this.findNote = null;
        this.getNotes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editNote(note) {
      try {
        await axios.put("/api/notes/" + note._id, {
          title: this.findNote.title,
          speaker: this.findNote.speaker,
          session: this.findNote.session,
          note: this.findNote.note,
        });
        this.findNote = null;
        this.getNotes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.note-actions {
  display: flex;
  padding-top: 1em;
}

.note-actions button {
  margin-right: 0.7em;
}

button {
  color: maroon;
  border: maroon 1px solid;
  padding: 0.2em 1em;
  border-radius: 1em;
}

h2 {
  font-style: italic;
  font-size: 1.2em;
}
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}
.add {
  display: flex;
}
.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}
/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}
.form {
  margin-right: 50px;
}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}
.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}
.suggestion {
  min-height: 20px;
}
.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}
</style>
