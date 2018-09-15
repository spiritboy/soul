import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {api} from "../services/api";

export class Index extends React.Component{
    state={
        menus:[]
    }
    componentWillMount(){
        api.Menus().then(d=>this.setState({menus:d}) )
    }
    render(){
        return( <Router>
            <ul>
                {
                    this.state.menus.map(mn=><li>{mn.title.fa}</li>)
                }

                {/*<Route exact path="/" component={Home}/>*/}
                {/*<Route path="/about" component={About}/>*/}
                {/*<Route path="/topics" component={Topics}/>*/}
            </ul>
        </Router>);
    }
}
export default Index;
