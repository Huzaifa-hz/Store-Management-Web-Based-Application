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
import CostumerCard from './CustomerCard';
import AdminHome from './AdminHome';


const AllSupplierDetails = () => {

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
   

    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {

        const getSuppliers = () => {

            const suppliersArray = [];
            const path = `suppliers`
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    suppliersArray.push({ ...doc.data(), id: doc.id })
                });
                setSuppliers(suppliersArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getSuppliers();
    }, [])



  return (
    <div className='allproductpage'>
      <AdminHome/>
      <div className="allproductcontainer">
            {suppliers.map((supplier) => (
                <SupplierContainer
                    key={supplier.id}
                    supplier={supplier}
                />   ))}
        </div>
    </div>
  )
}

export default AllSupplierDetails

