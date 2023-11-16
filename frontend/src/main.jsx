import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from "./pages/HomePage.jsx"
import ProductPage from "./pages/ProductPage.jsx"
import OrderPage from "./pages/OrderPage.jsx"
import CustomerPage from "./pages/CustomerPage.jsx"
import ErrorPage from './pages/ErrorPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { UserContextProvider } from './context/userContext.jsx'
import UpdateProduct from './components/product/UpdateProduct.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                // index: true,
                path: "",
                element: <HomePage />,
                children: [
                    {
                        path: "product/:op",
                        element: <ProductPage />,
                    },
                    {
                        path : "product/update/:id",
                        element : <ProductPage/>
                    },
                    {
                        path: "customer/:op",
                        element: <CustomerPage />,
                    },
                    {
                        path : "customer/update/:id",
                        element : <CustomerPage/>
                    },
                    {
                        path : "customer/detail/:id",
                        element : <CustomerPage/>
                    },
                    {
                        path: "order/:op",
                        element: <OrderPage />
                    },
                ]
            },
            {
                path: "signup",
                element: <SignupPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <UserContextProvider>
            <RouterProvider router={router}>
                <App />
                
            </RouterProvider>
        </UserContextProvider>
    // </React.StrictMode>,
)
