import { loginState } from "../state.js";
import {registerRequest} from '../actions.js'
import { useState } from "react";
import {useRecoilState} from 'recoil';
import {Modal, ModalBody, ModalHeader} from "reactstrap";



export default function RegisterPage(){
    const [state, setState] = useRecoilState(loginState);

    const [credentials, setCredentials] = useState({
        email: "", 
        password: "", 
        passwordVerification: "", 
        town: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: ""});

    const _onChange = (e) => {
        const newCredentials = {...credentials};
        newCredentials[e.target.name] = e.target.value;
        console.log(e.target.value);
        setCredentials(newCredentials);
    }

    return (
        <Modal isOpen={state == "register"}>
            <ModalHeader>Registrace</ModalHeader>
            <ModalBody>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Email:</div>
                        <div className="col">
                            <input type="text" name='email' className="form-control my-1" placeholder="Email" onChange={_onChange} value={credentials.email}/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Heslo:</div>
                        <div className="col">
                            <input type="password" name='password' className="form-control my-1" placeholder="Heslo" onChange={_onChange} value={credentials.password}/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Potvrdte heslo:</div>
                        <div className="col">
                            <input type="password" name='passwordVerification' className="form-control my-1" placeholder="Password verification"/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Mesto:</div>
                        <div className="col">
                            <input type="text" name='town' className="form-control my-1" placeholder="Mesto" onChange={_onChange} value={credentials.town}/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Jmeno:</div>
                        <div className="col">
                            <input type="text" name='firstName' className="form-control my-1" placeholder="Jmeno" onChange={_onChange} value={credentials.firstName}/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Prijmeni:</div>
                        <div className="col">
                            <input type="text" name='lastName' className="form-control my-1" placeholder="Prijmeni" onChange={_onChange} value={credentials.lastName}/>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-2 col-3">Datum narozeni:</div>
                        <div className="col">
                            <input type="date" name="birthDate" className="form-control my-1" placeholder="1990-07-22" min="1900-01-01" onChange={_onChange} value={credentials.birthDate}/>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-1 col-md-2 col-3">Pohlavi:</div>
                        <div className="col form-check">
                            <input className="form-check-input" type="radio" name="gender" id="igenderMale" value="MALE" onChange={_onChange}/>
                            <label className="form-check-label" htmlFor="igenderMale">
                                Muz
                            </label>
                        </div>
                        <div className="col form-check">
                            <input className="form-check-input" type="radio" name="gender" id="igenderFemale" value="FEMALE" onChange={_onChange}/>
                            <label className="form-check-label" htmlFor="igenderFemale">
                                Zena
                            </label>
                        </div>
                        <div className="col form-check">
                            <input className="form-check-input" type="radio" name="gender" id="igenderOther" value="OTHER" onChange={_onChange}/>
                            <label className="form-check-label" htmlFor="igenderOther">
                                Jine
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="m-1 col btn btn-primary btn-lg" onClick={() => registerRequest(credentials, setState)}>Registrovat</button>
                        <button className="m-1 col btn btn-primary btn-lg" onClick={() => setState("login")}>Prihlasit</button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}