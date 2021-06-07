import React from "react";
import Globals from "../../Globals";

const axios = require('axios');


class TopicForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicName: '',
            question: '',
            saved: false,
            isSubmitDisabled: false,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});
        const data = {};

        data.topicName = this.state.topicName;
        data.question = this.state.question;

        const self = this;
        axios.post(Globals.serviceUrl + 'topic/save', data)
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"saved": true});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const self = this;
        const {errors} = self.state;
        const {saved} = self.state;

        return (
            <div className={"col-6 offset-3"}>

                <br/>
                <h3>Create a new Topic!</h3>
                <hr/>
                {!errors && saved && (
                    <div className={"col-12"}>
                        <h6>Success!</h6>
                        <span>New record has beed saved</span><br/>
                    </div>

                )}

                <form onSubmit={this.onSubmit} hidden={saved}>

                    <div className="form-group">
                        <input
                            type="text"
                            className={"form-control form-control-lg"}
                            placeholder="Topic Name"
                            name="topicName"
                            value={self.state.topicName}
                            onChange={self.onChange}
                        />
                        {errors.topicName && (
                            <div className="error-message">
                                {errors.topicName}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                             <textarea
                                 className={"form-control form-control-lg breakLine"}
                                 placeholder="Question for the topic"
                                 name="question"
                                 value={self.state.question}
                                 onChange={self.onChange}
                             />
                        {errors.question && (
                            <div className="error-message">
                                {errors.question}
                            </div>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Save Topic"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form>

            </div>
        )
    }
}

export default TopicForm;