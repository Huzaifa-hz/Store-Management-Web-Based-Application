const functions = require("firebase-functions");
const admin =require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
// const createNotification=((notification)=>{
//     return admin.firestore().collection('notifications')
//     .add(notification)
//     .then(doc=>console.log('notification added',doc));

// });

// exports.userAdded=functions.firestore
// .document('users/{userId}')
// .onCreate(doc=>{
//     const user=doc.data();
//     const notification={
//         content:'Added a new project',
//         user:`${user.username}`,
//         time: admin.firestore.FieldValue.serverTimestamp(),
//     }

//     return createNotification(notification);
// });


