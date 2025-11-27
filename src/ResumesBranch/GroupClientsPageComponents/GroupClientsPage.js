import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { GroupClientsRouterComponent } from './GroupClientsRouter'
import "../../styles/ListPage.css"


export class GroupClientsPage extends Component {


    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <GroupClientsRouterComponent/>
            </div>
        )
    }
}