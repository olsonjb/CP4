<template>
  <div id="app">
    <div class="header">
      <div class="title">
        <h1>General Conference Notes</h1>
      </div>
      <ul>
        <li><router-link to="/">Notes</router-link></li>
        <li><router-link to="/speakers">Speakers</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/olsonjb/CP4"
        >https://github.com/olsonjb/CP4</a
      >
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}
/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: maroon;
  color: white;
}
.title {
  margin-top: 5px;
}
.title h1 {
  font-size: 30px;
}
.content {
  padding: 20px 100px;
  min-height: 500px;
}
/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
  display: flex;
  justify-content: center;
}
.footer a {
  color: #000;
}
h1 {
  font-size: 24px;
}
h2 {
  font-size: 14px;
}

.row {
  display: flex;
  padding: 0.2em;
}

.row input {
  flex: 1;
}

.row textarea {
  flex: 1;
  height: 6em;
}

.header ul {
  list-style-type: none;
  margin-left: 2em;
  padding: 0;
  color: white;
}

.header li {
  display: inline-flex;
  padding: 1.3em 1.5em 0 0;
}

.header a {
  color: white;
}
</style>
