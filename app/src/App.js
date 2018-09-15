import React, {Component} from 'react';
import './App.css';
import {api} from "./services/api";
import {MenuComponent} from "./components/Menu/MenuComponent";

class App extends Component {
    state = {
        menu: null
    }

    constructor(props) {
        super(props);
        api.getDefinition(1).then(menu => {
            console.log(menu)
            this.setState({menu});
        });
    }

    render() {
        return (
            (this.state.menu != null) ?
                <div className="App">
                    <MenuComponent menu={this.state.menu}/>
                </div>
                : <div></div>
        );
    }
}

export default App;
