import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GroupClientsList } from './GroupClientsList';

export function GroupClientsRouterComponent(props) {

    const navigate = useNavigate();
    return (
        <GroupClientsList navigate={navigate}/>
    )
}