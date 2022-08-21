import axios from '../utils/axios';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css'
import { updatePost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify';

export const EditPostPage = () => {

    const [model, setModel] = useState('')
    const [urlOff, setOff] = useState('')
    const [urlBook, setBook] = useState('')
    const [info, setInfo] = useState('')
    const [imgUrl, setImg] = useState('')
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setModel(data.model)
        setInfo(data.info)
        setOff(data.urlOff)
        setBook(data.urlBook)
        setImg(data.imgUrl)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('model', model)
            updatedPost.append('info', info)
            updatedPost.append('urlOff', urlOff)
            updatedPost.append('urlBook', urlBook)
            updatedPost.append('imgUrl', imgUrl)
            updatedPost.append('id', params.id)
            dispatch(updatePost(updatedPost))
            navigate('/posts')
            toast('Запис успішно оновлено')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    if (!user) {
        return<div className='main'>Авторизуйтесь</div>
    }


    return (
        <div className='main edit-page'>
            <form
                className='add-post'
                onSubmit={(e) => e.preventDefault()}
            >
                <input type='text' value={model} onChange={(e) => setModel(e.target.value)} placeholder='Модель' className='input-form'></input>
                <input type='text' value={urlOff} onChange={(e) => setOff(e.target.value)} placeholder='URL офф сайту' className='input-form'></input>
                <input type='text' value={urlBook} onChange={(e) => setBook(e.target.value)} placeholder='URL посібника' className='input-form'></input>
                <input type='text' value={imgUrl} onChange={(e) => setImg(e.target.value)} placeholder='URL зображення посту' className='input-form'></input>
                <textarea placeholder='Інформація' value={info} onChange={(e) => setInfo(e.target.value)} className='input-form-text'></textarea>
                
                <div className='edit-page-nav'>
                    <button className='save-btn' onClick={submitHandler}>Зберегти</button>
                </div>
            </form>
        </div>
        )
}