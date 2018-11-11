import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InfoIcon from '@material-ui/icons/Info';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    inputControl: {
        direction: "ltr!important"
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 400,
        direction: "ltr!important"
    },
});


class AsyncSelectFieldInfo extends React.Component {
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
        const {classes} = this.props;

        return (
            <div>
                {this.state.model != null ?
                    <div className={classes.container}>
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

                        <FormControl className={classes.formControl} aria-describedby="component-helper-text">
                            <InputLabel  className={classes.inputControl} htmlFor="component-helper">Source as URL</InputLabel>
                            <Input className={classes.inputControl} id="component-helper"
                                   value={this.state.model.source.options.url}
                                   onChange={(e) => {
                                       this.state.model.source.options.url = e.target.value;
                                       this.state.model.source.options.script = '';
                                       this.forceUpdate();
                                   }}/>
                            <FormHelperText  className={classes.inputControl} id="component-helper-text">use {'{filter}'} as the wildcard to pass to the
                                url.</FormHelperText>
                        </FormControl>
                    </div> :
                    <div></div>}
            </div>)
    }
}

export default withStyles(styles)(AsyncSelectFieldInfo);