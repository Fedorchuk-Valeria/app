import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { Review } from './Review'
import { GetReviews } from '../../api'
import "../../styles/Reviews.css"


export class ClientReviewsPage extends Component {

    constructor() {
        super()
        this.state = {
            groupName: "",
            clientName: "",
            reviews: [],
        }
    }

    componentDidMount() {
        this.setState({
            groupName: sessionStorage.getItem("groupName"),
            clientName: sessionStorage.getItem("clientName"),
        }) 
        GetReviews(sessionStorage.getItem("clientId"), sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            this.setState({
                reviews: res
            })
        }
        )
    }

    
    render() {
        return(
            <div id="reviewsPage">
                <HeaderRouterComponent/>
                <div id="reviewMain">
                    <div id="reviewsPageHeader">
                        <p className="withBg" onClick={this.Test}>{this.state.clientName}</p>
                        <p>{this.state.groupName}</p>
                        {this.state.reviews.map(r => (
                            <Review key={r.id} review={r}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


