import React, {Component} from 'react'
import { HeaderRouterComponent } from '../../headersComponents/HeaderRouter'
import { GroupRouterComponent } from './GroupRouter'
import "../../styles/ListPage.css"


export class ResumesPage extends Component {

    constructor() {
        super()  
    }

    render() {
        return(
            <div id="listPageMain">
                <HeaderRouterComponent/>
                <GroupRouterComponent/>
            </div>
        )
    }
}