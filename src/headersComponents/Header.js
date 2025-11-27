import React, {Component} from 'react'
import logo from "../images/kiberlogo.jpg"
import exit from "../images/exit.png"
import "../styles/Header.css"
import "../styles/ChooseServicePage.css"

export class HeaderComponent extends Component {
    MenuButtonAnimation = (e) => {
        document.getElementById("menuButton").classList.toggle('change')
        if(!document.getElementById("menu").classList.contains("op")) {
            document.getElementById("menu").classList.add("op")
        } else {
            document.getElementById("menu").classList.remove("op")
        }
        
    } 

    ClickExitHandler = (e) => {
            sessionStorage.removeItem('tutorId')
    }

    ClickResumeButtonHandler = (e) => {
        this.props.navigate('/Resumes')
    }

    ClickReviewButtonHandler = (e) => {
        this.props.navigate('/ClientsWithReviews')
    }

    render() {
        return(
            <div>
            <header>
                <img src={logo}/>
                <div id="rightSection">
                    <a href='./' onClick={this.ClickExitHandler}><img id="logOut" src={exit}/></a>
                    <div id="menuButton" onClick={this.MenuButtonAnimation}>
                        <hr id="line1"></hr>
                        <hr id="line2"></hr>
                        <hr id="line3"></hr>
                    </div>
                </div>
            </header>
            <div id="menu" className="op">
                <p onClick={this.ClickResumeButtonHandler}>Резюме</p>
                <p onClick={this.ClickReviewButtonHandler}>Отзывы</p>
                <p>КИБЕРшоп</p>
            </div>
            </div>
        )
    }
}