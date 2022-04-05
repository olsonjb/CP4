<template>
  <div class="speakers">
    <div class="edit" style="width: 25em" v-if="findSpeaker">
      <h1>Edit Speaker</h1>
      <div class="row">
        <input v-model="findSpeaker.name" placeholder="Speaker Name" />
      </div>
      <div class="row">
        <input v-model="findSpeaker.calling" placeholder="Calling/Position" />
      </div>
      <div class="row">
        <input
          v-model="findSpeaker.nationality"
          placeholder="Country of Birth"
        />
      </div>
      <div class="row">
        <textarea v-model="findSpeaker.bio" placeholder="Biography/Other" />
      </div>
      <div class="speaker-actions">
        <button @click="selectSpeaker(null)">Cancel</button>
        <button @click="editSpeaker(findSpeaker)">Save changes</button>
      </div>
    </div>
    <h1>Speakers (A - Z)</h1>
    <hr />
    <section class="list">
      <div v-for="speaker in speakers" :key="speaker.id">
        <div class="row">
          <img style="height: 12em" :src="speaker.photoPath" />
          <div style="padding-left: 3em; display: flex; flex-direction: column">
            <h2 style="margin: 0">{{ speaker.name }}</h2>
            <p style="margin: 0.2em 0 0.5em">
              <em>{{ speaker.calling }} - Born in {{ speaker.nationality }}</em>
            </p>
            <p style="margin: 0">{{ speaker.bio }}</p>
          </div>
        </div>
        <div class="speaker-actions">
          <button @click="selectSpeaker(speaker)">Edit</button>
          <button @click="deleteSpeaker(speaker)">Delete</button>
        </div>
        <hr />
      </div>
    </section>
    <h1>Add a New Speaker</h1>
    <div class="add">
      <div style="width: 25em" class="form">
        <div class="row">
          <input v-model="name" placeholder="Speaker Name" />
        </div>
        <div class="row">
          <input v-model="calling" placeholder="Calling/Position" />
        </div>
        <div class="row">
          <input v-model="nationality" placeholder="Country of Birth" />
        </div>
        <div class="row">
          <textarea v-model="bio" placeholder="Biography/Other" />
        </div>
        <div class="row">
          <input type="file" name="photo" @change="fileChanged" />
        </div>
        <button @click="upload" style="margin-top: 1em">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SpeakersView",
  data() {
    return {
      name: "",
      calling: "",
      nationality: "",
      bio: "",
      file: null,
      addSpeaker: null,
      speakers: [],
      findTitle: "",
      findSpeaker: null,
    };
  },
  created() {
    this.getSpeakers();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/speakers", {
          name: this.name,
          calling: this.calling,
          nationality: this.nationality,
          bio: this.bio,
          photoPath: r1.data.photoPath,
        });
        this.addSpeaker = r2.data;
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async getSpeakers() {
      try {
        let response = await axios.get("/api/speakers");
        this.speakers = response.data;
        this.speakers.sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectSpeaker(speaker) {
      this.findSpeaker = speaker;
      this.getSpeakers();
    },
    async deleteSpeaker(speaker) {
      try {
        await axios.delete("/api/speakers/" + speaker._id);
        this.findSpeaker = null;
        this.getSpeakers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editSpeaker(speaker) {
      try {
        await axios.put("/api/speakers/" + speaker._id, {
          name: this.findSpeaker.name,
          calling: this.findSpeaker.calling,
          nationality: this.findSpeaker.nationality,
          bio: this.findSpeaker.bio,
        });
        this.findSpeaker = null;
        this.getSpeakers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.speaker-actions {
  display: flex;
  padding-top: 1em;
}

.speaker-actions button {
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
