import React, {Component} from 'react'


export class ServiceButtons extends Component {

    ClickResumeButtonHandler = (e) => {
        this.props.navigate('/Resumes')
    }

    ClickReviewButtonHandler = (e) => {
        this.props.navigate('/ClientsWithReviews')
    }

    
    render() {
        return (
            <div id="buttonsContainer">
                <p>Выбрать...</p>
                <button onClick={this.ClickResumeButtonHandler}>Резюме</button>
                <button onClick={this.ClickReviewButtonHandler}>Отзывы</button>
                <button>КИБЕРшоп</button>
            </div>
        )
    }
}