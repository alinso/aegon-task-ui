import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopicForm from "./components/topic/TopicForm";
import FeedbackForm from "./components/feedback/FeedbackForm";
import Menu from "./components/common/Menu";
import TopicList from "./components/topic/TopicList";
import FeedbackList from "./components/feedback/FeedBacksOfTopic";

class App extends Component {


  render() {

    return (
        <Router>
          <div className="App">
              <Menu/>
              {<Route exact path="/topic-form" component={TopicForm}/>}
              {<Route exact path="/feedback-form" component={FeedbackForm}/>}
              {<Route exact path="/topic-list" component={TopicList}/>}
              {<Route exact path="/feedback-list" component={FeedbackList}/>}
          </div>

        </Router>
    );
  }
}

export default App;