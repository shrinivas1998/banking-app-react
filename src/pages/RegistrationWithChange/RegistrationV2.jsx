import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NoteAPI } from "api/note-api";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { ValidatorService } from "service/validator";
import { FieldError } from "components/FieldError/FieldError";
import Popup from 'reactjs-popup';

export function RegistrationV2(props) {

    const [formErrors, setFormErrors] = useState({
        name: undefined, 
        userName: undefined,
        password: undefined,
        email: undefined,
        contactNumber: undefined,
        panNumber: undefined,
        dateOfBirth: undefined,
        addressLine1: undefined,
        addressLine2: undefined,
        addressLine3: undefined,
        pinCode: undefined,
        landMark: undefined,
        city: undefined,
        state: undefined,
        country: undefined
    });
    const validate = (fieldName,fieldValue) =>{
        setFormErrors({
                    ...formErrors,
                     [fieldName]: VALIDATOR[fieldName](fieldValue)
                    });
    }
    const VALIDATOR = {
        name : (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        userName: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        password: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        email: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,40);
        },
        contactNumber: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        panNumber: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        dateOfBirth: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        addressLine1: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        addressLine2: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        addressLine3: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        pinCode: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        landMark: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        city: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        state: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        country: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        }
    }
    const hasError =    () => {
        for( const fieldName in formErrors){
            if(formErrors[fieldName]){
                return true
            }
        }
        return false
    }  
    const updateUserRegform= (e) => {
        
        const name = e.target.name;
        const value = e.target.value;
        setUserRegform({...userRegform, [name]: value});
        validate(name, value);
        
    }
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [country,setCountry] = useState("");
    const updateUserRegformNumber=async (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const name = e.target.name;
            const value = e.target.value;
            if(name === "pinCode" && value.length === 6){
                const pincodeResponse = await NoteAPI.getDataFromPinCode(value);
                if(pincodeResponse[0].Status === "Success"){
                    setIsPinInCorrect(false);
                    setCity(pincodeResponse[0].PostOffice[0].Block);
                    setState(pincodeResponse[0].PostOffice[0].State);
                    setCountry(pincodeResponse[0].PostOffice[0].Country);
                }else {
                    // alert("given pin is worng")
                    setIsPinInCorrect(true)
                }
            }
            // setUserRegform({...userRegform, city: city});
            setUserRegform({...userRegform, [name]: value});
            validate(name, value);
        }
        
    }
    const navigate = useNavigate(); 
    const [userRegform, setUserRegform] = useState({
        name: "", 
        userName: "",
        password: "",
        email: "",
        contactNumber: "",
        panNumber: "",
        dateOfBirth: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        pinCode: "",
        landMark: "",
        city: "",
        state: "",
        country: ""
    });
    const [isPinInCorrect,setIsPinInCorrect] = useState(false);
    async function saveRegstredUser() {
       
            console.log(userRegform);
            const response = await NoteAPI.registrationForm(userRegform)
            .catch(error => {
                if(error.response.status === 409){
                    console.log(error.response.status);
                    sessionStorage.clear();
                    alert(`this username already exist try with diffrent one`)
                } else if(error.response.status === 400 ){
                    alert(`${error.response.data.message}`)
                }
            })
            if(response){
                alert("Registration done ")
                navigate("/login")
            }
            // navigate("/login")
        }
       
    
    return  (
        <div>
            <h3>Register your self</h3>
            
            <div className="form-group">
                <label  className="form-label">  Name: </label>
                <input type="text" className="form-control" 
                name="name" onChange={updateUserRegform} value={userRegform.name} />
            </div>
            <FieldError msg={formErrors.name} />
            <br />
            <div className="form-group">
                <label className="form-label">userName: </label>
                <input type="text" className="form-control" 
                name="userName" onChange={updateUserRegform} value={userRegform.userName} />
            </div>
            <FieldError msg={formErrors.userName} />
            <br />
            <div className="form-group">
                <label className="form-label">password: </label>
                <input type="password" className="form-control" 
                name="password" onChange={updateUserRegform} value={userRegform.password} />
            </div>
            <FieldError msg={formErrors.password} />
            <br />
            <div className="form-group">
                <label className="form-label">email: </label>
                <input type="email" className="form-control" 
                name="email" onChange={updateUserRegform} value={userRegform.email} />
            </div>
            <FieldError msg={formErrors.email} />
            <br />
            <div className="form-group">
                <label className="form-label">contactNumber: </label>
                <input type="text" className="form-control" 
                name="contactNumber" onChange={updateUserRegformNumber} value={userRegform.contactNumber} />
            </div>
            <FieldError msg={formErrors.contactNumber} />
            <br />
            <div className="form-group">
                <label className="form-label">panNumber: </label>
                <input type="text" className="form-control" 
                name="panNumber" onChange={updateUserRegform} value={userRegform.panNumber} />
            </div>
            <FieldError msg={formErrors.panNumber} />
            <br />
            <div className="form-group">
                <label className="form-label">dateOfBirth: </label>
                <input type="date" className="form-control" 
                name="dateOfBirth" onChange={updateUserRegform} value={userRegform.dateOfBirth} />
            </div>
            <FieldError msg={formErrors.dateOfBirth} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine1: </label>
                <input type="text" className="form-control" 
                name="addressLine1" onChange={updateUserRegform} value={userRegform.addressLine1} />
            </div>
            <FieldError msg={formErrors.addressLine1} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine2: </label>
                <input type="text" className="form-control" 
                name="addressLine2" onChange={updateUserRegform} value={userRegform.addressLine2} />
            </div>
            <FieldError msg={formErrors.addressLine2} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine3: </label>
                <input type="text" className="form-control" 
                name="addressLine3" onChange={updateUserRegform} value={userRegform.addressLine3} />
            </div>
            <FieldError msg={formErrors.addressLine3} />
            <br />
            <div className="form-group">
                <label className="form-label">pinCode: </label>
                <input type="text" className="form-control" 
                name="pinCode" onChange={updateUserRegformNumber} value={userRegform.pinCode} />
            </div>
            {
                isPinInCorrect && (<div> <FieldError msg={"Wrong pin"} /> <br/></div>)
            }
            <FieldError msg={formErrors.pinCode} />
            <br />
            <div className="form-group">
                <label className="form-label">landMark: </label>
                <input type="text" className="form-control" 
                name="landMark" onChange={updateUserRegform} value={userRegform.landMark} />
            </div>
            <FieldError msg={formErrors.landMark} />
            <br />
            <div className="form-group">
                <label className="form-label">city: </label>
                <input type="text" className="form-control" 
                name="city" onChange={updateUserRegform} value={userRegform.city} />
            </div>
            <FieldError msg={formErrors.city} />
            <br />
            <div className="form-group">
                <label className="form-label">state: </label>
                <input type="text" className="form-control" 
                name="state" onChange={updateUserRegform} value={userRegform.state} />
            </div>
            <FieldError msg={formErrors.state} />
            <br />
            <div className="form-group">
                <label className="form-label">country: </label>
                <input type="text" className="form-control" 
                name="country" onChange={updateUserRegform} value={userRegform.country} />
            </div>
            <FieldError msg={formErrors.country} />
            <br /><br />
            <ButtonPrimary isDisabled={hasError()} onClick={saveRegstredUser} type="submit" value="Submit" > Submit</ButtonPrimary>
            <br /><br />
            <span>
                    Already have account? <Link to ="/login">Signin</Link>
            </span>
            {/* <Popup trigger=
                {<button> Click to open popup </button>}
                position="right center">
                <div>GeeksforGeeks</div>
                <button>Click here</button>
            </Popup> */}
        </div>
    )
}