import Quagga from 'quagga'; // ES6
import { useState, useEffect } from 'react';
import '../css/App.css';
import { BACKEND_URL, OPENFOODFACTS_API } from '../config';

function initQuagga(){
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            width: {min: 640},
            height: {min: 480},
            aspectRatio: {min: 1, max: 100},
            facingMode: "environment", // or user
            target: document.querySelector('#scannerView')
        },
        frequency: 2,
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        decoder : {
            readers : ["ean_reader"]
        }
        }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
    });    
}




export default function Scanner(props){
    const [barcode, setBarcode] = useState("");
    const [active, setActive] = useState(false);

    function scannerToggle(event){
        if (!active){
            setActive(true);
            initQuagga();
            Quagga.onDetected(result=>{
                setBarcode(result.codeResult.code);
            });
        }else{
            Quagga.stop();
            setActive(false);
        }
    }

    async function loadFromOFF(e){
        e.preventDefault();
        try{
            const response = await fetch(`${OPENFOODFACTS_API}/${barcode}`);
            if (response.status > 299){
                props.onEnteredBarcode(barcode);
            }else{
                const json = await response.json();
                const product = {
                    name: json.product?.product_name,
                    category: json.product?.categories.split(", ")[0],
                    barcode: barcode,
                    "parents": [], 
                    "costs":{
                        "Kaufland": 0,
                        "Tesco": 0,
                        "Globus": 0
                    }
                }
                props.onEnteredProduct(product);
            }   
        }catch(e){
            console.error(e);
        }
    }

    setTimeout(() => setBarcode("456666"), 1000);

    async function loadFromDB(e){
        e.preventDefault();
        try{
            const response = await fetch(`${BACKEND_URL}/product?barcode=${barcode}`);
            if (response.status > 299){
                props.onEnteredBarcode(barcode);
            }else{
                const json = await response.json();
                props.onEnteredProduct(json);
            }
        }catch(e){
            console.error(e);
        }    
    }


    return ( 
        <>
            <div id="scannerView" className={active ? "" : "d-none"}></div>
            <input type="text" readOnly className={active ? "form-control" : "form-control d-none"} value={barcode}/>
            <div className={active ? "input-group" : "input-group d-none"}>
                <button className="btn btn-primary btn-lg" 
                    id='useBarcodeBtn' 
                    onClick={e => {e.preventDefault(); props.onEnteredBarcode(barcode)}}
                    disabled={barcode === props.formBarcode}>Use
                </button>
                <button className="btn btn-primary btn-lg" 
                    id='useOFFBtn' 
                    onClick={loadFromOFF}>Load from OFF
                </button>
                <button className="btn btn-primary btn-lg" 
                    id='loadFromDBBtn' 
                    onClick={loadFromDB}>Load from DB
                </button>
            </div>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={(e)=>scannerToggle(e)}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Scanner</label>
            </div>
        </>);
}
/*

*/