import React from 'react'

export function ClientResumesNavRouterComponent(props){

    return (
        <div id="navPanel">
            <a href="/Resumes">Группы / </a>
            <a href="GroupClients">{props.group} / </a>
            <a id="current" href="">{props.client}</a>
        </div>
    );
};