import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ClientsList } from './ClientsList';

export function ClientsRouterComponent(props) {

    const navigate = useNavigate();
    return (
        <ClientsList navigate={navigate}/>
    )
}