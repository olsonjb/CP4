<template>
  <div class="notes">
    <h1>The Notes Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Create a note</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title" />
        <p></p>
        <textarea v-model="note" placeholder="Description" />
        <p></p>
      </div>
      <div class="upload" v-if="addNote">
        <h2>{{ addNote.title }}</h2>
        <p>{{ addNote.note }}</p>
      </div>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectNote(s)"
          >
            {{ s.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findNote">
        <input v-model="findNote.title" />
        <p></p>
        <textarea v-model="findNote.note" />
        <p></p>
        <img :src="findNote.path" />
      </div>
      
    </div>
  </div>
</template>

<script>
/*
<div class="actions" v-if="findNote">
    <button @click="deleteNote(findNote)">Delete</button>
    <button @click="editNote(findNote)">Edit</button>
</div>
*/
import axios from "axios";
export default {
  name: "NotesView",
  data() {
    return {
      title: "",
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
          note: this.note,
        });
        this.addNote = r2.data;
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
      this.findTitle = "";
      this.findNote = note;
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
.image h2 {
  font-style: italic;
  font-size: 1em;
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
.add,
.edit {
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