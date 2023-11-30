import toast from "react-hot-toast";


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