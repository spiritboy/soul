import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.css';
import Index from './routes/index'
import RTL from './JssRtlProvider'
const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
class App extends Component {
    render() {
        return (
            <RTL>
                <MuiThemeProvider theme={theme}>
                    <Index/>
                </MuiThemeProvider>
            </RTL>
        );
    }
}


export default App;
