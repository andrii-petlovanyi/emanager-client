import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import Moment from 'react-moment';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import '../index.css'
import { useSelector, useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { removePost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify'
import { Footer } from '../components/Footer';
import { AiOutlineRead, AiOutlineStar, AiOutlineCheck, AiOutlineFileImage, AiOutlineEdit, AiFillCaretLeft } from 'react-icons/ai'

export const PostPage = () => {

    const [post, setPost] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Запис видалено')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }



    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    if (!user) {
        return <div className='main wrapper'>
            <span className='top'>Авторизуйтесь</span>
            <Footer/>
        </div>
    }

    if (!post) {
        return (
            <div className="main">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        )
    }
    return (
        <div className='main post-full-page'>
            <div className='post-full-nav'>
                <Link to={'/posts'}><button className='btn-back'><AiFillCaretLeft size={20} /></button></Link>
            </div>
                    
            <div className="post-item post-full-item">
                <div className="post-header">
                    <h3 className="post-title"><AiOutlineStar size={25} style={{ marginRight:'15px'}} />{post.model}</h3>
                    <Moment date={post.createdAt} format='D MMM YYYY' className="post-data"/>
                </div>
                <ul className="post-block">
                    <li className="post-url"><span><AiOutlineCheck size={25} style={{ marginLeft: '5px', marginRight:'15px'}}/></span><a href={post.urlOff} target='_blank' rel="noopener noreferrer">{post.urlOff}</a></li>
                    <li className="post-url"><span><AiOutlineRead size={25} style={{ marginLeft: '5px', marginRight:'15px'}}/></span><a href={post.urlBook} target='_blank' rel="noopener noreferrer">{post.urlBook}</a></li>
                    <li className="post-url"><span><AiOutlineFileImage size={25} style={{ marginLeft: '5px', marginRight: '15px' }} /></span><a href={post.imgUrl} target='_blank' rel="noopener noreferrer">{post.imgUrl}</a></li>
                    <li className="post-text">{post.info}</li>
                </ul>
            </div>       
            <div>
                {
                user?._id === post.author && (
                    <div className='post-full-nav'>
                        <Link to={`/${params.id}/edit`}><button className='btn-edit'><AiOutlineEdit size={20} style={{ color:'#fff'}} /></button></Link>
                        <button className='btn-del' onClick={removePostHandler}><AiFillDelete size={20} style={{ color:'#fff'}}/></button>
                    </div>
                    )
                 }
            </div>  
        </div>
        )
}