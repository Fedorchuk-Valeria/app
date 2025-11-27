import React, {Component} from 'react'
import { GetTutorResidents, GetGroups, GetReviews} from '../api'
import greenMarkImg from "../images/dont_have_approve_resumes.png"
import redMarkImg from "../images/have_approve_resumes.png"


export class ClientsWithReviewsList extends Component {

    constructor() {
        super()
        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        GetGroups(sessionStorage.getItem("token")).then(res_groups => {
            if (!res_groups) {
                this.props.navigate('/')
                return
            }
            let groups_ids = ""
            res_groups.forEach(group => {
                groups_ids = groups_ids + group.id + ","
            });
            GetTutorResidents(groups_ids, sessionStorage.getItem("token")).then(async (res) => {
                if (!res) {
                    this.props.navigate('/')
                    return
                }
                let new_clients = []
                let new_clients_with_reviews = []
                for (let index = 0; index < res.length; index++) {
                    let reviews = await GetReviews(res[index].customer_id.toString(), sessionStorage.getItem("token"))
                    let reviewDateStr = "Нет"
                    let reviewDate
                    if(reviews.length > 0) {
                        reviewDate = new Date(reviews.at(-1).created_at.slice(0, 10))
                        reviewDateStr = reviews.at(-1).created_at.slice(0, 10).split('-')
                        res[index].reviewLastDateStr = reviewDateStr[2] + '.' + reviewDateStr[1] + '.' + reviewDateStr[0]
                        res[index].reviewLastDate = reviewDate
                        new_clients_with_reviews.push(res[index])
                    } else {
                        res[index].reviewLastDateStr = reviewDateStr
                        res[index].reviewLastDate = reviewDate
                        new_clients.push(res[index])
                    }
                }
                new_clients_with_reviews.sort((el1, el2) => {
                    return el1.reviewLastDate.getTime() - el2.reviewLastDate.getTime()
                })
                this.setState({
                    clients: new_clients_with_reviews.concat(new_clients)
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
        this.props.navigate("/ClientReviews")
    }

    render() { 
        return (
            <div>
                <table id="groups">
                    <thead>
                        <tr id="groupsSectionHeader">
                            <th className="leftAlign">Резидент</th>
                            {/* <th className="tableHeader">Группа</th> */}
                            <th className="tableHeader">Отзывы</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div id="loader" className="loader"></div>
                        {this.state.clients.map(c => (
                            <tr key={c.customer_id}>
                                <td id={c.customer_id} onClick={this.onClientClickHandler} className="click leftAlign">{c.client_name}</td>
                                {/* <td className="rightAlignment">Дана ВС 18:20</td> */}
                                <td className="rightAlignment">{c.reviewLastDateStr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}