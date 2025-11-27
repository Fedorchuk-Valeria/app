import React, {Component} from 'react'


export class SelectDay extends Component {

    constructor() {
        super()
        this.state = {
            sort_by_day: "Все"
        }
    }

    render() { 
        return (
            <div id="sortField">
                <label id="forDaySelect">День недели:</label>
                <select name="selectDay">
                    <option value="all">Все</option>
                    <option value="mon">ПН</option>
                    <option value="tue">ВТ</option>
                    <option value="wed">СР</option>
                    <option value="thur">ЧТ</option>
                    <option value="sat">СБ</option>
                    <option value="sun">ВС</option>
                </select>
            </div>
        )
    }
}