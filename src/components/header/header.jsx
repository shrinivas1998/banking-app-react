
import s from "./style.module.css";
import logoSrc from "assets/images/logo2.jpg"
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Logo } from "components/logo";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export function Header({children}){

    const navigate = useNavigate()
    const isAuthenticated = sessionStorage.getItem('token')
    const tokenRedux = useSelector((store) => store.tokenSlice.token);
    return <div className={`row ${s.container} `}>
        <div className="col-xs-12 col-sm-4">
            <Logo
                onclick={() => navigate("/")} 
                title="Your Bank" 
                subtitle={"We are here for your financial aid "} 
                image={logoSrc} />
        </div>
        {/* <>{(userId === -1) && <FieldError msg="User Already exist" />}</> */}
        <>  {(isAuthenticated) &&
            <div className="col-xs-12 col-sm-8 text-end">
            <ButtonPrimary onClick={() => {
                console.log(tokenRedux)
                sessionStorage.clear()
                navigate("/login")
            }}>
               logout
            </ButtonPrimary>
            </div>}
        </>
    </div>
}