import React, {Component} from 'react'
import { GetTutorResidents, GetNotApproveResumes, CheckNotAproveResumes, GetReviews, FilderByStartDate } from '../../api'
import greenMarkImg from "../../images/dont_have_approve_resumes.png"
import redMarkImg from "../../images/have_approve_resumes.png"
import cancel from "../../images/Cancel_icon.png"
import blockMarkImg from "../../images/dont_have_rev.png"



export class ClientsList extends Component {
    constructor() {
        super()
        this.state = {
            filter:  false,
            clients: [],
            full_list_clients: [],
            page: 1
        }
    }

    async getPageClients(groups) {
        GetTutorResidents(groups, sessionStorage.getItem("token")).then(res => {
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
                    if(res[index].clients) {
                        continue
                    }
                    res[index].status = CheckNotAproveResumes(res_resumes, res[index].customer_id.toString())
                    let reviews = await GetReviews(res[index].customer_id.toString(), sessionStorage.getItem("token"))
                    res[index].reviews_exist = reviews.length > 0
                    new_clients.push(res[index])
                }
                this.setState({
                     clients: new_clients,
                     full_list_clients: new_clients
                })
                let clients_ids = new_clients.map(c => c.customer_id)
                let clients_names = new_clients.map(c => c.client_name)
                sessionStorage.setItem("clientsIds", clients_ids)
                sessionStorage.setItem("clientsNames", clients_names)
                if(document.getElementById("loader")) {
                    document.getElementById("loader").classList.add("hidden");
                }
            }) 
        })
    }

    componentDidMount() {
        sessionStorage.removeItem('groupName')
        let groups = sessionStorage.getItem("tutorGroups")
        if(sessionStorage.getItem("senior") === "true") {
            groups = sessionStorage.getItem("tutorGroups").split(',').slice((this.state.page-1)*10+1, this.state.page*10).toString()
            document.getElementById("navForSenior").style.display = "flex"
        }
        this.getPageClients(groups)
    }

    onClientClickHandler = (e) =>
    {
        sessionStorage.setItem("clientId", e.target.id)
        sessionStorage.setItem("clientName", e.target.innerText)
        // this.props.navigate("/ClientsResumes")
        window.open("/ClientsResumes", "_blank")
    }

    onFilterButtonClickHandler = (e) => {
        let temp = []
        if(sessionStorage.getItem("senior") === "true") {
            temp = this.state.clients
        } else {
            temp = this.state.full_list_clients
        }
        this.setState({
            clients: []
        })
        document.getElementById("loader").classList.remove("hidden")
        let start_date = document.getElementById("startDate").value
        let end_date = document.getElementById("endDate").value
        FilderByStartDate(temp, sessionStorage.getItem("token"), start_date, end_date).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            this.setState({
                clients: res
            })
            let clients_ids = res.map(c => c.customer_id)
            let clients_names = res.map(c => c.client_name)
            sessionStorage.setItem("clientsIds", clients_ids)
            sessionStorage.setItem("clientsNames", clients_names)
            document.getElementById("loader").classList.add("hidden")
            //window.location.reload();
        })
    }

    onResetFilterClickHandler = (e) => {
        // window.location.reload();
        this.setState({
                clients: this.state.full_list_clients
        })
        let clients_ids = this.state.full_list_clients.map(c => c.customer_id)
        let clients_names = this.state.full_list_clients.map(c => c.client_name)
        sessionStorage.setItem("clientsIds", clients_ids)
        sessionStorage.setItem("clientsNames", clients_names)
    }

    onNextPageClickHandler = (e) => {
        this.setState({
            clients: []
        })
        document.getElementById("loader").classList.remove("hidden")
        let groups = sessionStorage.getItem("tutorGroups")
        this.setState({
            page: this.state.page + 1
        })
        if(sessionStorage.getItem("senior") === "true") {
            groups = sessionStorage.getItem("tutorGroups").split(',').slice((this.state.page)*10+1, (this.state.page+1)*10).toString()
        }
        this.getPageClients(groups)
        // document.getElementById("loader").classList.add("hidden")
    }

    onPrevPageClickHandler = (e) => {
        this.setState({
            clients: []
        })
        document.getElementById("loader").classList.remove("hidden")
        let groups = sessionStorage.getItem("tutorGroups")
        this.setState({
            page: this.state.page - 1
        })
        if(sessionStorage.getItem("senior") === "true") {
            groups = sessionStorage.getItem("tutorGroups").split(',').slice((this.state.page-2)*10+1, (this.state.page-1)*10).toString()
        }
        this.getPageClients(groups)
        // document.getElementById("loader").classList.add("hidden")
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
                <div id="navForSenior">
                    <button onClick={this.onPrevPageClickHandler}>Пред.</button>
                    {this.state.page}
                    <button onClick={this.onNextPageClickHandler}>След.</button>
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
                                {c.reviews_exist ? <td className="rightAlignment"><img className="mark" src={greenMarkImg}/></td> : <td className="rightAlignment"><img className="mark" src={blockMarkImg}/></td> }
                                {c.status ? <td className="rightAlignment"><img className="mark" src={redMarkImg}/></td> : <td className="rightAlignment"><img className="mark" src={greenMarkImg}/></td> }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}