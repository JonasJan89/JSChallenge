import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AssessorView extends Component {

    render() {
        return(
            <div className="assessor-view">
                <Link  to={`/feedbacks/${this.props.solutionID}`}>
                    <button>assess solution</button>
                </Link>
            </div>
        );
    }
};
