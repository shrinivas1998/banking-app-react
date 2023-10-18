import axios from "axios";
const BASE_URL = "http://localhost:9191/v1/api";

export class NoteAPI {
    
    static async regUser( regUser ){
        return (await (axios.post(`${BASE_URL}/registration/registerUser`, regUser))).data;
    }
    static async registrationForm( regUser ){
        return (await (axios.post(`${BASE_URL}/registration/registrationForm`, regUser))).data;
    }
    static async getDataFromPinCode( pincode ){
        return (await (axios.get(`https://api.postalpincode.in/pincode/${pincode}`))).data;
    }
    static async getAccountIdByUserName( username ){
        return (await (axios.get(`${BASE_URL}/registration/getAccountIdByUserName/${username}`))).data;
    }
    static async getAccountInfoByUserId( userId ){
        return (await (axios.get(`${BASE_URL}/registration/getUserByUserId/${userId}`))).data;
    }
    static async getUserIdByUserName( username ){
        return (await (axios.get(`${BASE_URL}/registration/getUserIdByUserName/${username}`))).data;
    }
    static async saveAccountDetails( accountDetails ){
        let json = JSON.parse(sessionStorage.getItem('token'));
        const token = json.token;   
        return (await (axios.post(`${BASE_URL}/account/saveAccount`,accountDetails,{ headers: {"Authorization" : `Bearer ${token}`} })));
    }
    static async getAccountDetailsByAccountId( accountId ){
        let json = JSON.parse(sessionStorage.getItem('token'));
        const token = json.token;   
        return (await (axios.get(`${BASE_URL}/account/getAccountDetailsById/${accountId}`, { headers: {"Authorization" : `Bearer ${token}`} }))).data;
    }
    static async getDepositDetailsByAccountId( accountId ){
        let json = JSON.parse(sessionStorage.getItem('token'));
        const token = json.token;   
        return (await (axios.get(`${BASE_URL}/deposit/getDepositDetailsByAccountId/${accountId}`, { headers: {"Authorization" : `Bearer ${token}`} }))).data;
    }
    static async getTransationsByAccountId( accountId ){
        let json = JSON.parse(sessionStorage.getItem('token'));
        const token = json.token;   
        return (await (axios.get(`${BASE_URL}/deposit/getTransationsByAccountId/${accountId}`, { headers: {"Authorization" : `Bearer ${token}`} }))).data;
    }
    // static async updateDeposit ( depositAmount, accountId ){
    //     let json = JSON.parse(localStorage.getItem('token'));
    //     const token = {}
    //     return (await (axios.put(`${BASE_URL}/deposit/updateDepoistAmount/${depositAmount}/${accountId}`))).data;
    // }
    static async updateDeposit ( depositAmount, accountId ){
        const depositDetails = {
            depositAmount: depositAmount,
            accountId: accountId
        }
        let json = JSON.parse(sessionStorage.getItem('token'));
        const token = json.token;
        return (await (axios.put(`${BASE_URL}/deposit/updateDepoistAmount`,depositDetails, { headers: {"Authorization" : `Bearer ${token}`} }))).data;
    }
    static async login ( loginDetails ){
        return (await (axios.post(`http://localhost:9191/login`,loginDetails))).data;
    }

}