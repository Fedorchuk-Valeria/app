import React from 'react'

export function ReviewNavRouterComponent(props){

    return (
        <div id="navPanel">
            <a href="/Resumes">Группы / </a>
            {props.group ? <a href="GroupClients">{props.group} / </a> : <a></a>}
            <a href="/ClientsWithReviews">Отзывы / </a>
            <a href="/ClientsResumes">{props.client} / </a>
            <a id="current" href="">Отзыв</a>
        </div>
    );
};