import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { GroupRouterComponent } from './GroupRouter'
import { GroupsNavRouterComponent } from './GroupsNavRouter'
import "../../styles/ListPage.css"
import "../../styles/navPanel.css"


export class ResumesPage extends Component {

    constructor() {
        super()  
    }

    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <GroupsNavRouterComponent/>
                <GroupRouterComponent/>
            </div>
        )
    }
}