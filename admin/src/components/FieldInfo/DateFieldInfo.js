import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({ container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }});


class DateFieldInfo extends React.Component {
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
                        <TextField  className={classes.container}
                            label="Format"
                            value={this.state.model.format}
                            onChange={(e) => {
                                this.state.model.format = e.target.value;
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

export default withStyles(styles)(DateFieldInfo);