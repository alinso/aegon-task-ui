import React from "react";
import Globals from "../../Globals";
import Select from "react-select";
import FeedbackBase from "./FeedbackBase";

const axios = require('axios');


class FeedbackForm extends FeedbackBase {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            selectedTopic: {value: 0, label: "Select a Topic", message: ""},
            vote: -1,
            answer: '',
            saved: false,
            isSubmitDisabled: false,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.stars = this.stars.bind(this);
        this.resetValues = this.resetValues.bind(this);

        this.loadTopics();
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});
        const data = {};

        data.answer = this.state.answer;
        data.vote = this.state.vote;
        console.log(this.state);

        data.selectedTopicId = this.state.selectedTopic.value;
        const self = this;
        axios.post(Globals.serviceUrl + 'feedback/save', data)
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"saved": true});
                self.resetValues();
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }

    resetValues() {

        this.setState({selectedTopic: {id: 0, label: "Select a Topic", message: ""}});
        this.setState({errors: {}})
        this.setState({isSubmitDisabled: false});
        this.setState({vote: -1});
    }


    stars() {
        let stars = [];
        console.log(this.state.vote);
        for (let i = 10; i >= 0; i--) {
            let colorStyle = "";
            if (i == this.state.vote) {
                colorStyle = "selectedStar";
            }
            stars.push(<div key={i} className={colorStyle}>
                <input className={"star star-" + i} id={"star-" + i} value={i} type="radio" name="vote"
                       onChange={this.onChange}/>
                <label className={"star star-" + i} htmlFor={"star-" + i}><i className="fas fa-star"/><br/>{i}</label>
            </div>);
        }
        return stars;
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
                <h3>Topic feedback form!</h3>
                <hr/>
                {saved && (
                    <div className={"col-12"}>
                        <h6>Success!</h6>
                        <span>Your answer has been saved</span><br/>
                    </div>

                )}

                <br/>
                <form onSubmit={this.onSubmit} hidden={saved}>

                    <div className={"row"}>
                        <div className={"col-3"}>
                            <Select value={this.state.selectedTopic} options={this.state.topics}
                                    onChange={this.onSelectChange}/>
                        </div>
                        <div className={"col-9"}>
                            <h4>{(this.state.selectedTopic != null) && this.state.selectedTopic.question}</h4>
                            {errors.id && (
                                <div className="error-message">
                                    {errors.id}
                                </div>
                            )}
                        </div>

                    </div>
                    <br/>

                    <div className="form-group">
                        <input
                            type="text"
                            className={"form-control form-control-lg"}
                            placeholder="Your Answer"
                            name="answer"
                            value={self.state.answer}
                            onChange={self.onChange}
                        />
                        {errors.answer && (
                            <div className="error-message">
                                {errors.answer}
                            </div>
                        )}
                    </div>

                    <div className="container d-flex justify-content-center mt-200">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="stars">
                                    {this.stars()}

                                </div>
                            </div>
                            {errors.vote && (
                                <div className="error-message">
                                    {errors.vote}
                                </div>
                            )}
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Save Feedback"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form>

            </div>
        )
    }
}

export default FeedbackForm;