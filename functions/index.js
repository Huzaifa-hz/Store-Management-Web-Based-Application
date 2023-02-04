const functions = require("firebase-functions");
const admin =require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// import { useState,useEffect } from "react";
// import { storage, auth, db } from '../../FirebaseConfigs/firebaseConfig';
// import {
//     collection,
//     query,
//     onSnapshot, getDocs,where
// } from "firebase/firestore";
const loggeduser=require("./getuser.js");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//----------------------------------------------------------------------------------------------------------
const createNotification=((notification)=>{
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc=>console.log('notification added',doc));
});

exports.userAdded=functions.firestore
.document('users/{userId}')
.onCreate(doc=>{
    const user=doc.data();
    const notification={
        content:'Added a new project',
        user:`${user.username}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
}
    return createNotification(notification);
});
//--------------------------------------------------------------------------------------------------------

const createSalesHistory=((notification)=>{
    return admin.firestore().collection('sales')
    .add(sales)
    .then(doc=>console.log('notification added',doc));
});



// function GetCurrentUser() {
//     const [user, setUser] = useState("");
//     const usersCollectionRef = collection(db, "users");
//     useEffect(() => {
//         auth.onAuthStateChanged(userlogged => {
//             if (userlogged) {
//                 // console.log(userlogged.email)
//                 const getUsers = async () => {
//                     const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
//                     // console.log(q);
//                     const data = await getDocs(q);
//                     setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//                 };
//                 getUsers();
//             }
//             else {
//                 setUser(null);
//             }
//         })
//     }, [])
//     return user
// }
// const loggeduser = GetCurrentUser();

exports.billgeneration=functions.firestore.document(`cart-${loggeduser[0].uid}/{cartId}`)
.onDelete(change=>{
    const before=change.before.data()
    const sales={
        uid:`${loggeduser[0].uid}`,
        producttitle:`${before.producttitle}`,
        user:`${loggeduser[0].username}`,
        price:`${before.price}`,
        quantity:`${before.quantity}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
}
   createSalesHistory(sales)
})


