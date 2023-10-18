import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useEffect, useState } from "react"
import { NoteAPI } from "api/note-api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ValidatorService } from "service/validator";
import { FieldError } from "components/FieldError/FieldError";
import { setToken } from "store/token-slice/token-slice"

export function LogIn(props){
    const [logInInfo, setLogInInfo] = useState({
        username: "",
        password: ""
    })
    const updateLoginFormValues= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogInInfo({...logInInfo, [name]: value});
        validate(name, value);
    }
    // const [userIdAccountId, setUserIdAccountId] = useState({
    //     userId: "",
    //     accountId: ""
    // })
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [formErrors, setFormErrors] = useState({
        username: undefined,
        password: undefined,
    });
    const validate = (fieldName,fieldValue) =>{
        setFormErrors({
                    ...formErrors,
                     [fieldName]: VALIDATOR[fieldName](fieldValue)
                    });
    }
    const VALIDATOR = {
        username: (value) => {    
            return ValidatorService.min(value,3) || ValidatorService.max(value,20);
        },
        password: (value) => {    
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
    const dispatch = useDispatch();
    const login = async () => {
        const responseAccId = await NoteAPI.getAccountIdByUserName(logInInfo.username);
        localStorage.setItem('accountId1', responseAccId);
        const responseUserId = await NoteAPI.getUserIdByUserName(logInInfo.username);
        localStorage.setItem('userId1', responseUserId);
            const response = await NoteAPI.login(logInInfo)
            .catch(error => {
                if(error.response.status === 401){
                    console.log(error.response.status);
                    sessionStorage.clear();
                    alert(`unauthorised ${logInInfo.username}`)
                    navigate("/login")
                }
                else if(error.response.status === 500){
                    sessionStorage.clear();
                    alert(`passcode is incorrect`)
                    navigate("/login")
                } 
            })
           if(response){
                // console.log(response);
                sessionStorage.setItem('token', JSON.stringify(response));
                dispatch(setToken(response));
                if(responseAccId === 0 && responseUserId !== -1){
                    navigate("/createAccount")
                } else if(responseAccId > 0 && responseUserId > 0){
                    navigate("/dashboard");
                }
            }
    }
    
    return (<div>
            <div className="form-group">
                <label className="form-label">   user name: </label>
                <input type="text" className="form-control" name="username"
                 onChange={updateLoginFormValues} value={logInInfo.username} />
            </div>
            <FieldError msg={formErrors.username} />
            <br />
            <div className="form-group">
                <label className="form-label">password: </label>
                <input type="password" className="form-control" name="password"
                 onChange={updateLoginFormValues} value={logInInfo.password} />
            </div>
            {/* <>{(userId === -1) && <FieldError msg="User Already exist" />}</> */}
            <FieldError msg={formErrors.password} />
            <br />
            <br />
            <ButtonPrimary isDisabled={hasError()} onClick={login} type="submit" value="Submit" > Sign in</ButtonPrimary>
            
    </div>)
}