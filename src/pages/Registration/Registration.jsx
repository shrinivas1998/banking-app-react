import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NoteAPI } from "api/note-api";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { ValidatorService } from "service/validator";
import { FieldError } from "components/FieldError/FieldError";

export function Registration(props) {

    
    const [userRegformValue, setUserRegformValue] = useState({
        name: "", 
        userName: "",
        password:"",
        personalDetailsDto: undefined});
    const [personalDetails, setPersonalDetails] = useState({
        email: "",
        contactNumber:"",
        panNumber:"",
        dateOfBirth: "",
        addressDto: undefined
    })
    const[address, setAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        pinCode: "",
        landMark:"",
        city:"",
        state: "",
        country:""
    })
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
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
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
    const hasError = () => {
        for( const fieldName in formErrors){
            if(formErrors[fieldName]){
                return true
            }
        }
        return false
    }  
    const updateRegFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegformValue({...userRegformValue, [name]: value});
        validate(name, value);
    }
    const updatePersonaldetailFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPersonalDetails({...personalDetails, [name]: value});
        validate(name, value);
    }
    const updateAddressFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress({...address, [name]: value});
        validate(name, value);
    }
    const navigate = useNavigate(); 
    const [userRegform, setUserRegform] = useState({
        name: "", 
        userName: "",
        password:"",
        personalDetailsDto: undefined
    });
    async function saveRegstredUser() {
        setPersonalDetails({...personalDetails, addressDto: address});
        // setUserRegformValue({...userRegformValue, personalDetailsDto: personalDetails});
        setUserRegform({...userRegform, name: userRegformValue.name, 
                                        userName: userRegformValue.userName,
                                        password: userRegformValue.password, 
                                        personalDetailsDto: personalDetails })
        console.log(userRegform.personalDetailsDto)
        console.log(userRegform.personalDetailsDto.addressDto)
        if(userRegform.name !== null && userRegform.personalDetailsDto !== undefined
                 && userRegform.personalDetailsDto.addressDto.addressLine1 !== undefined){
            const response = await NoteAPI.regUser(userRegform);
            alert("The note has benn created ")
            navigate("/login")
        }
       
    }
    return  (
        <div>
            <h3>Register your self</h3>
            
            <div className="form-group">
                <label  className="form-label">  Name: </label>
                <input type="text" className="form-control" name="name" onChange={updateRegFormValues} value={userRegformValue.name} />
            </div>
            <FieldError msg={formErrors.name} />
            <br />
            <div className="form-group">
                <label className="form-label">userName: </label>
                <input type="text" className="form-control" 
                name="userName" onChange={updateRegFormValues} value={userRegformValue.userName} />
            </div>
            <FieldError msg={formErrors.userName} />
            <br />
            <div className="form-group">
                <label className="form-label">password: </label>
                <input type="password" className="form-control" 
                name="password" onChange={updateRegFormValues} value={userRegformValue.password} />
            </div>
            <FieldError msg={formErrors.password} />
            <br />
            <div className="form-group">
                <label className="form-label">email: </label>
                <input type="email" className="form-control" 
                name="email" onChange={updatePersonaldetailFormValues} value={personalDetails.email} />
            </div>
            <FieldError msg={formErrors.email} />
            <br />
            <div className="form-group">
                <label className="form-label">contactNumber: </label>
                <input type="text" className="form-control" 
                name="contactNumber" onChange={updatePersonaldetailFormValues} value={personalDetails.contactNumber} />
            </div>
            <FieldError msg={formErrors.contactNumber} />
            <br />
            <div className="form-group">
                <label className="form-label">panNumber: </label>
                <input type="text" className="form-control" 
                name="panNumber" onChange={updatePersonaldetailFormValues} value={personalDetails.panNumber} />
            </div>
            <FieldError msg={formErrors.panNumber} />
            <br />
            <div className="form-group">
                <label className="form-label">dateOfBirth: </label>
                <input type="date" className="form-control" 
                name="dateOfBirth" onChange={updatePersonaldetailFormValues} value={personalDetails.dateOfBirth} />
            </div>
            <FieldError msg={formErrors.dateOfBirth} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine1: </label>
                <input type="text" className="form-control" 
                name="addressLine1" onChange={updateAddressFormValues} value={address.addressLine1} />
            </div>
            <FieldError msg={formErrors.addressLine1} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine2: </label>
                <input type="text" className="form-control" 
                name="addressLine2" onChange={updateAddressFormValues} value={address.addressLine2} />
            </div>
            <FieldError msg={formErrors.addressLine2} />
            <br />
            <div className="form-group">
                <label className="form-label">addressLine3: </label>
                <input type="text" className="form-control" 
                name="addressLine3" onChange={updateAddressFormValues} value={address.addressLine3} />
            </div>
            <FieldError msg={formErrors.addressLine3} />
            <br />
            <div className="form-group">
                <label className="form-label">pinCode: </label>
                <input type="text" className="form-control" 
                name="pinCode" onChange={updateAddressFormValues} value={address.pinCode} />
            </div>
            <FieldError msg={formErrors.pinCode} />
            <br />
            <div className="form-group">
                <label className="form-label">landMark: </label>
                <input type="text" className="form-control" 
                name="landMark" onChange={updateAddressFormValues} value={address.landMark} />
            </div>
            <FieldError msg={formErrors.landMark} />
            <br />
            <div className="form-group">
                <label className="form-label">city: </label>
                <input type="text" className="form-control" 
                name="city" onChange={updateAddressFormValues} value={address.city} />
            </div>
            <FieldError msg={formErrors.city} />
            <br />
            <div className="form-group">
                <label className="form-label">state: </label>
                <input type="text" className="form-control" 
                name="state" onChange={updateAddressFormValues} value={address.state} />
            </div>
            <FieldError msg={formErrors.state} />
            <br />
            <div className="form-group">
                <label className="form-label">country: </label>
                <input type="text" className="form-control" 
                name="country" onChange={updateAddressFormValues} value={address.country} />
            </div>
            <FieldError msg={formErrors.country} />
            <br /><br />
            <ButtonPrimary isDisabled={hasError()} onClick={saveRegstredUser} type="submit" value="Submit" > Submit</ButtonPrimary>
            <br />
            <span>
                    Already have account? <Link to ="/login">Signin</Link>
            </span>
        </div>
    )
}