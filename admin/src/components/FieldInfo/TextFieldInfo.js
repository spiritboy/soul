import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextFieldInfoModel} from "../model/FieldInfo/TextFieldInfoModel";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});


class TextFieldInfo extends React.Component {
    model = null;//new TextFieldInfoModel();
    state = {model: this.model};

    componentDidMount() {
        this.model = this.props.model;
        this.setState({model: this.model});
    }

    componentWillReceiveProps(nextProps) {
        this.model = nextProps.model;
        this.setState({model: this.model});
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.state.model != null ?

                    <div>
                        <TextField
                            id="fa-mask"
                            label="mask"
                            value={this.state.model.mask}
                            onChange={(e) => {
                                this.state.model.mask = e.target.value;
                                this.forceUpdate();
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="fa-mask"
                            label="mask"
                            value={this.state.model.minimumCharacter}
                            onChange={(e) => {
                                this.state.model.minimumCharacter = e.target.value;
                                this.forceUpdate();
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="fa-mask"
                            label="mask"
                            value={this.state.model.maximumCharacter}
                            onChange={(e) => {
                                this.state.model.maximumCharacter = e.target.value;
                                this.forceUpdate();
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </div> :
                    <div></div>}
            </div>)
    }
}

export default withStyles(styles)(TextFieldInfo);