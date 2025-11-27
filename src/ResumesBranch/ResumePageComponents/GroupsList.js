import React, {Component} from 'react'
import { GetGroups } from '../../api'
import childrenIcon from "../../images/childrenIcon.png"


export class GroupsList extends Component {

    days = {
            "mon": "ПН",
            "tue": "ВТ",
            "wed": "СР",
            "thur": "ЧТ",
            "sat": "СБ",
            "sun": "ВС"
        }

    locations = {
        "aero": "Аэро",
        "nem": "Нём",
        "bogd": "Богд",
        "arena": "Арена",
        "dana": "Дана",
        "chur": "Чюр",
        "grib": "МОС",
        "rad": "Радужный",
        "bor": "Боровки",
        "str": "Строителей",
        "gon": "Гончарная",
        "neft": "Нефтяников"
    }

    constructor() {
        super()
        this.state = {
            sort_by_day: "Все",
            sort_by_loc: "Все",
            groups: []
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem("senior") == "true") {
            document.getElementById("forLocSelect").classList.remove("seniorSelect")
            document.getElementById("selectLoc").classList.remove("seniorSelect")
        }
        GetGroups(sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            this.setState({
                groups: res.items
            })
            let groups_ids = ""
            res.items.forEach(group => {
                groups_ids = groups_ids + group.id + ","
            });
            sessionStorage.setItem("tutorGroups", groups_ids)
            document.getElementById("loader").classList.add("hidden")
        })
    }

    onClickSelectHandler = (e) => {
        let day = document.getElementById('selectDay').value
        let loc = document.getElementById('selectLoc').value
        this.setState({
            groups: []
        })
        document.getElementById("loader").classList.remove("hidden")
        GetGroups(sessionStorage.getItem("token")).then(res => {
            if (!res) {
                this.props.navigate('/')
                return
            }
            let new_groups = []
            if (day == "all") {
                this.setState({
                    groups: res
                })
                new_groups = res
            } else {
                new_groups = res.filter((g) => g.name.includes(this.days[day]))
                this.setState({
                    groups: new_groups
                })
            }
            if (loc == "all") {
                document.getElementById("loader").classList.add("hidden")
            } else {
                this.setState({
                    groups: new_groups.filter((g) => g.name.includes(this.locations[loc]))
            })
            document.getElementById("loader").classList.add("hidden")
            }
        })
    }

    OpenGroupClickHandler = (e) => {
        let groupId = e.target.id
        let groupName = e.target.parentNode.parentNode.childNodes[0].innerText
        sessionStorage.setItem("groupId", groupId)
        sessionStorage.setItem("groupName", groupName)
        sessionStorage.setItem("allResidents", false)
        this.props.navigate('/GroupClients')
    }

    OpenAllResidentsPage = (e) => {
        // sessionStorage.setItem("allResidents", true)
        this.props.navigate('/AllResidents')
    }



    render() { 
        return (
            <div>
                <div id="sortField">
                    <section>
                        <label id="forDaySelect" className='forSelect'>День недели:</label>
                        <select id="selectDay" name="selectDay" onChange={this.onClickSelectHandler}>
                            <option value="all">Все</option>
                            <option value="mon">ПН</option>
                            <option value="tue">ВТ</option>
                            <option value="wed">СР</option>
                            <option value="thur">ЧТ</option>
                            <option value="sat">СБ</option>
                            <option value="sun">ВС</option>
                        </select>
                    </section>
                    <section>
                        <label className="seniorSelect forSelect" id="forLocSelect">Локация:</label>
                        <select className="seniorSelect" id="selectLoc" name="selectLoc" onChange={this.onClickSelectHandler}>
                            <option value="all">Все</option>
                            <option value="aero">Аэро</option>
                            <option value="nem">Неманская</option>
                            <option value="bogd">Богдановича</option>
                            <option value="arena">Арена</option>
                            <option value="dana">Дана</option>
                            <option value="chur">Чюрлениса</option>
                            <option value="grib">Грибоедова</option>
                            <option value="rad">Радужный</option>
                            <option value="bor">Боровки</option>
                            <option value="str">Строителей</option>
                            <option value="gon">Гончарная</option>
                            <option value="neft">Нефтяников</option>
                        </select>
                    </section>
                </div>
                <table id="groups">
                    <thead>
                        <tr id="groupsSectionHeader">
                            <th>Группа</th>
                            <th><img id="childrenImg" src={childrenIcon}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="residents">Все резиденты</td>
                            <td><button сlass="openGroup" onClick={this.OpenAllResidentsPage}>Открыть</button></td>
                        </tr>
                        <div id="loader" className="loader"></div>
                        {this.state.groups.map(g => (
                            <tr key={g.id}>
                                <td>{g.name}</td>
                                <td><button id={g.id} сlass="openGroup" onClick={this.OpenGroupClickHandler}>Открыть</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}