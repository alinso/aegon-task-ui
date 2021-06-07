import React from "react";
import Globals from "../../Globals";
import Select from "react-select";

const axios = require('axios');


class FeedbackForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            selectedTopic: {id: 0, label: "Select a Topic", message: ""},

        };

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

export default FeedbackForm;