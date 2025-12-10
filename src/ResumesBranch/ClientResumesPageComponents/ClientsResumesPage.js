import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { Resume } from './Resume'
import { GetClientResumes, EditClientResume, AddResume, VerifyResume, DeleteResume } from '../../api'
import "../../styles/Resumes.css"


export class ClientsResumesPage extends Component {
    constructor() {
        super()
        this.state = {
            groupName: "",
            clientName: "",
            resumes: [],
            edittingResumeId: -1,
            edittingResumeText: ""
        }
    }

    componentDidMount(){
        if (sessionStorage.getItem("senior") == 'true') {
            document.getElementById("checkInButton").classList.remove("seniorButton")
            document.getElementById("deleteButton").classList.remove("seniorButton")
        }
        this.setState({
            groupName: sessionStorage.getItem("groupName"),
            clientName: sessionStorage.getItem("clientName"),
        }) 
        GetClientResumes(sessionStorage.getItem("clientId"), sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            this.setState({
                resumes: res
            })
        })
    }

    resumeOkClickHandler = (e) => {
        this.state.edittingResumeText = document.getElementById("resumeText").value;
        EditClientResume(this.state.edittingResumeId, this.state.edittingResumeText, sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            document.getElementById("editResume").style.display = "none"
            document.getElementById(this.state.edittingResumeId).style.boxShadow = "none"
            window.location.reload();
        })

    }

    textAreaChangeHandler = (e) => {
        this.setState({
            edittingResumeText: e.target.value
        })
    }

    ViewReviewsButtonHandler = (e) => {
        this.props.navigate("/ClientReviews")
    }

    AddResumeButtonClick = (e) => {
        document.getElementById("addResume").style.display = "flex"
        document.getElementById("addResumeButton").style.boxShadow = "0 0 10px 5px #06B9BE"
    }

    AddResumeHandler = (e) => {
        this.state.edittingResumeText = document.getElementById("resumeText").value
        AddResume(sessionStorage.getItem("clientId"), this.state.edittingResumeText, sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            document.getElementById("addResume").style.display = "none"
            document.getElementById("addResumeButton").style.boxShadow = "none"
            window.location.reload();
        })
    }

    CloseAddResumeWindow = (e) => {
        document.getElementById("addResume").style.display = "none"
        document.getElementById("addResumeButton").style.boxShadow = "none"
    }

    resumeCheckClickHandler = (e) => {
        VerifyResume(this.state.edittingResumeId, sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            document.getElementById("editResume").style.display = "none"
            document.getElementById(this.state.edittingResumeId).style.boxShadow = "none"
        })  
    }

    resumeDeleteClickHandler = (e) => {
        DeleteResume(this.state.edittingResumeId, sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            document.getElementById("editResume").style.display = "none"
            document.getElementById(this.state.edittingResumeId).style.boxShadow = "none"
            window.location.reload();
        })
    }

    render() {
        return(
            <div id="resumesPage">
                <HeaderRouterComponent/>
                <div id="resumeMain">
                    <div className="modalResume" id="editResume">
                        <textarea onChange={this.textAreaChangeHandler} id="resumeText" value={this.state.edittingResumeText}/>
                        <button onClick={this.resumeOkClickHandler}>Ок</button>
                        <button id="checkInButton" className="seniorButton" onClick={this.resumeCheckClickHandler}>Проверено</button>
                        <button id="deleteButton" className="seniorButton" onClick={this.resumeDeleteClickHandler}>Удалить</button>
                    </div>
                    <div className="modalResume" id="addResume">
                        <textarea onChange={this.textAreaChangeHandler} id="resumeText" value={this.state.edittingResumeText}/>
                        <button onClick={this.AddResumeHandler}>Добавить</button>
                        <button id="cancelButton" onClick={this.CloseAddResumeWindow}>Отменить</button>
                    </div>
                    <div id="resumesPageHeader">
                        <p className="withBg">{this.state.clientName}</p>
                        <button onClick={this.ViewReviewsButtonHandler}>Увидеть отзывы</button>
                        <p>{this.state.groupName}</p>
                        {this.state.resumes.map(r => (
                            <Resume key={r.id} resume={r} parent={this}/>
                        ))}
                        <button onClick={this.AddResumeButtonClick} id="addResumeButton">Добавить резюме</button>
                    </div>
                </div>
            </div>
        )
    }
}