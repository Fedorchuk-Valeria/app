import React, {Component} from 'react'
import { RegisterTutor } from '../api';

export class RegistrationFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            numberPhone: '+375',
            password: ''
        }
    }


    ChangePhoneInputHandler = (e) => {
        this.setState({
            numberPhone: e.target.value.replace(/[a-zA-Z]/g, "").replace(/[\u0400-\u04FF]/g, '')
        })
    }

    ClickButtonHandler = (e) => {
        document.getElementById("regButton").textContent = "Выполняем..."
        const number = document.getElementById("tutorPhone").value.replace("+", "")
        if(number.length != 12) {
            document.getElementById("error").style.display = "block"
        } else {
            const branch = document.getElementById("branch").value
            RegisterTutor(number, branch).then(res => {
                if (res) {
                    document.getElementById("error").textContent = "Регистрация прошла успешно!"
                    document.getElementById("error").style.display = "block"
                    const nav = this.props.navigate
                    setTimeout(function(){ nav('/') }, 800);
                } else {
                    document.getElementById("error").textContent = "Что-то пошло не так..."
                    document.getElementById("error").style.display = "block"
                    document.getElementById("regButton").textContent = "Регистрация"
                }
            })
        }
    }

    render(){
        return (
            <form>
                <label>Выберите город:</label>
                <select id="branch" name="tutor_branch">
                    <option value="1">Минск</option>
                    <option value="2">Барановичи</option>
                    <option value="3">Борисов</option>
                    <option value="4">Новополоцк</option>
                </select>
                <label>Ваш номер телефона:</label>
                <input type="tel" id="tutorPhone" required value={this.state.numberPhone} onChange={this.ChangePhoneInputHandler}></input>
                <button id="regButton" type='button' onClick={this.ClickButtonHandler}>Регистрация</button>
                <label id="error">Что-то пошло не так...</label>
            </form>
        )
    }
}