import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextFieldInfoModel} from "../model/FieldInfo/TextFieldInfoModel";
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({ container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }});


class SelectFieldInfo extends React.Component {
    model = null;
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
        const { classes } = this.props;

        return (
            <div>
                {this.state.model != null ?
                    <form className={classes.container}>
                        <FormControlLabel
                            control={
                                <CheckBox
                                    checked={this.state.model.isMultiSelect}
                                    onChange={(e) => {
                                        this.state.model.isMultiSelect = e.target.checked;
                                        this.forceUpdate();
                                    }}
                                    color="primary"
                                />
                            }
                            label="چند انتخابی"
                        />
                        <TextField  className={classes.container}
                            label="Source as URL1"
                            value={this.state.model.source.options.url}
                            onChange={(e) => {
                                this.state.model.source.options.url = e.target.value;
                                this.state.model.source.options.script = '';
                                this.forceUpdate();
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField  className={classes.container}
                            label="Source as Script"
                            value={this.state.model.source.options.script}
                            onChange={(e) => {
                                this.state.model.source.options.script = e.target.value;
                                this.state.model.source.options.url = '';
                                this.forceUpdate();
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </form> :
                    <div></div>}
            </div>)
    }
}

export default withStyles(styles)(SelectFieldInfo);