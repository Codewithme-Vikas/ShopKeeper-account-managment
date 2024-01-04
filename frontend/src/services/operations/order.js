import { BACKEND_URL } from "../../data/backendUrl"

export async function getOrder( id ){
    try {

        const response = await fetch( `${BACKEND_URL}/order/getOrder`,{
            method : 'POST',
            body : JSON.stringify( {id} ),
            headers : {
                'Content-Type' : 'application/json'
            },
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.orderDoc
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "get  order handler");
        return null;
    }
}



export async function getAllSellOrders(){
    try {

        const response = await fetch( `${BACKEND_URL}/order/getAllSellOrders`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.allSellOrders
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "get all sell order handler");
        return null;
    }
}

export async function getAllBuyOrders(){
    try {

        const response = await fetch( `${BACKEND_URL}/order/getAllBuyOrders`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.allBuyOrders;
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "get all buy order handler");
        return null;
    }
}

export async function getAllOrders(){
    try {

        const response = await fetch( `${BACKEND_URL}/order/getAllOrders`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.noOfOrders;
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "get all buy order handler");
        return null;
    }
}