import React from 'react';
import { Navbar } from './Navbar';
import '../index.css';

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className=''>
                <Navbar />
                <div className='main'>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}