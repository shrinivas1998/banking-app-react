import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { Registration } from "pages/Registration/Registration";
import { RegistrationV2 } from "pages/RegistrationWithChange/RegistrationV2";
import { CreateAccount } from "pages/CreateAccount/CreateAccount";
import { LogIn } from "pages/LogIn/Login";
import { DepositAmount } from "pages/DepositAmount/DepositAmount";
import { GuardedRoute } from "service/GuardedRoute";
import { Dashboard } from "pages/Dashboard/Dashboard";
import { TransationList } from "pages/TransationList/TransationList";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const express = require('express')
// const cors = require('cors')
// const app = express()
// app.use(cors())

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/" element={<RegistrationV2/>} />
            <Route path="/reg" element={<RegistrationV2/>} />
            <Route exact path='/createAccount' element={<GuardedRoute component={CreateAccount}/>}>
              <Route exact path='/createAccount' element={<CreateAccount/>}/>
            </Route>
            <Route exact path='/depositAmount' element={<GuardedRoute component={DepositAmount}/>}>
              <Route exact path='/depositAmount' element={<DepositAmount/>}/>
            </Route>
            <Route exact path='/dashboard' element={<GuardedRoute component={Dashboard}/>}>
              <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Route>
            <Route exact path='/transations' element={<GuardedRoute component={TransationList}/>}>
              <Route exact path='/transations' element={<TransationList/>}/>
            </Route>
            <Route path="/login" element={<LogIn/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
