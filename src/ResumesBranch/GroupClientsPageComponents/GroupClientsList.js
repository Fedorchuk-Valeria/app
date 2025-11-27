import React, {Component} from 'react'
import { GetGroupsClients, GetNotApproveResumes, CheckNotAproveResumes, GetReviews} from '../../api'
import greenMarkImg from "../../images/dont_have_approve_resumes.png"
import redMarkImg from "../../images/have_approve_resumes.png"


export class GroupClientsList extends Component {
    constructor() {
        super()
        this.state = {
            groupName: "",
            clients: [],
        }
    }

    componentDidMount() {
        this.setState({
            groupName: sessionStorage.getItem("groupName")
        })
        GetGroupsClients(sessionStorage.getItem("groupId"), sessionStorage.getItem("token")).then(res => {
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


    // OpenClientClickHandler = (e) => {
    //     let groupId = e.target.id
    //     sessionStorage.setItem("groupId", groupId)
    //     this.props.navigate('/GroupClients')
    // }

    onClientClickHandler = (e) =>
    {
        sessionStorage.setItem("clientId", e.target.id)
        sessionStorage.setItem("clientName", e.target.innerText)
        this.props.navigate("/ClientsResumes")
    }



    render() { 
        return (
            <div>
                <div id="groupField">
                    <label id="groupName">{this.state.groupName}</label>
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