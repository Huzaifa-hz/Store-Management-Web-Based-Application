import React from 'react'
import './SupplierContainer.css'
import { Link } from 'react-router-dom';



const SupplierContainer = (supplier) => {

    let s =supplier.supplier
  return (
    <div className='product-container'>

    <img src={s.cardImage}></img>
    <div className='product-details'>
        <a href={`/suppliers/${s.id}`}>
            <button className='producttitle'>{s.supplierName}</button>
        </a>

        <div className='price-container'>
            <p className='saleprice'>{s.supplierContact}</p>
            <p className='yousave'>{s.supplierAddress}</p>
        </div>

    

    </div>
</div >
  )
}

export default SupplierContainer
