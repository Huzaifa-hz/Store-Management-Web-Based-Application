import React from 'react'
import './CostumerCard.css'
import { Link } from 'react-router-dom';

const CostumerCard = (user) => {

    let s=user.users;

  return (
    <div className='product-container'>

    {/* <img src={s.cardImage}> </img> */}
    <div className='product-details'>
        <a href={`/suppliers/${s.id}`}>
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

export default CostumerCard
