importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js");
firebase.initializeApp({
 apiKey: "AIzaSyBpum75p79wKX1SP2mARoEUAKAECSASCYI",
 authDomain: "kroellsbankangularpush.firebaseapp.com",
 projectId: "kroellsbankangularpush",
 storageBucket: "kroellsbankangularpush.appspot.com",
 messagingSenderId: "664529036706",
 appId: "1:664529036706:web:92af617bcf6a929b9ebefb"
});
const messaging = firebase.messaging();