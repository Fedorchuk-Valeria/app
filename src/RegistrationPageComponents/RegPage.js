import React, {Component} from 'react'
import {useNavigate } from 'react-router-dom';
import { RegistrationRouterComponent } from './RegRouter';
import logo from "../images/kiberlogo.jpg"
import "../styles/LoginPage.css"


export class RegistrationPage extends Component {

    render() {
        return(
            <div className='main'>
                <img className="logoImg" src={logo}/>
                <RegistrationRouterComponent token={this.props.token}/>
            </div>
        )
    }
}