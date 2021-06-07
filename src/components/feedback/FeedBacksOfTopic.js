import React from "react";
import Globals from "../../Globals";
import { MDBDataTableV5 } from 'mdbreact';
import Select from "react-select";
import FeedbackBase from "./FeedbackBase";


const axios = require('axios');


class FeedbackList extends FeedbackBase {
    constructor(props) {
        super(props);

        this.state = {
            feedbacks:[]
        };

        this.loadFeedbacks = this.loadFeedbacks.bind(this);
        this.setTopicsForSelect = this.setTopicsForSelect.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);

        this.loadTopics();
        this.loadFeedbacks();

    }

    onSelectChange(e) {
        this.setState({selectedTopic: e});
        this.loadFeedbacks(e.value);
    }

    loadFeedbacks(id) {
        const self = this;
        axios.get(Globals.serviceUrl + 'feedback/findByTopicId/'+id)
            .then(function (response) {
                self.setState({feedbacks: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let datatable= {
            columns: [
                {
                    label: 'Answer',
                    field: 'answer',
                    width: 350,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'topicName',
                    },
                },
                {
                    label: 'vote',
                    field: 'vote',
                    width: 50,
                }
            ],
            rows: this.state.feedbacks
        };


        return (
            <div className={"col-6 offset-3"}>
                <br/>

                        Feedback List!
                        <div className={"row"}>
                            <div className={"col-3"}>
                                <Select value={this.state.selectedTopic} options={this.state.topics}
                                        onChange={this.onSelectChange}/>
                            </div>


                            <div className={"col-9"}>
                                {(this.state.selectedTopic != null) && this.state.selectedTopic.question}
                            </div>
                        </div>

                {this.state.topics &&(
                    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
                )}
            </div>
        )
    }
}

export default FeedbackList;