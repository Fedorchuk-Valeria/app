import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginTutor, CheckSeniorRole } from '../api';

export class FormComponent extends Component {
    constructor() {
        super()
        this.state = {
            numberPhone: '+375',
            error: ''
        }
    }


    ChangePhoneInputHandler = (e) => {
        this.setState({
            numberPhone: e.target.value.replace(/[a-zA-Z]/g, "").replace(/[\u0400-\u04FF]/g, '')
        })
    }

    ClickButtonHandler = (e) => {
        e.target.innerText = "Выполянется вход..."
        const number = this.state.numberPhone.replace("+", "")
        LoginTutor(number).then(res => {
            if (res) {
                sessionStorage.setItem("token", res.access_token)
                CheckSeniorRole(res.access_token).then(is_senior => {
                    sessionStorage.setItem("senior", is_senior)
                    this.props.navigate('/chooseService')
                })
            } else {
                document.getElementById("error").style.display = "block"
            }
        })
    }

    ClickRefHandler = (e) => {
        this.props.navigate('/Registration')
    }

    render(){
        return (
            <form>
                <label>Ваш номер телефона:</label>
                <input type="tel" id="tutorPhone" required value={this.state.numberPhone} onChange={this.ChangePhoneInputHandler}></input>
                <label id="error">Неверные данные</label>
                <button type='button' onClick={this.ClickButtonHandler}>Вход</button>
                <a id='reg' onClick={this.ClickRefHandler}>Регистрация</a>
            </form>
        )
    }
}