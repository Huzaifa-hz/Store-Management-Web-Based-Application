import React, { useEffect } from 'react'
import './ProductContainerAdmin.css'
import { Link } from 'react-router-dom';
import deleteIcon from '../assets/delete-icon.png';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from '../../FirebaseConfigs/firebaseConfig';

const ProductContainerAdmin = (product) => {
    
    // console.log(p)
     let p = product.product
    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;

      let mrp = Math.floor(p.price)
      mrp = Math.floor(mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp)
      const saleprice = Math.floor(mrp - extraforfun * mrp)
    
    
      const deleteitem = async () => {
        
        await deleteDoc(doc(db, `products-${p.producttype.toUpperCase()}`, `${p.id}`)).then(() => { console.log('doc deleted') })
      
    }

    const sty={
        width : "50px"
    }

    return (
        <div className='product-container'>
            <img className='delete-icon'  style={sty}onClick={deleteitem}   src={deleteIcon}/> 
            <img src={p.prodimage}/> 
            <div className='product-details'>
                <a href={`/product/${p.producttype}/${p.id}`}>
                    <button className='producttitle'>{p.producttitle}</button>
                </a>

                <div className='price-container'>
                    <p className='mrp'>MRP: <p className='rate'>₹{mrp}</p></p>
                    <p className='saleprice'>Discount Price: <p className='rate'>₹{parseInt(product.product.price)}</p></p>
                    <p className='yousave'>You Save: ₹{mrp - saleprice}</p>
                </div>
                <Link to={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details &gt;</button></Link>

            </div>
        </div >
    )
}

export default ProductContainerAdmin