import React, { useState, useEffect } from 'react'
import { storage, auth, db } from '../../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from '../Navbar'
import './AddSupplier.css'
import Qrscan from '../QrcodeFunctionality/Qrscan';
import { Path } from 'react-router-dom';
import AdminHome from './AdminHome';

const AddSupplier = () => {
    const [supplierName, setSupplierName] = useState("");
    const [supplierContact, setSupplierContact] = useState("")
    const [supplierAddress, setSupplierAddress] = useState("")
   
    const [cardImage, setCardImage] = useState("")

    const navigate = useNavigate()
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');



    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();



    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    const handleImage = (e) => {
        let selectedFile = e.target.files[0];
        // console.log(producttype.toUpperCase())


        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setCardImage(selectedFile);
                setImageError('');

            }
            else {
                setCardImage(null);
                setImageError('please select a valid image file type(png or jpg)')
            }
        }
        else {
            setImageError('please select your file');
        }
    }



    const handleAddSupplier = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `VisitingCard-image-${supplierName.toUpperCase()}/${Date.now()}`);
        // console.log(storageRef._location.path)
        uploadBytes(storageRef, cardImage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, 'suppliers'), {
                        supplierName,
                        supplierContact,
                        supplierAddress,
                        cardImage:url

                    }).then(() => {
                        setSuccessMsg('Supplier added successfully');

                    }).catch((error) => { setUploadError(error.message) });
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <AdminHome/>
            {loggeduser && loggeduser[0].email == "hozef110@gmail.com" ?
                <div className='addprod-container'>
                    <form onSubmit={handleAddSupplier} className='addprod-form'>
                        <p>Add Data</p>
                        {successMsg && <>
                            <div className='success-msg'>{successMsg}</div>
                        </>}
                        {uploadError && <>
                            <div className='error-msg'>{uploadError}</div>
                        </>}

                         <label>Supplier Name</label>
                         <input onChange={(e) => setSupplierName(e.target.value)} type="text" placeholder="supplier name" />
                         <label>Supplier Contact No</label>
                         <input onChange={(e) => setSupplierContact(e.target.value)} type="text" placeholder="supplier contact no." />
                         <label>Visiting Card Image</label>
                         <input onChange={handleImage} type="file" />
                         {imageError && <>
                             <div className='error-msg'>{imageError}</div>
                         </>}
                       
                         <label>Supplier Address</label>
                         <textarea onChange={(e) => setSupplierAddress(e.target.value)} placeholder="Enter Supplier Address"></textarea>
                       

                         <button type='submit'>Add</button>
                     
                     </form>
                 </div>
                 :
                 <div>You don't have access to add Suppliers</div>}
         </div>
     )
 }

export default AddSupplier
