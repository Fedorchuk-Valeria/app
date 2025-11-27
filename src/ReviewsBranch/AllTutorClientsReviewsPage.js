import React, {Component} from 'react'
import { HeaderRouterComponent } from '../headersComponents/HeaderRouter'
import "../styles/ListPage.css"
import { ClientsReviewsRouterComponent } from './ClientsReviewsRouter'


export class ClientsreviewsPage extends Component {


    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <ClientsReviewsRouterComponent/>
            </div>
        )
    }
}