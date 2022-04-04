import Vue from "vue";
import VueRouter from "vue-router";
import NotesView from "../views/NotesView.vue";
import SpeakersView from "../views/SpeakersView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "notes",
    component: NotesView,
  },
  {
    path: "/speakers",
    name: "speakers",
    component: SpeakersView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
