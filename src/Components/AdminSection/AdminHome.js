import React from 'react'
import { Link } from 'react-router-dom'
import './AdminHome.css'


const AdminHome = () => {
  return (
    <div className='page'>
      <Link to="/addproduct"><button >Products</button></Link>
      <Link to='/addsupplier'><button >Suppliers</button></Link>
      <Link to='/supplierlist'><button >Supplier List</button></Link>
      <Link to='/costumerlist'><button >Costumer List</button></Link>
      <Link to='/sales-history'><button >Sales History</button></Link>

    </div>
  )
}

export default AdminHome
