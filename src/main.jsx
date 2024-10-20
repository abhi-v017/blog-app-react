import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import { AuthLayout, Login } from './components/index.js'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',

        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: 'signup',
        element: <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      },
      {
        path: 'add-post',
        element: <AuthLayout authentication>
          {" "}
          <AddPost />
        </AuthLayout>
      },
      {
        path: 'all-post',
        element: <AuthLayout authentication>
          {" "}
          <AllPost />
        </AuthLayout>
      },
      {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
      {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
