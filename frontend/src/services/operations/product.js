import { BACKEND_URL } from "../../data/backendUrl"

export async function getAllProducts(){
    try {
        const response = await fetch( `${BACKEND_URL}/product/getAllProducts`,{
            credentials : "include"
        });

        const data = await response.json();
        if( data.success ){
            return data.allProductsDoc;
        }else{
            console.log("can not get products");
            return false;
        }
    } catch (error) {
        console.log(error , "Error in products data handler")
        return null;
    }
}

export async function getProduct( productId ){
    try {
        const response = await fetch( `${BACKEND_URL}/product/getProduct`,{
            method : 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials : "include"
        });

        const data = await response.json();
        if( data.success ){
            return data?.productDoc;
        }else{
            console.log("can not get product");
            return false;
        }
    } catch (error) {
        console.log(error , "Error in product data handler")
        return null;
    }
}