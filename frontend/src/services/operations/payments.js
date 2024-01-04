import { BACKEND_URL } from "../../data/backendUrl"

export async function getAllPayments(){
    try {
        const response = await fetch( `${BACKEND_URL}/order/getAllPayments`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        console.log( data , "data are")
        if( data.success ){
            return data.allPaymentDoc;
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "create customer handler");
        return null;
    }
}