import React, { useState, useEffect } from 'react'

import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where,deleteDoc,doc, addDoc } from 'firebase/firestore'
import CartCard from './CartCard'
import './Cart.css'
import { Link } from 'react-router-dom'


const Cart = () => {
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


    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(path)
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
                // console.log('done')
            }).catch('Error error error')

        }
        getcartdata()
    }

    
//--------------------------------------------------------------

    const deletcartitem = async (path,document) => {
        // await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)).then(() => { console.log('doc deleted') })
        await deleteDoc(doc(db, path,document)).then(() => { console.log('doc deleted') })
    }
//----------------------------------------------------------------------    
        const clearCart = () => {

            //const productsArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    deletcartitem(path,doc.id)
                    
                });
                // console.log('done')
            }).catch('Error error error')
        }

//________________________________________________________________________________________  

const addHistory = ()=>{
    let path = `cart-${loggeduser[0].uid}`;
    getDocs(collection(db, path)).then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {

            //   let producttitle=doc.data().producttitle
            //   console.log(producttitle)
            //   let price=doc.data().price
            //   console.log(price)
              let quantity=doc.data().quantity
              console.log(doc.data())
            addDoc(collection(db, `sales-history`),{
                producttitle:doc.data().product.producttitle,
                price:doc.data().product.price,
                quantity:doc.data().quantity,
                customerId:loggeduser[0].uid,
                customerName:loggeduser[0].username
            }).then(() => {
                console.log('Product added successfully');

            }).catch((error) => {console.log(error) });
            
            // console.log(doc.id, " => ", doc.data());
            // usersArray.push({ ...doc.data(), id: doc.id })
        });
    }).catch('Error error error')

    }

    const historyadding=async()=>{
        await addHistory();
        await clearCart();
    }
//__________________________________________________________________________________________


    return (
        <div>
            <Navbar />

            {cartdata ?
                <div>
                    <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
                        {cartdata.map((item) => (
                            <CartCard
                                key={item.id}
                                itemdata={item}
                                userid={loggeduser[0].uid}
                            />
                        ))}
                        <div className='proceed'>
                           <button onClick={historyadding}>Buy</button> 
                        </div>
                    </div>

                </div>
                : <p>Your Cart is empty</p>}
        </div>
    )
}

export default Cart