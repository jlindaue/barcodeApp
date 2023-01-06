import AutocompletedForm from "./AutocompletedForm";
import { useState } from "react";
import { BACKEND_URL } from '../config';
import { FaTimes } from 'react-icons/fa';
import Scanner from "./Scanner";

const shops = ['Tesco', "Kaufland", "Globus"]

const initialFormState = {
    "id": "",
    "name": "", 
    "category": "", 
    "subcategory": "", 
    "subsubcategory": "", 
    "barcode": "", 
    "parents": [], 
    "costs":{
        "Kaufland": 0,
        "Tesco": 0,
        "Globus": 0
    }
}

function copyProduct(product){
    let copy = {...product};
    copy.parents = [...product.parents]
    copy.costs = {...product.costs}
    return copy;
}




export default function ProductForm(){
    const [formState, setFormStateRaw] = useState(initialFormState)
    
    //Autocomplete states
    const [selectedProduct, setSelectedProduct] = useState([initialFormState]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState([]);
    const [selectedSubsubcategory, setSelectedSubsubcategory] = useState([]);

    function setFormState(newState){
        console.log(newState)
        for (const shop of shops){
            document.getElementById("cost"+shop).value = newState.costs[shop];
        }
        document.getElementById("iBarcode").value = newState.barcode;
        setFormStateRaw(newState);
        setSelectedCategory([newState.category])
        setSelectedSubcategory([newState.subcategory ? newState.subcategory : ""])
        setSelectedSubsubcategory([newState.subsubcategory ? newState.subsubcategory : ""])
        setSelectedProduct([newState.name])
    }

    function onEnteredProduct(product){
        console.log(product);
        let newState = copyProduct(formState);
        newState.name = product.name;
        if (!product.customOption){
            newState = copyProduct(product);
        }
        setFormState(newState);
    }
    function onEnteredProperty(property, value){
        let newState = copyProduct(formState);
        newState[property] = value;
        setFormState(newState);
    }
    
    function onEnteredParent(parent){
        let newState = copyProduct(formState);
        newState.parents.push(parent);
        setFormState(newState);
    }

    function onRemovedParent(parent){
        let newState = copyProduct(formState);
        console.log("Delete: ", parent)
        console.log("Orig: ", newState.parents)
        newState.parents = newState.parents.filter(p=>p!==parent);
        setFormState(newState);
    }

    function onEnteredPrice(shop, price){
        let newState = copyProduct(formState);
        newState.costs[shop] = price;
        setFormState(newState);
    }

    function submit(e){
        e.preventDefault();
        if (formState.name === "") return;
        const body = JSON.stringify(formState);
        fetch(BACKEND_URL+'/products', {
            method: 'POST', 
            body: body, 
            headers:{'Content-Type': 'application/json'}
        }).then((res)=>{
            if (res.status === 201){
                setFormState(initialFormState);
            }
        })
    }

    function abort(e){
        e.preventDefault();
        setFormState(initialFormState);
    }

    
    return (
        <form className="container pt-3">
            <Scanner onEnteredBarcode={v => onEnteredProperty("barcode", v)} onEnteredProduct={onEnteredProduct} formBarcode={formState.barcode}/>

            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 col-3">Produkt:</div>
                    <div className="col">
                        <AutocompletedForm source="products" placeholder="Produkt" onEnter={onEnteredProduct} selected={selectedProduct} setSelected={setSelectedProduct}/>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 col-3">Kategorie:</div>
                    <div className="col">
                        <AutocompletedForm source="categories" placeholder="Kategorie" onEnter={c => onEnteredProperty("category", c.name)} selected={selectedCategory} setSelected={setSelectedCategory}/>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 col-3">Podkategorie:</div>
                    <div className="col">
                        <AutocompletedForm source="categories" placeholder="Podkategorie" onEnter={c => onEnteredProperty("subcategory", c.name)} selected={selectedSubcategory} setSelected={setSelectedSubcategory}/>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 col-3">Podpodkategorie:</div>
                    <div className="col">
                        <AutocompletedForm source="categories" placeholder="Podpodkategorie" onEnter={c => onEnteredProperty("subsubcategory", c.name)} selected={selectedSubsubcategory} setSelected={setSelectedSubsubcategory}/>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 col-3">Barcode:</div>
                    <div className="col">
                        <input type="text" className="form-control my-1" placeholder="Carovy kod" id="iBarcode" onChange={e => onEnteredProperty("barcode", e.target.value)} value={formState.barcode}/>
                    </div>
                </div>
            </div>
            
            
            <h5 className="h5 mt-3">Ceny:</h5>
            {shops.map(shop=>(
                <div className="d-flex justify-content-evenly align-items-center" key={shop}>
                    <img src={`./icons/${shop}.png`} alt={shop} className="me-2 img-fluid" style={{maxWidth:'40px', maxHeight:'40px'}}/>
                    <input type="number" className="form-control my-1" placeholder={shop} id={"cost"+shop} onChange={e => onEnteredPrice(shop, e.target.value)}/>
                    <div className="mx-2">Kc</div>
                </div>
            ))}            

            
            <h5 className="mt-3 h5">Nadrazene produkty:</h5>
            <AutocompletedForm source="productGroups" placeholder="Novy nadrazeny produkt" onEnter={onEnteredParent}/>
            {formState.parents.map(parent=>(
                <div className="card" key={'parent'+parent.name}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="card-text">{parent.name}</div>
                        <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={()=>onRemovedParent(parent)}></FaTimes>
                    </div>
                </div>
            ))}
            
            

            <div className="row">
                <button className="m-1 col btn btn-primary btn-lg" onClick={submit}>Ulozit</button>
                <button className="m-1 col btn btn-primary btn-lg" onClick={abort}>Zrusit</button>
            </div>
        </form>
    );
}