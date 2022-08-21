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
import { AiOutlineRead, AiOutlineStar, AiOutlineCheck, AiOutlineFileImage, AiOutlineEdit } from 'react-icons/ai'

export const PostPage = () => {

    const [post, setPost] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Запис видалено')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


    const {user} = useSelector((state) => state.auth)

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    if (!post) {
        return (
            <div className="postViewMain wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        )
    }
    return (
        <div className='postViewMain'>
            <div>
                <button className='btn_enter'><Link className='link-item' to={'/'}>Назад</Link> </button>
            </div>
                    
            <div className="postView">
                <div className="postHeader">
                    <h3 className="postTitle"><AiOutlineStar size={25} style={{ marginRight:'10px'}} />{post.model}</h3>
                    <Moment date={post.createdAt} format='D MMM YYYY' className="postData"/>
                </div>
                <div className="postBlock">
                    <div className="postBlockUrl"><a href={post.urlOff} rel='noreferrer noopener' target='_blank'><AiOutlineCheck size={25} style={{ marginRight:'10px'}}/>{post.urlOff}</a></div>
                    <div className="postBlockUrl"><a href={post.urlBook} rel='noreferrer noopener' target='_blank'><AiOutlineRead size={25} style={{ marginRight: '10px' }} />{post.urlBook}</a></div>
                    <div className="postBlockUrl"><a href={post.imgUrl} rel='noreferrer noopener' target='_blank'><AiOutlineFileImage size={25} style={{ marginRight:'10px'}}/>{post.imgUrl}</a></div>
                    <div className="postText"><p>{post.info}</p></div>
                </div>
            </div>       
            <div>
                {
                user?._id === post.author && (
                    <div className='btnViewNav'>
                        <button className='btn-edit'><Link to={`/${params.id}/edit`}><AiOutlineEdit size={20} style={{ color:'#fff'}} /></Link></button>
                        <button className='btn-del' onClick={removePostHandler}><AiFillDelete size={20} style={{ color:'#fff'}}/></button>
                    </div>
                    )
                 }
            </div>  
        </div>
        )
}