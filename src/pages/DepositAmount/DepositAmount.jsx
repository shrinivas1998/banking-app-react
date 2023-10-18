import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useEffect, useState } from "react";
import { NoteAPI } from "api/note-api";
import { useNavigate } from "react-router";

export function DepositAmount(props) {

    const [depositAmount, setDepositAmount] = useState("");
    const navigate = useNavigate();
    const updateDeposit  = async () => {
        const accId = localStorage.getItem('accountId1');
        const resopnse = await NoteAPI.updateDeposit(depositAmount, accId)
        .catch(error => {
            if(error.response.status === 400 ){
                alert(`${error.response.data.message}`)
            }
        })
        if(resopnse){
            console.log(accId);
            alert(` you have deposited ${depositAmount}`)
            navigate("/dashboard")
        }
       
    }
    const updateDepositInput= (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const name = e.target.name;
            const value = e.target.value;
            setDepositAmount(e.target.value);
        }
    }
    return (<div>
            <div className="form-group">
                <label  className="form-label">  Enter Amount to deposit: </label>
                <input type="text" className="form-control" 
                name="name" onChange={updateDepositInput} value={depositAmount} />
            </div>
            <br /><br />
            <ButtonPrimary onClick={updateDeposit} type="submit" value="Submit" > Submit</ButtonPrimary>
    </div>)
}