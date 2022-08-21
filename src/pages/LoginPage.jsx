import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


export const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if (status) toast(status.message) 
        if (isAuth) {
            navigate('/')
            toast('Вхід виконано')
        }
    }, [status, isAuth, navigate])

    const handlerSubmit = () => {

        try {
            dispatch(loginUser({ username, password }))
        } catch (error) { console.log(error) }
    }

    return (
        <div className='login-page'>
                <h1 className='login-form-title'>Авторизація</h1>
                <form onSubmit={e => e.preventDefault()} className='login-form'>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ваш логін' className='login-form-input' />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Ваш пароль' className='login-form-input' />
                    <div className='login-form-nav'>
                        <button type='submit' onClick={handlerSubmit} className='btn_enter'>Вхід</button>
                        <Link to='/register' className='link-login'>Реєстрація</Link>
                    </div>
                </form>
        </div>
)}