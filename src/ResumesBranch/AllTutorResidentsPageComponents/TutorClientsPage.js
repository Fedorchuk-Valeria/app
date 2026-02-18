import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { ClientsRouterComponent } from './TutorClientsRouter'
import { AllResidentsNavRouterComponent } from './AllResidentsNavRouter'
import "../../styles/ListPage.css"
import "../../styles/navPanel.css"


export class TutorClientsPage extends Component {


    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <AllResidentsNavRouterComponent />
                <ClientsRouterComponent/>
            </div>
        )
    }
}