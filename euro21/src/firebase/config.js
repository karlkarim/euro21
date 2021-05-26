import firebase from 'firebase';
  var firebaseConfig = firebase.initializeApp(({
    apiKey: "AIzaSyBQXUvRNJTpSfVHBiM1NB6j-J187Vl1fUo",
    authDomain: "euro21-7ec8d.firebaseapp.com",
    projectId: "euro21-7ec8d",
    storageBucket: "euro21-7ec8d.appspot.com",
    messagingSenderId: "671944788046",
    appId: "1:671944788046:web:fa2b42a1883a6265285b1f"
  }));

  const db = firebaseConfig.firestore();
  const auth = firebase.auth()
  export { db, auth };
