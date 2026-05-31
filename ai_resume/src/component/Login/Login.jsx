import styles from "./Login.module.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext } from "react";

import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async () => {
    try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    };

        setLogin(true);
        setUserInfo(userData);
    localStorage.setItem("isLogin" , true);
    localStorage.setItem("userInfo" , JSON.stringify(userData));
    navigate('/dashboard');

    } catch (err) {
        alert("Something went wrong with login. please try again Later");
        console.error(err);
    
    }
};

    return (
    <div className={styles.Login}>
        <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
        <h1>Login</h1>
    <VpnKeyIcon />
        </div>

        <div className={styles.googleBtn} onClick={handleLogin}>
        <GoogleIcon sx={{ fontsize: 20, color: "red" }} />
        <span>Sign in with Google</span>
        </div>
    </div>
    </div>
);
};

export default Login;
