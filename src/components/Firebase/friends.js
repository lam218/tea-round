const friends = (auth, db) => ({
  acceptFriend: function(user, key) {
    return db
      .ref("users/")
      .once("value")
      .then(snapshot => {
        let users = snapshot.val() || [];
        const currentUid = auth.currentUser.uid;
        let friendKey = Object.values(users)
          .map((newUser, i) => {
            if (newUser.details.uid === user.uid) {
              let friends = Object.values(newUser.friends)
                .map((friend, i) => ({
                  uid: friend.uid,
                  key: Object.keys(newUser.friends)[i]
                }))
                .filter(f => f.uid === currentUid);
              return friends[0].key;
            }
            return false;
          })
          .filter(fin => fin !== false)[0];
        if (friendKey && user && user.uid !== currentUid) {
          db.ref("users/" + user.uid + "/friends/" + friendKey).set({
            email: auth.currentUser.email,
            uid: currentUid,
            outbound: false,
            invited: true,
            accepted: true
          });
          return db
            .ref("users/" + currentUid + "/friends/" + key)
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
  },
  inviteFriend: function(email) {
    db.ref("users/" + auth.currentUser.uid + "/inviteFriends").remove();
    let name = auth.currentUser.displayName;
    return db
      .ref("users/" + auth.currentUser.uid + "/inviteFriends")
      .set({ email, inviteName: name });
  },
  removeFriend: function(user, ourKey) {
    const currentUid = auth.currentUser.uid;
    db.ref("users/" + user.uid + "/friends")
      .once("value")
      .then(snapshot => {
        let snapshotUser = snapshot.val() || [];

        let newKey = Object.values(snapshotUser)
          .map((friend, i) => ({
            uid: friend.uid,
            key: Object.keys(snapshotUser)[i]
          }))
          .filter(f => f.uid === currentUid)[0].key;
        return db.ref("users/" + user.uid + "/friends/" + newKey).remove();
      });
    return db
      .ref("users/" + auth.currentUser.uid + "/friends/" + ourKey)
      .remove();
  },
  getFriends: function() {
    return db
      .ref("users/" + auth.currentUser.uid + "/friends")
      .once("value")
      .then(snapshot => {
        let friends = snapshot.val() || [];
        return friends;
      });
  },
  addFriend: function(email) {
    return db
      .ref("users/")
      .once("value")
      .then(snapshot => {
        let users = snapshot.val() || [];
        let userFound = Object.values(users).find(
          user => user.details.email === email
        );
        if (userFound && userFound.details.uid !== auth.currentUser.uid) {
          db.ref("users/" + userFound.details.uid + "/friends").push({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            outbound: false,
            invited: true,
            accepted: false
          });
          return db
            .ref("users/" + auth.currentUser.uid + "/friends/")
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
  }
});

export default friends;
