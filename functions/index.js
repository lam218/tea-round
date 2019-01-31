// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

//const gmailEmail = functions.config().gmail.email;
//const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "lucyamurray@gmail.com",
    pass: "sqeljsqrznzzylyk"
  },
  tls: {
    rejectUnauthorized: false
  }
});
exports.callTeaRound = functions.database
  .ref("users/{uid}/teaRound")
  .onUpdate((change, context) => {
    const snapshot = change.after;
    const val = snapshot.val();
    
    console.log(val.friends)
    const mailOptions = {
      from: '"Tea round" <lucyamurray@gmail.com>',
      to: val.friends
    };
    mailOptions.subject = "Tea or coffee?";
    mailOptions.text = "Would you like to have a tea or coffee";
    return mailTransport
      .sendMail(mailOptions)
      .then(() => console.log("Its sent"))
      .catch(err => console.error(err));
  });
