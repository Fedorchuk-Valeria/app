import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FormComponent } from './TutorLoginForm'

export function RouterComponent(props) {

    const navigate = useNavigate();
    return (
        <FormComponent token={props.token} navigate={navigate}/>
    )
}