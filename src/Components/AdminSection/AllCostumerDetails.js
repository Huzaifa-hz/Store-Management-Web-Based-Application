import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import './AllSupplierDetails.css'
//import Productcontainer from './Productcontainer'
import SupplierContainer from './SupplierContainer'
import {
    collection,
    query,
    onSnapshot, getDocs,where
} from "firebase/firestore";

//import ProductContainerAdmin from './ProductContainerAdmin'; 
import { storage, auth, db } from '../../FirebaseConfigs/firebaseConfig'
import AdminHome from './AdminHome';
import CostumerCard from './CustomerCard';

const AllCostumerDetails = () => {

    

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


    const [users, setUsers] = useState([]);
    useEffect(() => {

        const getUsers = () => {

            const usersArray = [];
            const path = 'users'
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    usersArray.push({ ...doc.data(), id: doc.id })
                });
                setUsers(usersArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getUsers();
    }, [])



  return (
    <div className='allproductpage'>
    <AdminHome/>
    <div className="allproductcontainer">
          {users.map((user) => (
              <CostumerCard
                  key={user.id}
                  user={user}
              />   ))}
      </div>
  </div>
  )
}

export default AllCostumerDetails
