import React from "react";
import Globals from "../../Globals";



class Menu  extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={"col-6 offset-3"}>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Aegon Task</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <a className="nav-link" href="topic-form">New Topic</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="feedback-form">New Feedback</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="topic-list">Topic List</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="feedback-list">Feedback List</a>
                            </li>
                        </ul>
                    </div>
                </nav>


            </div>
        )
    }
}

export default Menu;