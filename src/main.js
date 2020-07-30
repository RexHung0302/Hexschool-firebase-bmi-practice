import Vue from "vue";
import App from "./App.vue";

// FireBase
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;
Vue.prototype.$firebaseDb = firebaseApp.database();

Vue.use(firestorePlugin);

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// moment
import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
