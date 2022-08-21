import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { removeOffer } from '../redux/features/offer/offerSlice';
import { toast } from 'react-toastify'
import { AiFillCaretLeft } from 'react-icons/ai';

export const OfferDelPage = () => {

    const [offer, setOffer] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth) 

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

    if (!user) {
        return<div className='main'>Авторизуйтесь</div>
    }

    if (!offer) {
        return (
            <div className="main wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        )
    }
    return (
        <div className='offer-del-page'>
            <div className='offer-nav'>
                <Link to={'/offers'}><button className='btn-back'><AiFillCaretLeft size={20} /></button></Link>
            </div>        
            <ul className="offer-card">
                <li className="offer-model">{offer.model}</li>
                {/* <Moment date={offer.Date} format='D MMM YYYY' className="postData"/> */}
                <li className="offer-initials"><label>Ім'я: </label>{offer.FirstName}</li>
                <li className="offer-initials"><label>Прізвище: </label>{offer.LastName}</li>
                <li className="offer-initials"><label>Нікнейм: </label>{}</li>
            </ul>       
            <div className='offer-nav'>
                <button className='btn-del' onClick={removeOfferHandler}><AiFillDelete size={20} style={{ color:'#fff'}}/></button>
            </div>
        </div>
        )
}