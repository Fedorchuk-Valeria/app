import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ServiceButtons } from './ServiceButtonsComponent';

export function ServiceRouterComponent() {

    const navigate = useNavigate();
    return (
        <ServiceButtons navigate={navigate}/>
    )
}