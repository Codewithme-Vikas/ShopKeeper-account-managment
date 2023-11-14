import { Navigate, Outlet, redirect } from "react-router-dom";



export default function PrivateRoute( ){
    
    const token = true;

    if( token === null ){
        return <Navigate to="/login"/>;
    }else{
        <div>
            this is me
            <Outlet/>
        </div>
    }

};