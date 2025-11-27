import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GroupsList } from './GroupsList';

export function GroupRouterComponent(props) {

    const navigate = useNavigate();
    return (
        <GroupsList navigate={navigate}/>
    )
}