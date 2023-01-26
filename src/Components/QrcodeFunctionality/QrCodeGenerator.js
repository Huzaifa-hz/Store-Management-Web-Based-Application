import QRCode from 'qrcode'
import { useState } from 'react';


const QrCodeGenerator = () => {
const [qrValue,setQrValue]=useState("");
const [qrImageUrl,setQrImageUrl]=useState("");


    const handlesubmit= async (e)=>{
        e.preventDefault();
        
        const response=await QRCode.toDataURL(qrValue)
        console.log(response)
    }
  return (
    <div>
      
    </div>
  )
}

export default QrCodeGenerator
