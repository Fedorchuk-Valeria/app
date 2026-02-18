import React from 'react'

export function GroupNavRouterComponent(props){

    return (
        <div id="navPanel">
            <a href="/Resumes">Группы / </a>
            <a id="current" href="">{props.group}</a>
        </div>
    );
};