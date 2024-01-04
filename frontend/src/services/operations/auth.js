import toast from "react-hot-toast";
import { BACKEND_URL } from "../../data/backendUrl"

export async function logout( setUserInfo , setToken , navigate ){
    try {
        
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setUserInfo(null);
        setToken(null);
        
        toast.success("Logged Out")
        
        return navigate("/login");
        
    } catch (error) {
        console.log(error , "logout handler");
        return null;
    }
}

export async function resetPasswordToken( email, setIsSentEmail ){
    try {
        const response = await fetch(`${BACKEND_URL}/auth/resetPasswordToken`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : 'include',
        });

        const data = await response.json();
        if( data.success ){
            setIsSentEmail(true);
            return true;
        }else{
            toast.error(`${data.message}`);
            return false;
        }
    } catch (error) {
        console.error(error, "Error in resetPassword Token handler");
        return null;
    }
}

export async function resetPassword( id , token , password , confirmPassword,navigate ){
    try {
            
        const response = await fetch(`${BACKEND_URL}/auth/resetPassword`, {
            method: 'POST',
            body: JSON.stringify({ id, token ,  password, confirmPassword }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : 'include',
        })

        const data = await response.json();
        if( data.success ){
            toast.success("Password is successfully reset.")
            return navigate("/login");
        }else{
            toast.error(`${data.message}`);
            return false;
        }
    } catch (error) {
        console.error(error, "Error in reset password handler");
        return null;
    }
}