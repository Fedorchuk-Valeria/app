import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RegistrationFormComponent } from './TutorRegForm'

export function RegistrationRouterComponent(props) {

    const navigate = useNavigate();
    return (
        <RegistrationFormComponent navigate={navigate} token={props.token}/>
    )
}