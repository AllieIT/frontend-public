import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Stylesheets
import './css/index.css';
import './css/forms.css';
import './css/animations/circleAnimation.css';
import './css/animations/aghFadeInAnimation.css';

import { RootPage, SignUpPage, SignInPage, DashboardPage, EnrollPage, OpinionPage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        path: "/signin",
        element: <SignInPage/>
    },
    {
        path: "/opinions",
        element: <OpinionPage/>
    },
    {
        path: "/enroll",
        element: <EnrollPage/>
    },
    {
        path: "/dashboard",
        element: <DashboardPage/>
    }
    // Define any new paths here...
    // Element gets inserted into the <RouterProvider> field in root.render() function
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider router={router}/>
);
