import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostItem } from '../components/PostItem';
import '../index.css';
import { getAllPost } from '../redux/features/post/postSlice';



export const MainPage = () => {

    const { posts } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
            
    useEffect(() => {
        dispatch(getAllPost())
    }, [dispatch])

    const shortPosts = [];
    for (let i = 0; i < 10; i++) {
        shortPosts.push(posts[i])
    }


    if (!posts.length ) {
        return (<div className='main'>Записи відсутні</div>)
    }
    
    if (!user) {
        return <div className='main wrapper'>
            <span className='top'>Авторизуйтесь</span>
        </div>
    }

    return (
        <div className='main'>
            {user?._id && shortPosts?.map((post, idx) => (<PostItem key={idx} post={post} />))}
        </div>
        
        )
}

    

