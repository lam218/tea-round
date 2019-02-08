const drinks = (auth, db) => ({
  initializeTeaRound: function(friends) {
    let friendEmails = friends.map(friend => friend.email);
    db.ref("users/" + auth.currentUser.uid + "/teaRound").update({
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      friends: friendEmails,
      time: Date.now(),
      completed: false
    });
  },
  completeTeaRound: function() {},
  addDrink: function(drink, id, notes) {
    db.ref("users/" + id + "/teaRound/drinks").push({
      drink,
      email: auth.currentUser.email,
      notes
    });
  },
  removeDrink: function(id, key) {
    db.ref("users/" + id + "/teaRound/drinks/" + key).remove();
  },
  updateDrink: function(id, key, drink, notes) {
    if (notes && drink) {
      return db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        drink,
        email: auth.currentUser.email,
        notes
      });
    } else if (notes) {
      return db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        email: auth.currentUser.email,
        notes
      });
    } else if (drink) {
      return db.ref("users/" + id + "/teaRound/drinks/" + key).update({
        drink,
        email: auth.currentUser.email
      });
    } else return;
  },
  getDrinks: function(id) {
    return db
      .ref("users/" + id + "/teaRound/drinks")
      .once("value")
      .then(snapshot => {
        let drinks = snapshot.val() || [];
        return drinks;
      });
  },
  getTeaRounds: function() {
    return db
      .ref("users")
      .once("value")
      .then(snapshot => {
        let users = snapshot.val() || [];
        let teaRounds = Object.values(users)
          .map(user => {
            if (user.teaRound) {
              return user.teaRound;
            }
            return false;
          })
          .filter(round => round !== false);
        return teaRounds;
      });
  }
});

export default drinks;
