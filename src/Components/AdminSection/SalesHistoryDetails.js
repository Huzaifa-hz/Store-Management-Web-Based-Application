import React, { useState, useEffect } from 'react'
import './AllCustomerDetails.css'
import {
    collection,
    query,
    onSnapshot, getDocs,where
} from "firebase/firestore";
import { storage, auth, db } from '../../FirebaseConfigs/firebaseConfig'
import AdminHome from './AdminHome';
import SaleContainer from './SaleContainer';

const SalesHistoryDetails = () => {

  const [sales, setSales] = useState([]);
    useEffect(() => { 

        const getSales = () => {

            const salesArray = [];
            const path = `sales-history`
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    salesArray.push({ ...doc.data(), id: doc.id })
                });
                setSales(salesArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getSales();
    }, [])





    
  return (
    <div className='allproductpage'>
      <AdminHome/>
      <div className="allproductcontainer">
            {sales.map((sale) => (
                <SaleContainer
                    key={sale.id}
                    sale={sale}
                />   ))}
        </div>
    </div>
  )
}

export default SalesHistoryDetails
