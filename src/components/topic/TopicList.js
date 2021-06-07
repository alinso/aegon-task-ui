import React from "react";
import Globals from "../../Globals";
import { MDBDataTableV5 } from 'mdbreact';


const axios = require('axios');


class TopicList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topics : [],
        };

        this.loadTopics=this.loadTopics.bind(this);
        this.loadTopics();
    }
    loadTopics() {
        const self = this;
        axios.get(Globals.serviceUrl + 'topic/all/')
            .then(function (response) {
                self.setState({topics: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let datatable= {
            columns: [
                {
                    label: 'Name',
                    field: 'topicName',
                    width: 150,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'topicName',
                    },
                },
                {
                    label: 'question',
                    field: 'question',
                    width: 270,
                },
                {
                    label: 'NPMScore',
                    field: 'npmscore',
                    width: 200,
                }
            ],
            rows: this.state.topics
        };


        return (
            <div className={"col-6 offset-3"}>
                <br/>
                <h3>Topic List</h3>
                {this.state.topics &&(
                    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
                )}
            </div>
        )
    }
}

export default TopicList;