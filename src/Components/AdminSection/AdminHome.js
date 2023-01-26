import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div>
      <Link to="/addproduct"><button >Products</button></Link>
      <Link to='/addsupplier'><button >Suppliers</button></Link>
      <Link to='/supplierlist'><button >Supplier List</button></Link>
      <Link to='/costumerlist'><button >Costumer List</button></Link>

    </div>
  )
}

export default AdminHome
