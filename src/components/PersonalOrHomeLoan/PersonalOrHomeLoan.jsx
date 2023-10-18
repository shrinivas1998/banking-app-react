import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoteAPI } from "api/note-api";
import { useNavigate } from "react-router";
import { ValidatorService } from "service/validator";
import { FieldError } from "components/FieldError/FieldError";

export function PersonalOrHomeLoan(props){
    const [personalOrHomeLoan, setPersonalOrHomeLoan] = useState({
        companyName: "",
        designation: "",
        totalExpence: 0,
        expiriance: 0
    })
    const [formErrors, setFormErrors] = useState({
        companyName: undefined,
        designationfatherName: undefined,
        totalExpence: undefined,
        expiriance: undefined
    });
    const validate = (fieldName,fieldValue) =>{
        setFormErrors({
                    ...formErrors,
                     [fieldName]: VALIDATOR[fieldName](fieldValue)
                    });
    }
    const VALIDATOR = {
        companyName: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        designation: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        totalExpence: (value) => {    
            return ValidatorService.minNum(value,0);
        },
        expiriance: (value) => {    
            return ValidatorService.minNum(value,0);
        }
    }
    const navigate = useNavigate();
    const accountDetails = useSelector((store) => store.noteSlice.accountForm);
    const [accountwithPer, setAccountwithPer] = useState({
        loanType: accountDetails.loanType,
        loanAmount: accountDetails.loanAmount,
        loanApplyDate: accountDetails.loanApplyDate,
        rateOfIntrest: accountDetails.rateOfIntrest,
        durationOfLoan: accountDetails.durationOfLoan,
        userId: "",
        educationLoadDeatilsDto: undefined,
        personalOrHomeloanDetailsDto: undefined

    });

    const updateFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPersonalOrHomeLoan({...personalOrHomeLoan, [name]: value});
        validate(name,value);
    }
    const updateFormValuesNumber= (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const name = e.target.name;
            var value = "0";
            if( name === "totalExpence" || name === "expiriance" ){
                value = parseInt(e.target.value, 10);
            }
            value = e.target.value;
            setPersonalOrHomeLoan({...personalOrHomeLoan, [name]: value});
            validate(name, value);
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
    const savePersonalAndHomeLoanDetails  = async () => {
        const uId = localStorage.getItem('userId1');
        setAccountwithPer({...accountwithPer, personalOrHomeloanDetailsDto: personalOrHomeLoan, userId: uId});
        if(accountwithPer.personalOrHomeloanDetailsDto){
            console.log(accountwithPer);
            console.log(accountwithPer.personalOrHomeloanDetailsDto);
            await NoteAPI.saveAccountDetails(accountwithPer);
            // alert("The account has been created ");
            navigate("/depositAmount");
        }
    }
    return (<div>
            <div className="form-group">
                <label className="form-label">  companyName: </label>
                <input type="text" className="form-control" name="companyName"
                 onChange={updateFormValues} value={personalOrHomeLoan.companyName} />
            </div>
            <FieldError msg={formErrors.companyName} />
            <br />
            <div className="form-group">
                <label className="form-label">  designation: </label>
                <input type="text" className="form-control" name="designation"
                 onChange={updateFormValues} value={personalOrHomeLoan.designation} />
            </div>
            <FieldError msg={formErrors.designation} />
            <br />
            <div className="form-group">
                <label className="form-label">  totalExpence: </label>
                <input type="text" className="form-control" name="totalExpence"
                 onChange={updateFormValuesNumber} value={personalOrHomeLoan.totalExpence} />
            </div>
            <FieldError msg={formErrors.totalExpence} />
            <br />
            <div className="form-group">
                <label className="form-label">  expiriance: </label>
                <input type="text" className="form-control" name="expiriance"
                 onChange={updateFormValuesNumber} value={personalOrHomeLoan.expiriance} />
            </div>
            <FieldError msg={formErrors.expiriance} />
            <br />
            <br />
            <ButtonPrimary onClick={savePersonalAndHomeLoanDetails} type="submit" value="Submit" > Submit</ButtonPrimary>
    </div>) 
}