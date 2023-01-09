import { loginState } from "../state.js";
import {loginRequest} from '../actions.js'
import { useState } from "react";
import {useRecoilState} from 'recoil';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

export default function LoginPage(){
    const [state, setState] = useRecoilState(loginState);

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const _onChange = (e) => {
        const newCredentials = {...credentials};
        newCredentials[e.target.name] = e.target.value;
        console.log(e.target.value);
        setCredentials(newCredentials);
    }

    return (
        <Modal isOpen={state == "login"}>
            <ModalHeader>Prihlaseni</ModalHeader>
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
                            <input type="password" name='password' className="form-control my-1" placeholder="Password" onChange={_onChange} value={credentials.password}/>
                        </div>
                    </div>
                    <div className="row">
                        <button className="m-1 col btn btn-primary btn-lg" onClick={() => loginRequest(credentials, setState)}>Prihlasit</button>
                        <button className="m-1 col btn btn-primary btn-lg" onClick={() => setState("register")}>Registrace</button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}