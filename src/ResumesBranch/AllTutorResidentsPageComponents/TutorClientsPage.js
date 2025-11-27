import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { ClientsRouterComponent } from './TutorClientsRouter'
import "../../styles/ListPage.css"


export class TutorClientsPage extends Component {


    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <ClientsRouterComponent/>
            </div>
        )
    }
}