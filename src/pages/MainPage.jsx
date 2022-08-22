import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostItem } from '../components/PostItem';
import '../index.css';
import { getAllPost } from '../redux/features/post/postSlice';



export const MainPage = () => {
    
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth) 
            
    useEffect(() => {
         dispatch(getAllPost())
    }, [dispatch])
    
    if (!user) {
        return <div className='main wrapper'>
            <span className='top'>Авторизуйтесь</span>
        </div>
    }

    if (!posts.length) {
        return <div className='main'>Записи відсутні</div>
    }    

    return (
        <div className='main'>
            {user?._id && posts?.map((post, idx) => (<PostItem key={idx} post={post} />))}
        </div>
        
        )
}