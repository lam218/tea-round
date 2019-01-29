
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.addUserToDB = functions.auth.user().onCreate(event => {
    debugger;
  admin.database().ref('/users/' + event.data.uid).set({
    name: event.data.name,
    email: event.data.email
  });
});