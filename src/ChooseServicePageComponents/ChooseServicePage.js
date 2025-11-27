import React, {Component} from 'react'
import { HeaderRouterComponent } from '../headersComponents/HeaderRouter'
import { ServiceRouterComponent } from './ServiceRouterComponent'


export class ChooseServicePage extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div id="main">
                <HeaderRouterComponent/>
                <ServiceRouterComponent/>
            </div>
        )
    }
}