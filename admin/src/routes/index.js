import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {api} from "../services/api";
import "../components/Main";
import Main from "../components/Main";

export class Index extends React.Component {
    state = {
        menus: []
    }

    componentWillMount() {
        api.Menus().then(d => this.setState({menus: d}))
    }

    render() {
        return (<Router>
            <Main/>
        </Router>);
    }
}

export default Index;
