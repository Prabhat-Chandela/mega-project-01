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
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
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
            path: "/all-posts",
            element: (
                <Protectedlayout authentication>
                    {" "}
                    <AllPosts />
                </Protectedlayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protectedlayout authentication>
                    {" "}
                    <AddPost />
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
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
