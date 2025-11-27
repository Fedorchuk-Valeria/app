import React, {Component} from 'react'
import "../../styles/Reviews.css"


export class Review extends Component {

    constructor() {
        super()
        this.state = {
            data: "",
            text: ""
        }
    }

    componentDidMount() {
        let date = this.props.review.created_at.slice(0, 10).replaceAll("-", ".")
        
        this.setState({
            id: this.props.review.id,
            date: this.props.review.created_at.slice(0, 10).replaceAll("-", "."),
            text: this.props.review.content,
        })
    }

    render(){
        return(
                <div className='reviewBody'>
                    <details className='reviewField'>
                        <summary className='reviewHeader'>Отзыв за {this.state.date}</summary>
                        {this.state.text}
                    </details>
            </div>
        )
    }
}