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
            <div className='producttitle'>{s.supplierName}</div>
        </a>

        <div className='price-container'>
            <div className='saleprice'>contact: {s.supplierContact}</div>
            <div className='yousave'>{s.supplierAddress}</div>
        </div>

    

    </div>
</div >
  )
}

export default SupplierContainer
