import React from 'react'
import './CustomerCard.css'

const SaleContainer = (sale) => {
    let s=sale.sale
   
    return (
      <div className='product-container'>
  
      {/* <img src={s.cardImage}></img> */}
      <div className='product-details'>
          <a href={`/sales/${s.id}`}>
              <div className='producttitle'>{s.customerName}</div>
          </a>
  
          <div className='price-container'>
              <div className='saleprice'>{s.producttitle}</div>
              <div className='yousave'>Quantity:{s.quantity}</div>
              <div className='yousave'>per piece : {s.price}</div>
          </div>
  
      
  
      </div>
  </div >
    )
}

export default SaleContainer
