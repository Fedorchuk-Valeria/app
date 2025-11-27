import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ClientsResumesPage } from './ClientsResumesPage';

export function ClientResumesRouter(props) {

    const navigate = useNavigate();
    return (
        <ClientsResumesPage navigate={navigate}/>
    )
}