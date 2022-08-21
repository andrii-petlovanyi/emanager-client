import React from "react";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import '../index.css'
import { AiOutlineRead, AiOutlineStar, AiOutlineCheck, AiOutlineFileImage } from 'react-icons/ai'


export const PostItem = ({ post }) => {
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
        <Link to={`/${post._id}`} className='link-item'>
         <div className="post-item">
                <div className="post-header">
                    <h3 className="post-title"><AiOutlineStar size={25} style={{ marginRight:'10px'}} />{post.model}</h3>
                    <Moment date={post.createdAt} format='D MMM YYYY' className="post-data"/>
                </div>
                <ul className="post-block">
                    <li className="post-url"><span><AiOutlineCheck size={25} style={{ marginLeft: '10px', marginRight:'20px'}}/></span>{post.urlOff}</li>
                    <li className="post-url"><span><AiOutlineRead size={25} style={{ marginLeft: '10px', marginRight:'20px'}}/></span>{post.urlBook}</li>
                    <li className="post-url"><span><AiOutlineFileImage size={25} style={{ marginLeft: '10px', marginRight: '20px' }} /></span>{post.imgUrl}</li>
                    <li className="post-text">{post.info}</li>
                </ul>
        </div>
        </Link>
    
)}