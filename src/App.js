
import './App.css';

//for routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import PgFOF from './Components/PgFOF';
import UserProfile from './Components/UserProfile'
import Addproduct from './Components/AdminSection/Addproduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpage';
// import QrCodeScanner from './Components/QrcodeFunctionality/QrCodeScanner';
import Qrscan from './Components/QrcodeFunctionality/Qrscan';
import Qrgenerate from './Components/QrcodeFunctionality/Qrgenerate';
import Testing from './Testing';
import AdminHome from './Components/AdminSection/AdminHome';
import AddSupplier from './Components/AdminSection/AddSupplier';


import Specificproductpage from './Components/Some-Product-Components/Specificproductpage'
import Cart from './Components/Cart';
import AllSupplierDetails from './Components/AdminSection/AllSupplierDetails';
import AllCostumerDetails from './Components/AdminSection/AllCostumerDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/addproduct" element={<Addproduct />} />
        <Route exact path="/product-type/mobile" element={<Allproductpage type={'Mobile'} />} />
        <Route exact path="/product-type/laptop" element={<Allproductpage type={'Laptop'} />} />
        <Route exact path="/product-type/camera" element={<Allproductpage type={'Camera'} />} />
        <Route exact path="/product-type/shoes" element={<Allproductpage type={'Shoes'} />} />
        <Route exact path="/product/:type/:id" element={<Specificproductpage />} />
        <Route exact path="/cartdata" element={<Cart />} />
        <Route exact path="/scanner" element={<Qrscan/>} />
        <Route exact path="/generate" element={<Qrgenerate/>} />
        <Route exact path="/testing" element={<Testing/>} />
        <Route exact path="/admin" element={<AdminHome/>} />
        <Route exact path="/addsupplier" element={<AddSupplier/>} />
        <Route exact path="/supplierList" element={<AllSupplierDetails/>} />
        <Route exact path="/costumerlist" element={<AllCostumerDetails/>} />


        

        <Route path="*" element={<PgFOF />} />
        
      </Routes>
    </BrowserRouter >
  );
}

export default App;
