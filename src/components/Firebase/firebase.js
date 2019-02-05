import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
  addFriend = email => {
    return this.db
      .ref("users/")
      .once("value")
      .then(snapshot => {
        let users = snapshot.val() || [];
        let userFound = Object.values(users).find(
          user => user.details.email === email
        );
        if (userFound && userFound.details.uid !== this.auth.currentUser.uid) {
          this.db.ref("users/" + userFound.details.uid + "/friends").push({
            email: this.auth.currentUser.email,
            uid: this.auth.currentUser.uid,
            outbound: false,
            invited: true,
            accepted: false
          });
          return this.db
            .ref("users/" + this.auth.currentUser.uid + "/friends/")
            .push({
              email: userFound.details.email,
              uid: userFound.details.uid,
              outbound: true,
              invited: true,
              accepted: false
            })
            .catch(err => console.err(err));
        } else {
          return false;
        }
      });
  };
  acceptFriend = (user, key) => {
    return this.db
      .ref("users/")
      .once("value")
      .then(snapshot => {
        let users = snapshot.val() || [];
        let friendKey = Object.values(users)
          .map(
            (newUser, i) =>
              newUser.details.email === user.email &&
              Object.keys(newUser.friends)
          )
          .filter(key => key !== false)
          .concat([]);
        if (friendKey && user && user.uid !== this.auth.currentUser.uid) {
          this.db.ref("users/" + user.uid + "/friends/" + friendKey).set({
            email: this.auth.currentUser.email,
            uid: this.auth.currentUser.uid,
            outbound: false,
            invited: true,
            accepted: true
          });
          return this.db
            .ref("users/" + this.auth.currentUser.uid + "/friends/" + key)
            .set({
              email: user.email,
              uid: user.uid,
              outbound: true,
              invited: true,
              accepted: true
            })
            .catch(err => console.err(err));
        } else {
          return false;
        }
      });
  };
  inviteFriend = email => {
    this.db
      .ref("users/" + this.auth.currentUser.uid + "/inviteFriends")
      .remove();
    let name = this.auth.currentUser.displayName;
    return this.db
      .ref("users/" + this.auth.currentUser.uid + "/inviteFriends")
      .set({ email, inviteName: name });
  };
  removeFriend = (email, key) => {
    return this.db
      .ref("users/" + this.auth.currentUser.uid + "/friends/" + key)
      .remove();
  };
  getFriends = () => {
    return this.db
      .ref("users/" + this.auth.currentUser.uid + "/friends")
      .once("value")
      .then(snapshot => {
        let friends = snapshot.val() || [];
        return friends;
      });
  };
  initializeTeaRound = friends => {
    let friendEmails = friends.map(friend => friend.email);
    this.db.ref("users/" + this.auth.currentUser.uid + "/teaRound").update({
      uid: this.auth.currentUser.uid,
      email: this.auth.currentUser.email,
      friends: friendEmails,
      time: Date.now()
    });
  };
  addDrink = (drink, id, notes) => {
    this.db.ref("users/" + id + "/teaRound/drinks").push({
      drink,
      email: this.auth.currentUser.email,
      notes
    });
  };
  removeDrink = (id, key) => {
    this.db.ref("users/" + id + "/teaRound/drinks/" + key).remove();
  };
  updateDrink = (id, key, drink, notes) => {
    if (notes && drink) {
      return this.db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        drink,
        email: this.auth.currentUser.email,
        notes
      });
    } else if (notes) {
      return this.db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        email: this.auth.currentUser.email,
        notes
      });
    } else if (drink) {
      return this.db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        drink,
        email: this.auth.currentUser.email
      });
    } else return;
  };
  getDrinks = id => {
    return this.db
      .ref("users/" + id + "/teaRound/drinks")
      .once("value")
      .then(snapshot => {
        let drinks = snapshot.val() || [];
        return drinks;
      });
  };
}

export default Firebase;
