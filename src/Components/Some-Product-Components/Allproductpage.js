import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import './Allproductpage.css'
import Productcontainer from './Productcontainer'
import {
    collection,
    query,
    onSnapshot, getDocs,where
} from "firebase/firestore";

import ProductContainerAdmin from './ProductContainerAdmin'; 
import { storage, auth, db } from '../../FirebaseConfigs/firebaseConfig'





const Allproductpage = (props) => {

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


    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = () => {

            const productsArray = [];
            const path = `products-${props.type.toUpperCase()}`
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    productsArray.push({ ...doc.data(), id: doc.id })
                });
                setProducts(productsArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getProducts();
    }, [])


    return (
        <div className='allproductpage'>
            <Navbar />
           
            <div className='heading'>
                <p>Top Results For {props.type}</p>
            </div>
            {loggeduser && loggeduser[0].email == "hozef110@gmail.com" ?
            <div className="allproductcontainer">
            {products.map((product) => (
                <ProductContainerAdmin
                    key={product.id}
                    product={product}
                />   ))}
        </div>
            

            : <div className="allproductcontainer">
            {products.map((product) => (
                <Productcontainer
                    key={product.id}
                    product={product}
                />   ))}
        </div>
            
            
            }

        </div>
    )
}

export default Allproductpage