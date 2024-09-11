import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protectedlayout } from './components/index.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllBlogPosts from './pages/AllBlogPosts.jsx'
import AddBlogPost from './pages/AddBlogPost.jsx'
import EditPost from './pages/EditPost.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Profile from './pages/Profile.jsx'
import AllSocialPosts from './pages/AllSocialPosts.jsx'
import AddSocialPost from './pages/AddSocialPost.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Protectedlayout authentication={false}>
                        <Home />
                    </Protectedlayout>
                ),
            },
            {
                path: "/login",
                element: (
                    <Protectedlayout authentication={false}>
                        <Login />
                    </Protectedlayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Protectedlayout authentication={false}>
                        <Signup />
                    </Protectedlayout>
                ),
            },
            {
                path: "/all-blog-posts",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <AllBlogPosts />
                    </Protectedlayout>
                ),
            },
            {
                path: "/all-social-posts",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <AllSocialPosts />
                    </Protectedlayout>
                ),
            },
            {
                path: "/profile",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <Profile />
                    </Protectedlayout>
                ),
            },
            {
                path: "/add-blog-post",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <AddBlogPost />
                    </Protectedlayout>
                ),
            },
            {
                path: "/add-social-post",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <AddSocialPost />
                    </Protectedlayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protectedlayout authentication>
                        {" "}
                        <EditPost />
                    </Protectedlayout>
                ),
            },
            {
                path: "/blog-post/:slug",
                element: <BlogPost />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
