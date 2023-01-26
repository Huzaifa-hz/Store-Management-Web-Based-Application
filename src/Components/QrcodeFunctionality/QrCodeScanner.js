import React,{useEffect,useState} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { View,StyleSheet,Text } from 'react-native';
import { Button } from 'react-bootstrap';


const QrCodeScanner = () => {
    const[hasPermission,setHasPermission]=useState(null)
    const[scanned,setScanned]=useState(false);
    const [text,setText]=useState('not yet Scanned')

    const askForCameraPermission=()=>{
        (async()=>{
            const {status} =await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status=='granted')
        })()
    }

    useEffect(()=>{
        askForCameraPermission();
    },[])

    const handlebarcodeScanned=({type,data})=>{
        setScanned(true);
        setText(data);
        console.log('Type:'+type+'\nData:'+data)
    }

    const container={
            flex:1,
            backgroundColor:'#fff',
            alignItems:'center',
            justifyContent:'center'
        }
        const barcodebox= {
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            width: 300,
            overflow: 'hidden',
            borderRadius: 30,
            backgroundColor: 'tomato'
          }

          const maintext= {
            fontSize: 16,
            margin: 20,
          }
    

    //check permission & retuen the screen
    if(hasPermission===null){
        return(
            <div style={container}>
                <p>Requesting For Camera Permission</p>
            </div>
        )
    }
    if(hasPermission===false){
  return (
    <div style={container}>
        <p style={{margin:10}}> No access to camera</p>
        <Button title={'Allow Camera'} onPress={()=>askForCameraPermission()}/>

    </div>
  )}

    return(
        <div style={container}>
        <div style={barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handlebarcodeScanned}
        style={{height:400,width:400}}/>

        <p style={maintext}>{text}</p>
        {scanned && <Button title={'scan again'} onPress={()=>{setScanned(false)}} color='tomato'></Button>}
        </div>

    </div>
    )
}

export default QrCodeScanner
