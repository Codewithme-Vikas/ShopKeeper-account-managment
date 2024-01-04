import { BACKEND_URL } from "../../data/backendUrl"

export async function getCustomer( customerId ){
    try {
        const response = await fetch( `${BACKEND_URL}/customer/getCustomer`,{
            method : 'POST',
            body : JSON.stringify( { customerId } ),
            headers : {
                'Content-Type' : 'application/json'
            },
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.customerDoc;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error , "get customer handler");
        return null;
    }
}

export async function getAllCustomer(){
    try {
        const response = await fetch( `${BACKEND_URL}/customer/getAllCustomers`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.allCustomersDoc;
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "create customer handler");
        return null;
    }
}