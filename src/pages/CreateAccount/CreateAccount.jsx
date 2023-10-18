import { AccountForm } from "components/AccountForm/AccountForm";
import { EducationLoan } from "components/EducationLoan/EducationLoan";
import { PersonalOrHomeLoan } from "components/PersonalOrHomeLoan/PersonalOrHomeLoan";
import { useState } from "react"
import { useSelector } from "react-redux";

export function CreateAccount(props) {
    const accountDetails = useSelector((store) => store.noteSlice.accountForm);
    function onSubmit_() {
        console.log(onSubmitAccountForm);
        setOnSubmitAccountForm(false);
    }
    const [onSubmitAccountForm, setOnSubmitAccountForm] = useState(true);
    return (<div>
            <>{onSubmitAccountForm && <AccountForm submitAccountForm = {onSubmit_} />}</>
            <>{ (!onSubmitAccountForm && (accountDetails.loanType === "educationloan"))  && <EducationLoan/> }</>
            <>{ (!onSubmitAccountForm && (accountDetails.loanType === "personalOrHomeloan"))  && <PersonalOrHomeLoan/> }</>
    </div>
    
    )
}