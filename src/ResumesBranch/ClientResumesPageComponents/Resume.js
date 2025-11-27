import React, {Component} from 'react'
import editImg from "../../images/edit.png"
import "../../styles/Resumes.css"


export class Resume extends Component {

    constructor() {
        super()
        this.state = {
            id: 0,
            date: "",
            text: "",
            hrefText: "#"
        }
    }

    componentDidMount() {
        let date = this.props.resume.created_at.slice(0, 10).replaceAll("-", ".")
        
        this.setState({
            id: this.props.resume.id,
            date: this.props.resume.created_at.slice(0, 10).replaceAll("-", "."),
            text: this.props.resume.content,
            hrefText: "#" + this.props.resume.id.toString()
        })
    }

    hrefClickHandler = (e) =>
    {
        document.getElementById("editResume").style.display = "flex"
        document.getElementById(this.state.id).style.boxShadow = "0 0 10px 5px #06B9BE"
        document.getElementById("resumeText").value = this.state.text
        this.props.parent.state.edittingResumeId = this.state.id
    }

    render(){
        return(
                <div className='resumeBody'>
                    <details id={this.state.id} className='resumeField'>
                        <summary className='resumeHeader'>Резюме за {this.state.date}</summary>
                        {this.state.text}
                    </details>
                    <section className="resumeActions">
                        {/* <button className='resumeActionButton'><img src={saveImg}/></button> */}
                        <a onClick={this.hrefClickHandler} className='resumeActionButton'><img src={editImg}/></a>
                    </section>
            </div>
        )
    }
}