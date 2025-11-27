import React, {Component} from 'react'
import {useNavigate } from 'react-router-dom';
import { FormComponent } from './TutorLoginForm'
import { RouterComponent } from './Router';
import logo from "../images/kiberlogo.jpg"
import "../styles/LoginPage.css"


export class LoginPage extends Component {

    render() {
        return(
            <div className='main'>
                <img className="logoImg" src={logo}/>
                <RouterComponent token={this.props.token}/>
            </div>
        )
    }
}