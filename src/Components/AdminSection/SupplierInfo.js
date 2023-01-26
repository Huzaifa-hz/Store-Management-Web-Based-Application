import React from 'react'

const SupplierInfo = () => {

    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        const getSuppliers = () => {

            const supplierArray = [];
            const path = `supplier`
            // console.log(props)

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    productsArray.push({ ...doc.data(), id: doc.id })
                });
                setProducts(productsArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getProducts();
    }, [])


  return (
    <div>


      
    </div>
  )
}

export default SupplierInfo
