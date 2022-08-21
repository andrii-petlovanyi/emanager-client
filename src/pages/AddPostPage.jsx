import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    
    return (
        <div><form
            className='postsEdit'
            onSubmit={(e) => e.preventDefault()}
        >
            <input type='text' value={model} onChange={(e) => setModel(e.target.value)} placeholder='Модель' className='inputEdit model'></input>
            <input type='text' value={urlOff} onChange={(e) => setOff(e.target.value)} placeholder='URL офф сайту' className='inputEdit'></input>
            <input type='text' value={urlBook} onChange={(e) => setBook(e.target.value)} placeholder='URL посібника' className='inputEdit'></input>
            <input type='text' value={imgUrl} onChange={(e) => setImg(e.target.value)} placeholder='URL зображення посту' className='inputEdit'></input>
            <textarea placeholder='Інформація' value={info} onChange={(e) => setInfo(e.target.value)} className='inputEditText'></textarea>
            
           

            <div className='postsAddNav'>
                <button className='postEditBtn' onClick={submitHandler}>Зберегти</button>
                <button onClick={clearFormData} className='postClearInput'>Очистити форму</button>
            </div>
        </form></div>
    
        )
}