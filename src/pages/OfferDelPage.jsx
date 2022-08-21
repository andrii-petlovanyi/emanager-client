import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import '../index.css'
import { useDispatch } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { removeOffer } from '../redux/features/offer/offerSlice';
import { toast } from 'react-toastify'
import { AiOutlineStar } from 'react-icons/ai'

export const OfferDelPage = () => {

    const [offer, setOffer] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeOfferHandler = () => {
        try {
            dispatch(removeOffer(params.id))
            toast('Запис видалено')
            navigate('/offers')
        } catch (error) {
            console.log(error)
        }
    }



    const fetchOffer = useCallback(async () => {
        const { data } = await axios.get(`/offers/${params.id}`)
        setOffer(data)
    }, [params.id])

    useEffect(() => {
        fetchOffer()
    }, [fetchOffer])

    if (!offer) {
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
                <button className='btn_enter'><Link className='link-item' to={'/offers'}>Назад</Link> </button>
            </div>
                    
            <section className="postView">
                <div className="postHeader">
                    <h3 className="postTitle"><AiOutlineStar size={25} style={{ marginRight:'10px'}} />{offer.model}</h3>
                    {/* <Moment date={offer.Date} format='D MMM YYYY' className="postData"/> */}
                </div>
                <div className="postBlock">
                    <div className="postBlockUrl"><p>{offer.FirstName}</p></div>
                    <div className="postBlockUrl"><p>{offer.LastName}</p></div>
                </div>
            </section>       
            <div>
                
                    <div className='btnViewNav'>
                        <button className='btn-edit' onClick={removeOfferHandler}><AiFillDelete size={20} style={{ color:'#fff'}}/></button>
                    </div>
            </div>  
        </div>
        )
}