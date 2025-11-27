import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ClientsWithReviewsList } from './ClientsWithReviewsList';

export function ClientsReviewsRouterComponent(props) {

    const navigate = useNavigate();
    return (
        <ClientsWithReviewsList navigate={navigate}/>
    )
}