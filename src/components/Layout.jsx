import React from 'react';
import { Navbar } from './Navbar';
import '../index.css';

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
                <Navbar />
                    {children}
        </React.Fragment>
    )
}