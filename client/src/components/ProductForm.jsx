import AutocompletedForm from "./AutocompletedForm";
import { useState } from "react";
import { BACKEND_URL } from '../config';

const shops = ['Tesco', "Kaufland", "Globus"]

const initialFormState = {
    "id": "",
    "name": "", 
    "category": "", 
    "barcode": "", 
    "parents": [], 
    "costs":{
        "Kaufland": 0,
        "Tesco": 0,
        "Globus": 0
    }
}




export default function ProductForm(){
    const [formState, setFormStateRaw] = useState(initialFormState)
    const [selectedProduct, setSelectedProduct] = useState([initialFormState]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    function setFormState(newState){
        console.log(newState)
        for (const shop of shops){
            document.getElementById("cost"+shop).value = newState.costs[shop];
        }
        document.getElementById("iBarcode").value = newState.barcode;
        setFormStateRaw(newState);
    }

    function onEnteredProduct(product){
        let newState = {...formState};
        newState.name = product.name;
        if (!product.customOption){
            newState = {...product};
            setSelectedCategory([product.category]);
        }
        setFormState(newState);
    }
    
    function onEnteredCategory(category){
        let newState = {...formState};
        newState.category = category.name;
        setFormState(newState);
    }
    
    function onEnteredParent(parent){
        let newState = {...formState};
        newState.parents.push(parent);
        setFormState(newState);
    }

    function onEnteredPrice(shop, price){
        let newState = {...formState};
        newState.costs[shop] = price;
        setFormState(newState);
    }

    function onEnteredBarcode(barcode){
        let newState = {...formState};
        newState.barcode = barcode;
        setFormState(newState);
    }

    function submit(e){
        e.preventDefault();
        if (formState.name === "") return;
        const body = JSON.stringify(formState);
        fetch(BACKEND_URL+'/products', {method: 'POST', body: body}).then((res)=>{
            if (res.status === 200){
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
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Carovy kod"/>
                <button className="btn btn-primary btn-lg" id='useBarcodeBtn'>Use</button>
            </div>

            <AutocompletedForm source="products" placeholder="Produkt" onEnter={onEnteredProduct} selected={selectedProduct} setSelected={setSelectedProduct}/>
            <AutocompletedForm source="categories" placeholder="Kategorie" onEnter={onEnteredCategory} selected={selectedCategory} setSelected={setSelectedCategory}/>
            <input type="text" className="form-control my-1" placeholder="Carovy kod" id="iBarcode" onChange={e => onEnteredBarcode(e.target.value)}/>

            {shops.map(shop=>(
                <div className="d-flex justify-content-evenly align-items-center" key={shop}>
                    <img src={`./icons/${shop}.png`} alt={shop} className="me-2 img-fluid" style={{maxWidth:'40px', maxHeight:'40px'}}/>
                    <input type="number" className="form-control my-1" placeholder={shop} id={"cost"+shop} onChange={e => onEnteredPrice(shop, e.target.value)}/>
                </div>
            ))}

            {/*TODO - fix*/}
            {formState.parents.map(parent=>{
                <div class="card">
                    <div class="card-body">
                        {parent.name}
                    </div>
                </div>
            })}
            

            {/*<div className="d-flex justify-content-evenly align-self-stretch" style={{maxHeight:'50px'}}>
                {shops.map(shop=>(
                    <div className="thumbnail" key={shop}>
                        <input type="checkbox" className="btn-check" autoComplete="off" id={shop} />
                        <label className="btn btn btn-outline-success d-flex justify-content-center flex-column" htmlFor={shop} style={{height:'50px'}}>
                            <img src={`./icons/${shop}.png`} alt={shop} className="img-fluid" style={{maxWidth:'50px'}}/>
                        </label>
                    </div>
                ))}
            </div>*/}

            <AutocompletedForm source="productGroups" placeholder="Nadrazeny produkt" onEnter={onEnteredParent}/>
            
            
            
            

            <div className="row">
                <button className="m-1 col btn btn-primary btn-lg" onClick={submit}>Ulozit</button>
                <button className="m-1 col btn btn-primary btn-lg" onClick={abort}>Zrusit</button>
            </div>
        </form>
    );
}