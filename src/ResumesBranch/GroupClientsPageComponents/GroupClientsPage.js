import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { GroupClientsRouterComponent } from './GroupClientsRouter'
import { GroupNavRouterComponent } from './GroupNavRouter'
import "../../styles/ListPage.css"
import "../../styles/navPanel.css"


export class GroupClientsPage extends Component {


    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent />
                <GroupNavRouterComponent group={sessionStorage.getItem("groupName")}/>
                <GroupClientsRouterComponent/>
            </div>
        )
    }
}