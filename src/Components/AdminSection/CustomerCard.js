import React from 'react'
import './CustomerCard.css'
import { Link } from 'react-router-dom';

const CustomerCard = (user) => {

    let s=user.user;

  return (
    <div className='product-container'>

    {/* <img src={s.cardImage}> </img> */}
    <div className='product-details'>
        <a href={`/users/${s.id}`}>
            <button className='producttitle'>{s.username}</button>
        </a>

        <div className='price-container'>
            <p className='saleprice'>{s.phonenumber}</p>
            <p className='yousave'>{s.email}</p>
        </div>
    </div>
</div >

  )
}

export default CustomerCard
