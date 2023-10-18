import { DepositAmount } from "pages/DepositAmount/DepositAmount";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { tokenReducer } from "store/token-slice/token-slice";


export const GuardedRoute = ({component: C}) =>{
    const isAuthenticated = sessionStorage.getItem('token')
    return !isAuthenticated ? <Navigate to="/login" /> : <C /> 

    // const tokenRedux = useSelector((store) => store.tokenSlice.token);
    // console.log(tokenRedux);
    // return (tokenRedux === " ") ? <Navigate to="/login" /> : <C /> 
}