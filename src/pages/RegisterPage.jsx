import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) { navigate('/') }
    }, [status, isAuth, navigate]) 

    const handlerSubmit = () => {

        try {
            dispatch(registerUser({ username, password }))
            setUsername('')
            setPassword('')
        } catch(error) {console.log(error)}
    }

    return (
        <div className='login-page'>
            <h1 className='login-form-title'>Реєстрація</h1>
            <form onSubmit={e => e.preventDefault()} className='login-form'>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Бажаний логін' className='login-form-input' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Придумайте пароль' className='login-form-input' />
                <div className='login-form-nav'>
                    <button type='submit' onClick={handlerSubmit} className='btn_enter'>Реєстрація</button>
                    <Link to='/login' className='link-login'>Вже зареєстровані?</Link>
                </div>
            </form>
            <div className='nav-footer'>
                <a href='http://impam.vercel.app' rel=''>2022 &copy; A. Petlovanii</a>
            </div>
        </div>
    
        )
}