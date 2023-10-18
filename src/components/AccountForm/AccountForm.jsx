import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ValidatorService } from "service/validator";
import { setAccountForm} from "store/notes/notes-slice"

export function AccountForm({submitAccountForm}){
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        loanType: "",
        loanAmount: 0,
        loanApplyDate: "",
        rateOfIntrest: "",
        durationOfLoan: 0,
        educationLoadDeatilsDto: undefined,
        personalOrHomeloanDetailsDto: undefined

    });
    const [formErrors, setFormErrors] = useState({
        loanType: undefined,
        loanAmount: undefined,
        loanApplyDate: undefined,
        rateOfIntrest: undefined,
        durationOfLoan: undefined,
    });
    const validate = (fieldName,fieldValue) =>{
        setFormErrors({
                    ...formErrors,
                     [fieldName]: VALIDATOR[fieldName](fieldValue)
                    });
    }
    const VALIDATOR = {
        loanType: (value) => {    
            return ValidatorService.min(value,1) || ValidatorService.max(value,20);
        },
        loanAmount: (value) => {    
            return ValidatorService.minNum(value,0);
        },
        loanApplyDate: (value) => {    
            return ValidatorService.min(value,1) || ValidatorService.max(value,20);
        },
        rateOfIntrest: (value) => {    
            return ValidatorService.minNum(value,6) ||  ValidatorService.maxNum(value,20);
        },
        durationOfLoan: (value) => {    
            return ValidatorService.min(value,1) || ValidatorService.max(value,30);
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
    const updateAccountFormValues= (e) => {
        const name = e.target.name;
        var value = "0";
        if( name === "loanAmount"){
             value = parseInt(e.target.value, 10); }
        value = e.target.value;
        setAccountDetails({...accountDetails, [name]: value});
        validate(name, value);
    }
    const updateAccountFormValuesNumber= (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const name = e.target.name;
            var value = "0";
            if( name === "loanAmount"){
                value = parseInt(e.target.value, 10); }
            value = e.target.value;
            setAccountDetails({...accountDetails, [name]: value});
            validate(name, value);
        }
    }
    useEffect(() => {
        dispatch(setAccountForm(accountDetails));
      }, [accountDetails]);
    const options = ['educationloan', 'personalOrHomeloan']
    // console.log(onSubmit)
    return (<div>
            <div className="form-group">
                <label className="form-label">loanType: </label>
                <select className="form-control" name="loanType" onChange={updateAccountFormValues}>   
                    <option>Please choose one option</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
            </select>            
            </div>
            <br />
            <div className="form-group">
                <label className="form-label">  loanAmount: </label>
                <input type="text" className="form-control" name="loanAmount"
                 onChange={updateAccountFormValuesNumber} value={accountDetails.loanAmount} />
            </div>
            <FieldError msg={formErrors.loanAmount} />
            <br />
            <div className="form-group">
                <label className="form-label">loanApplyDate: </label>
                <input type="date" className="form-control" name="loanApplyDate" 
                onChange={updateAccountFormValues} value={accountDetails.loanApplyDate}/>   
            </div>
            <FieldError msg={formErrors.loanApplyDate} />
            <br />
            <div className="form-group">
                <label className="form-label">rateOfIntrest: </label>
                <input type="text" className="form-control" name="rateOfIntrest" 
                onChange={updateAccountFormValuesNumber} value={accountDetails.rateOfIntrest}/>   
            </div>
            <FieldError msg={formErrors.rateOfIntrest} />
            <br />
            <div className="form-group">
                <label className="form-label">durationOfLoan: </label>
                <input type="number" min="0" max="20" step="5" className="form-control" name="durationOfLoan" 
                onChange={updateAccountFormValues} value={accountDetails.durationOfLoan}/>   
            </div>
            <FieldError msg={formErrors.durationOfLoan} />
            <br />
            <br />
            <ButtonPrimary isDisabled={hasError()} onClick={submitAccountForm} type="submit" value="Submit" >next</ButtonPrimary>
    </div>
    
    ) 
}