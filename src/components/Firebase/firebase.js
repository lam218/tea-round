import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import friends from "./friends";
import drinks from "./drinks";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.Friends = friends(this.auth, this.db);
    this.Drinks = drinks(this.auth, this.db);
  }
  doCreateUserWithEmailAndPassword = (email, displayName, password) => {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return this.db
          .ref("/users/" + this.auth.currentUser.uid + "/details")
          .set({ uid: this.auth.currentUser.uid, email, name: displayName });
      });
  };

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  addUserData = todos => {
    this.db
      .ref("users/" + this.auth.currentUser.uid)
      .set({
        todos
      })
      .catch(err => console.error(err));
  };
  getData = () => {
    const userId = this.auth.currentUser.uid;
    return this.db
      .ref("/users/" + userId)
      .once("value")
      .then(function(snapshot) {
        let todos = (snapshot.val() && snapshot.val().todos) || [];
        return todos;
      });
  };
}

export default Firebase;
