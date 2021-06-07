import React from "react";
import Globals from "../../Globals";

const axios = require('axios');


class FeedbackBase extends React.Component {
    constructor(props) {
        super(props);


        this.onSelectChange = this.onSelectChange.bind(this);
        this.loadTopics();
    }

    loadTopics() {
        const self = this;
        axios.get(Globals.serviceUrl + 'topic/all/')
            .then(function (response) {
                let result = self.setTopicsForSelect(response.data);
                self.setState({topics: result});
            })
            .catch(function (error) {
            });
    }

    setTopicsForSelect(data) {
        let topics = [];
        data.map(function (tpc) {
            topics.push({label: tpc.topicName, value: tpc.id, question: tpc.question});
        });
        return topics;
    }

    onSelectChange(e) {
        this.setState({selectedTopic: e});
    }
}

export default FeedbackBase;