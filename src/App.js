import React, {useEffect} from 'react';
import { Layout } from "./components/Layout.jsx";
import { Routes, Route } from 'react-router-dom';
import { MainPage } from "./pages/MainPage.jsx";
import { PostPage } from "./pages/PostPaige.jsx";
import { PostsPage } from "./pages/PostsPage.jsx";
import { AddPostPage } from './pages/AddPostPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { EditPostPage } from './pages/EditPostPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { OffersPage } from './pages/OffersPage.jsx';
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/auth/authSlice'
import { OfferDelPage } from './pages/OfferDelPage'



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout> 
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path='posts' element={ <PostsPage /> } />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={ <EditPostPage /> } />
        <Route path="new" element={<AddPostPage />} />
        <Route path="register" element={ <RegisterPage /> } />
        <Route path="login" element={<LoginPage />} /> 
        <Route path="offers" element={<OffersPage />}/>
        <Route path=":id/one" element={ <OfferDelPage /> } /> 
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  )
}

export default App;
