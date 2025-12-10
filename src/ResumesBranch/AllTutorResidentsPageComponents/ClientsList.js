import React, {Component} from 'react'
import { GetTutorResidents, GetNotApproveResumes, CheckNotAproveResumes, GetReviews, FilderByStartDate } from '../../api'
import greenMarkImg from "../../images/dont_have_approve_resumes.png"
import redMarkImg from "../../images/have_approve_resumes.png"
import cancel from "../../images/Cancel_icon.png"


export class ClientsList extends Component {
    constructor() {
        super()
        this.state = {
            filter:  false,
            clients: []
        }
    }

    componentDidMount() {
        GetTutorResidents(sessionStorage.getItem("tutorGroups"), sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            let new_clients = []
            GetNotApproveResumes(sessionStorage.getItem("token")).then(async (res_resumes) => {
                if (!res_resumes) {
                    this.props.navigate('/')
                    return
                }
                for (let index = 0; index < res.length; index++) {
                    res[index].status = CheckNotAproveResumes(res_resumes, res[index].customer_id.toString())
                    let reviews = await GetReviews(res[index].customer_id.toString(), sessionStorage.getItem("token"))
                    res[index].reviews_exist = reviews.length > 0
                    new_clients.push(res[index])
                }
                this.setState({
                     clients: new_clients
                })
                if(document.getElementById("loader")) {
                    document.getElementById("loader").classList.add("hidden");
                }
            }) 
        })
    }

    onClientClickHandler = (e) =>
    {
        sessionStorage.setItem("clientId", e.target.id)
        sessionStorage.setItem("clientName", e.target.innerText)
        // this.props.navigate("/ClientsResumes")
        window.open("/ClientsResumes", "_blank")
    }

    onFilterButtonClickHandler = (e) => {
        this.setState({
            clients: []
        })
        document.getElementById("loader").classList.remove("hidden")
        let start_date = document.getElementById("startDate").value
        let end_date = document.getElementById("endDate").value
        FilderByStartDate(this.state.clients, sessionStorage.getItem("token"), start_date, end_date).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            this.setState({
                clients: res
            })
            document.getElementById("loader").classList.add("hidden")
            //window.location.reload();
        })
    }

    onResetFilterClickHandler = (e) => {
        window.location.reload();
    }


    render() { 
        return (
            <div>
                <div id="filter">
                    <p>Дата начала обучения:</p>
                    <input type="date" id="startDate"/> <p>-</p>
                    <input type="date" id="endDate"/>
                    <button onClick={this.onResetFilterClickHandler} id="resetFilterButton"><img src={cancel}/></button>
                    <button onClick={this.onFilterButtonClickHandler} id="filterButton">Фильтровать</button>
                </div>
                <table id="groups">
                    <thead>
                        <tr id="groupsSectionHeader">
                            <th className="leftAlign">Резидент</th>
                            <th className="tableHeader">Отзывы</th>
                            <th className="tableHeader">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div id="loader" className="loader"></div>
                        {this.state.clients.map(c => (
                            <tr key={c.customer_id}>
                                <td id={c.customer_id} onClick={this.onClientClickHandler} className="click leftAlign">{c.client_name}</td>
                                {c.reviews_exist ? <td className="rightAlignment"><img className="mark" src={redMarkImg}/></td> : <td className="rightAlignment"><img className="mark" src={greenMarkImg}/></td> }
                                {c.status ? <td className="rightAlignment"><img className="mark" src={redMarkImg}/></td> : <td className="rightAlignment"><img className="mark" src={greenMarkImg}/></td> }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}