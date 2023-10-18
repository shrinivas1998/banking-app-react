import { useEffect, useState } from "react";
import { NoteAPI } from "api/note-api";
import { useNavigate } from "react-router";

export function TransationList(props){
    const [transations, setTransations] = useState([
        "No record found",
        "No record found"
    ])
    const navigate = useNavigate();
    useEffect( ()=>{
        async function fectchAccountInfo(){
            const accId = localStorage.getItem('accountId1');
            const transationsList = await NoteAPI.getTransationsByAccountId(accId);
            console.log(transationsList)
            if(transationsList.length === 0){
                alert("No transation found")
                navigate("/dashboard")
            }
            setTransations(transationsList)
        }
        fectchAccountInfo();
    },[])

    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Transation Id </th>
                    <th scope="col"> Amount</th>
                    <th scope="col">Transation name</th>
                    <th scope="col">Transation date and time</th>
                </tr>
            </thead>
                {transations.map((val, key) => {
                    return (
                        <tbody>
                        <tr key={key}>
                            <td scope="row">{val.transationId}</td>
                            <td scope="row">{val.amount}</td>
                            <td scope="row">{val.transationName}</td>
                            <td scope="row">{val.transationTime}</td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}