import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { UserContextProvider } from './context/userContext.jsx'
import ListPage from './pages/ListPage.jsx'
import AddPage from './pages/AddPage.jsx'


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
                        path : "list",
                        element : <ListPage/>
                    },
                    {
                        path : "list/:type",
                        element : <ListPage/>
                    },
                    {
                        path : "add",
                        element : <AddPage/>
                    },
                    {
                        path : "add/:type",
                        element : <AddPage/>
                    },
                    {
                        path : "product/update/:id",
                        element : <ListPage/>
                    },
                    {
                        path : "customer/update/:id",
                        element : <ListPage/>
                    },
                    {
                        path : "customer/detail/:id",
                        element : <ListPage/>
                    },
                    {
                        path : "order/detail/:id",
                        element : <ListPage/>
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
