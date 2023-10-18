import { NoteAPI } from "api/note-api"
import { useState } from "react";
import { useEffect } from "react"
// import "./style.module.css"

export function Dashboard(props){
    const [response, setResponse] = useState({
        name: "",
        accountId: "",
        loanType: "",
        loanAmount: "",
        loanApplyDate: "",
        rateOfIntrest: "",
        durationOfLoan: "",
        depositAmount: "",
        avalableBalance: ""
    });
   
    useEffect( ()=>{
        async function fectchAccountInfo(){
            const uId = localStorage.getItem('userId1');
            const registrationDetails = await NoteAPI.getAccountInfoByUserId(uId);
            const accountDetails = await NoteAPI.getAccountDetailsByAccountId(registrationDetails.accountId);
            const depositDetails = await NoteAPI.getDepositDetailsByAccountId(registrationDetails.accountId);
            console.log(registrationDetails);
            console.log(accountDetails);
            console.log(depositDetails);
            setResponse({ name : registrationDetails.name,
                          accountId : registrationDetails.accountId,
                          loanType: accountDetails.loanType,
                          loanAmount: accountDetails.loanAmount,
                          loanApplyDate: accountDetails.loanApplyDate,
                          rateOfIntrest: accountDetails.rateOfIntrest,
                          durationOfLoan: accountDetails.durationOfLoan,
                          depositAmount: depositDetails.depositAmount,
                          avalableBalance: depositDetails.avalableBalance
                        });
        }
        fectchAccountInfo();
    },[])
    return (<div>
        <h2>Welcome {response.name} </h2>
        <br/>
        <table className="table">
            <tbody>
                <tr>
                    <th scope="col">Account number</th>
                    <td>{response.accountId}</td>
                </tr>
                <tr>
                    <th scope="col">Loan type</th>
                    <td>{response.loanType}</td>
                </tr>
                <tr>
                    <th scope="col"> Loan amount</th>
                    <td>{response.loanAmount}₹</td>
                </tr>
                <tr>
                    <th scope="col">Loan apply date </th>
                    <td>{response.loanApplyDate}</td>
                </tr>
                <tr>
                    <th scope="col">Intrest rate</th>
                    <td>{response.rateOfIntrest}%</td>
                </tr>
                <tr>
                    <th scope="col">Loan tenure</th>
                    <td>{response.durationOfLoan} years</td>
                </tr>
                <tr>
                    <th scope="col">Total deposit</th>
                    <td>{response.depositAmount}₹</td>
                </tr>
                <tr>
                    <th scope="col">Remaining balance</th>
                    <td>{response.avalableBalance}₹</td>
                </tr>
            </tbody>
        </table>
        <form action="/depositAmount" method="get">
            <input type="submit" className="btn btn-primary btn-sm" value="Do you want to deposit more?" 
             name="Submit" id="frm1_submit" />
        </form>
        <br />
        <form action="/transations" method="get">
            <input type="submit" className="btn btn-primary btn-sm" value="Do you want to see transations?" 
             name="Submit" id="frm1_submit" />
        </form>
        
    </div>)
}