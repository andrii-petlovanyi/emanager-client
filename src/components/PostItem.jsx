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
         <div className="post-block">
                <div className="postHeader">
                    <h3 className="postTitle"><AiOutlineStar size={25} style={{ marginRight:'10px'}} />{post.model}</h3>
                    <Moment date={post.createdAt} format='D MMM YYYY' className="postData"/>
                </div>
                <div className="postBlock">
                    <div className="postUrl"><p><AiOutlineCheck size={25} style={{ marginRight:'10px'}}/>{post.urlOff}</p></div>
                    <div className="postUrl"><p><AiOutlineRead size={25} style={{ marginRight:'10px'}}/>{post.urlBook}</p></div>
                    <div className="postUrl"><p><AiOutlineFileImage size={25} style={{ marginRight: '10px' }} />{post.imgUrl}</p></div>
                    <div className="postText"><p>{post.info}</p></div>
                </div>
        </div>
        </Link>
    
)}