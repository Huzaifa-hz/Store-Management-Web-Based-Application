
const { auth } = require("firebase-admin");
const { query, collection, getDocs, where } = require("firebase/firestore");
const { useState, useEffect } = require("react");
// const { auth } = require("../src/FirebaseConfigs/firebaseConfig");

 
 function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();
module.export.loggeduser=loggeduser;
    