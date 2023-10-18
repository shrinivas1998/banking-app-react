import { NoteAPI } from "api/note-api";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ValidatorService } from "service/validator";

export function EducationLoan(props) {
    const navigate = useNavigate();
    const [educationLoan, setEducationLoan] = useState({
        courseFee: 0,
        fatherName: "",
        fatherAccupation: "",
        annualIncome: 0
    })
    
    const updateAccountFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEducationLoan({...educationLoan, [name]: value});
        validate(name,value)
    }
    const updateAccountFormValuesNumber= (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const name = e.target.name;
            var value = "0";
            if( name === "courseFee" || name === "annualIncome" ){
                value = parseInt(e.target.value, 10);
            }
            value = e.target.value;
            setEducationLoan({...educationLoan, [name]: value});
            validate(name, value);
        }
    }
    const [formErrors, setFormErrors] = useState({
        courseFee: undefined,
        fatherName: undefined,
        fatherAccupation: undefined,
        annualIncome: undefined
    });
    const validate = (fieldName,fieldValue) =>{
        setFormErrors({
                    ...formErrors,
                     [fieldName]: VALIDATOR[fieldName](fieldValue)
                    });
    }
    const VALIDATOR = {
        courseFee: (value) => {    
            return ValidatorService.minNum(value,0);
        },
        fatherName: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        fatherAccupation: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        annualIncome: (value) => {    
            return ValidatorService.minNum(value,0);
        }
    }
    const accountDetails = useSelector((store) => store.noteSlice.accountForm);
    const [accountwithEdu, setAccountwithEdu] = useState({
        loanType: "",
        loanAmount: "",
        loanApplyDate: "",
        rateOfIntrest: "",
        durationOfLoan: "",
        userId: "",
        educationLoadDeatilsDto: "",
        personalOrHomeloanDetailsDto: ""

    });
    const hasError = () => {
        for( const fieldName in formErrors){
            if(formErrors[fieldName]){
                return true
            }
        }
        return false
    } 
    // const userAndAccountId  = useSelector((store) => store.noteSlice.userAndAccountId);
    const saveEduLoanDetails  = async () => {
        const uId = localStorage.getItem('userId1');
        // setAccountwithEdu({...accountwithEdu, educationLoadDeatilsDto: educationLoan, userId: uId});
        setAccountwithEdu({loanType: accountDetails.loanType,
                           loanAmount: accountDetails.loanAmount,
                           loanApplyDate: accountDetails.loanApplyDate,
                           rateOfIntrest: accountDetails.rateOfIntrest,
                           durationOfLoan: accountDetails.durationOfLoan,
                           userId: uId,
                           educationLoadDeatilsDto: educationLoan,
                           personalOrHomeloanDetailsDto: undefined,
                           });
        if(accountwithEdu.educationLoadDeatilsDto){
            console.log(accountwithEdu)
            console.log(accountwithEdu.educationLoadDeatilsDto)
            await NoteAPI.saveAccountDetails(accountwithEdu);
            // alert("The account has been created ")
            navigate("/depositAmount")
        }
    }
    return (<div>
            <div className="form-group">
                <label className="form-label">  courseFee: </label>
                <input type="text" className="form-control" name="courseFee"
                 onChange={updateAccountFormValuesNumber} value={educationLoan.courseFee} />
            </div>
            <FieldError msg={formErrors.courseFee} />
            <br />
            <div className="form-group">
                <label className="form-label">  fatherName: </label>
                <input type="text" className="form-control" name="fatherName"
                 onChange={updateAccountFormValues} value={educationLoan.fatherName} />
            </div>
            <FieldError msg={formErrors.fatherName} />
            <br />
            <div className="form-group">
                <label className="form-label">  fatherAccupation: </label>
                <input type="text" className="form-control" name="fatherAccupation"
                 onChange={updateAccountFormValues} value={educationLoan.fatherAccupation} />
            </div>
            <FieldError msg={formErrors.fatherAccupation} />
            <br /> 
            <div className="form-group">
                <label className="form-label">  annualIncome: </label>
                <input type="text" className="form-control" name="annualIncome"
                 onChange={updateAccountFormValuesNumber} value={educationLoan.annualIncome} />
            </div>
            <FieldError msg={formErrors.annualIncome} />
            <br />
            <br />
            <ButtonPrimary onClick={saveEduLoanDetails} type="submit" value="Submit" > Submit</ButtonPrimary>
    </div>)
}