import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderComponent } from './Header';

export function HeaderRouterComponent() {

    const navigate = useNavigate();
    return (
        <HeaderComponent navigate={navigate}/>
    )
}