import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Footer } from '../components/Footer';
import '../index.css'
import { createPost } from '../redux/features/post/postSlice';

export const AddPostPage = () => {
    
    const [model, setModel] = useState('')
    const [urlOff, setOff] = useState('')
    const [urlBook, setBook] = useState('')
    const [info, setInfo] = useState('')
    const [imgUrl, setImg] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth) 

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('model', model)
            data.append('urlOff', urlOff)
            data.append('urlBook', urlBook)
            data.append('info', info)
            data.append('imgUrl', imgUrl)

            dispatch(createPost(data))
            navigate('/')
            toast('Запис успішно створено')
        } catch (error){console.log(error)}
    }

    const clearFormData = () => {
        setModel('')
        setInfo('')
        setBook('')
        setOff('')
    }

    if (!user) {
        return <div className='main'>
            Авторизуйтесь
            <Footer/>
        </div>
    }
    
    return (
        <div className='add-post-page'>
            <form
                className='add-post'
                onSubmit={(e) => e.preventDefault()}
            >
                <input type='text' value={model} onChange={(e) => setModel(e.target.value)} placeholder='Модель' className='input-form'></input>
                <input type='text' value={urlOff} onChange={(e) => setOff(e.target.value)} placeholder='URL офф сайту' className='input-form'></input>
                <input type='text' value={urlBook} onChange={(e) => setBook(e.target.value)} placeholder='URL посібника' className='input-form'></input>
                <input type='text' value={imgUrl} onChange={(e) => setImg(e.target.value)} placeholder='URL зображення посту' className='input-form'></input>
                <textarea placeholder='Інформація' value={info} onChange={(e) => setInfo(e.target.value)} className='input-form-text'></textarea>
                
            

                <div className='add-post-nav'>
                    <button className='post-edit-btn' onClick={submitHandler}>Зберегти</button>
                    <button onClick={clearFormData} className='post-clear-btn'>Очистити форму</button>
                </div>
            </form>
        </div>
    
        )
}