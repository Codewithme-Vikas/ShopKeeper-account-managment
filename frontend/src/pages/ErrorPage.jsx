import { useRouteError } from "react-router-dom"

export default function ErrorPage(){
    const error = useRouteError();
    console.error( "Printing error , errorPage" , error );

    return(
        <div className="flex flex-col gap-4 items-center justify-center mt-20">
            <h1>Oops!</h1>
            <h2 className="text-rose-600 text-xl">{error.status }</h2>        
            <h2 className="text-rose-600 text-lg">{error.statusText }</h2>        
            <p>{ error.message }</p>
        </div>
    )
}