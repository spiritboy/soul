import React from 'react';
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SaveIcon from "../../node_modules/@material-ui/icons/Save";
import CloseIcon from "../../node_modules/@material-ui/icons/Close";
import CheckIcon from "../../node_modules/@material-ui/icons/Check";
import EventIcon from "../../node_modules/@material-ui/icons/FlashOnOutlined";
import InfoIcon from "../../node_modules/@material-ui/icons/InfoOutlined";
import ExpandMoreIcon from "../../node_modules/@material-ui/icons/ExpandMore";
import VerifiedIcon from "../../node_modules/@material-ui/icons/VerifiedUserOutlined";
import {withStyles} from "@material-ui/core/styles";
import {EditQuestionModel} from "./model/EditQuestionModel";
import {helper} from "../lib/helper";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import BallotIcon from '@material-ui/icons/BallotOutlined';
import Switch from '@material-ui/core/Switch';
import TextFieldInfo from "./FieldInfo/TextFieldInfo";
import SelectFieldInfo from "./FieldInfo/SelectFieldInfo";
import DateFieldInfo from "./FieldInfo/DateFieldInfo";
import AsyncSelectFieldInfo from "./FieldInfo/AsyncSelectFieldInfo";

const styles = theme => ({
    container: {
        width: "100%"
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

const fieldTypes = [{value: 'text', label: 'متنی'}, {value: 'date', label: 'تاریخ'}
    , {value: 'asyncSelect', label: 'انتخابی-سمت سرور'}, {value: 'select', label: 'چند گزینه ای'}];

class EditQuestion extends React.Component {
    model = new EditQuestionModel();
    state = {
        model: this.model,
        isBusy: false,
        onExitingIsScript: true,
        onExitedIsScript: true,
        onEnteringIsScript: true,
        onEnteredIsScript: true,
        onValidationIsScript: true
    };

    componentDidMount() {
        this.setState({isBusy: true});
        this.model.load(this.props.muid, this.props.guid, this.props.quid, () => {
            this.afterLoad();
            this.forceUpdate();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isBusy: true});
        this.model.load(nextProps.muid, nextProps.guid, nextProps.quid, () => {
            this.afterLoad();
            this.forceUpdate();
        })
    }

    afterLoad = () => {
        this.setState({
            isBusy: false,
            onExitedIsScript: this.model.events == null || this.model.events.onExited == null || this.model.events.onExited.url == null || this.model.events.onExited.url === '',
            onExitingIsScript: this.model.events == null || this.model.events.onExiting == null || this.model.events.onExiting.url == null || this.model.events.onExiting.url === '',
            onEnteredIsScript: this.model.events == null || this.model.events.onEntered == null || this.model.events.onEntered.url == null || this.model.events.onEntered.url === '',
            onEnteringIsScript: this.model.events == null || this.model.events.onEntering == null || this.model.events.onEntering.url == null || this.model.events.onEntering.url === '',
            onValidationIsScript: this.model.validation == null || this.model.validation.url == null || this.model.validation.url === '',
        });
    };
    afterSwitch = () => {
        if (this.state.onExitedIsScript) this.model.events.onExited.url = '';
        else this.model.events.onExited.script = '';

        if (this.state.onExitingIsScript) this.model.events.onExiting.url = '';
        else this.model.events.onExiting.script = '';

        if (this.state.onEnteredIsScript) this.model.events.onEntered.url = '';
        else this.model.events.onEntered.script = '';

        if (this.state.onEnteringIsScript) this.model.events.onEntering.url = '';
        else this.model.events.onEntering.script = '';

        if (this.state.onValidationIsScript) this.model.validation.url = '';
        else this.model.validation.script = '';
    }
    handleCheck = name => e => {
        helper.setValue(this.model, name, e.target.checked);
        this.forceUpdate();
    };
    handleChange = name => e => {
        helper.setValue(this.model, name, e.target.value);
        if ('fieldInfo.type' === name) {
            this.model.setFieldInfo(e.target.value);
            console.log(e.target.value)
        }
        this.forceUpdate();
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    {/*<h1>ویرایش مشخصات گروه</h1>*/}
                    <form noValidate autoComplete="off">
                        <div className={classes.container}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <InfoIcon/>
                                    <span> اطلاعات اولیه </span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TextField
                                        id="outlined-uid"
                                        label="شناسه منو"
                                        className={classes.textField}
                                        value={this.state.model.uid}
                                        onChange={this.handleChange('uid')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-fa-title"
                                        label="عنوان فارسی"
                                        className={classes.textField}
                                        value={this.state.model.title.fa}
                                        onChange={this.handleChange('title.fa')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-en-title"
                                        label="عنوان انگلیسی"
                                        className={classes.textField}
                                        value={this.state.model.title.en}
                                        onChange={this.handleChange('title.en')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <FormControlLabel
                                        control={
                                            <CheckBox
                                                checked={this.state.model.inSearch}
                                                onChange={this.handleCheck('inSearch')}
                                                value="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="نمایش در جستجو"
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <BallotIcon/>
                                    <span> نوع داده </span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        <TextField select label={"نوع داده"}
                                                   margin="normal"
                                                   className={classes.textField}
                                                   value={this.state.model.fieldInfo.type}
                                                   onChange={this.handleChange('fieldInfo.type')}
                                                   variant="outlined"
                                                   style={{width: '200px'}}>
                                            {
                                                fieldTypes.map(op => <MenuItem key={op.value}
                                                                               value={op.value}> {op.label}</MenuItem>)
                                            }
                                        </TextField>
                                        {
                                            this.state.model.fieldInfo.type === 'text' ?
                                                <TextFieldInfo model={this.state.model.fieldInfo}/> :
                                                this.state.model.fieldInfo.type === 'select' ?
                                                    <SelectFieldInfo model={this.state.model.fieldInfo}/> :
                                                    this.state.model.fieldInfo.type === 'date' ?
                                                        <DateFieldInfo  model={this.state.model.fieldInfo}/> :
                                                        this.state.model.fieldInfo.type === 'asyncSelect' ?
                                                            <AsyncSelectFieldInfo model={this.state.model.fieldInfo}/> :
                                                            <div>other</div>

                                        }
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <EventIcon/>
                                    <span>خروج</span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{width: "100%"}}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <EventIcon/>
                                                <span>قبل از خروج</span>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div style={{width: "100%"}}>
                                                    <div>
                                                        <span>Script</span>
                                                        <Switch
                                                            checked={this.state.onExitingIsScript}
                                                            onChange={event => {
                                                                this.setState({"onExitingIsScript": event.target.checked})
                                                            }}
                                                        />
                                                        <span>URL</span>

                                                    </div>
                                                    <TextField
                                                        dir={'ltr'}
                                                        fullWidth={true}
                                                        multiline={this.state.onExitingIsScript}
                                                        label="قبل از ورود"
                                                        placeholder={this.state.onExitingIsScript === false ? "Url here ... (http://soul.com/)" : ""}
                                                        className={classes.textField}
                                                        value={this.state.onExitingIsScript === false ? this.state.model.events.onExiting.url : this.state.model.events.onExiting.script}
                                                        onChange={this.handleChange('events.onExiting.' + (this.state.onExitingIsScript === false ? 'url' : 'script'))}
                                                        margin="normal"
                                                        variant="outlined"
                                                        rowsMax={50}
                                                    />
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <EventIcon/>
                                                <span>پس از خروج</span>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div style={{width: "100%"}}>
                                                    <div>
                                                        <span>Script</span>
                                                        <Switch
                                                            checked={this.state.onExitedIsScript}
                                                            onChange={event => {
                                                                this.setState({"onExitedIsScript": event.target.checked})
                                                            }}
                                                        />
                                                        <span>URL</span>

                                                    </div>
                                                    <TextField
                                                        dir={'ltr'}
                                                        fullWidth={true}
                                                        multiline={this.state.onExitedIsScript}
                                                        label="پس از ورود"
                                                        placeholder={this.state.onExitedIsScript === false ? "Url here ... (http://soul.com/)" : ""}
                                                        className={classes.textField}
                                                        value={this.state.onExitedIsScript === false ? this.state.model.events.onExited.url : this.state.model.events.onExited.script}
                                                        onChange={this.handleChange('events.onExited.' + (this.state.onExitedIsScript === false ? 'url' : 'script'))}
                                                        margin="normal"
                                                        variant="outlined"
                                                        rowsMax={50}
                                                    />
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <EventIcon/>
                                    <span>ورود</span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{width: "100%"}}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <EventIcon/>
                                                <span>قبل از ورود</span>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div style={{width: "100%"}}>
                                                    <div>
                                                        <span>Script</span>
                                                        <Switch
                                                            checked={this.state.onEnteringIsScript}
                                                            onChange={event => {
                                                                this.setState({"onEnteringIsScript": event.target.checked})
                                                            }}
                                                        />
                                                        <span>URL</span>

                                                    </div>
                                                    <TextField
                                                        dir={'ltr'}
                                                        fullWidth={true}
                                                        multiline={this.state.onEnteringIsScript}
                                                        label="قبل از ورود"
                                                        placeholder={this.state.onEnteringIsScript === false ? "Url here ... (http://soul.com/)" : ""}
                                                        className={classes.textField}
                                                        value={this.state.onEnteringIsScript === false ? this.state.model.events.onEntering.url : this.state.model.events.onEntering.script}
                                                        onChange={this.handleChange('events.onEntering.' + (this.state.onEnteringIsScript === false ? 'url' : 'script'))}
                                                        margin="normal"
                                                        variant="outlined"
                                                        rowsMax={50}
                                                    />
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <EventIcon/>
                                                <span>پس از ورود</span>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div style={{width: "100%"}}>
                                                    <div>
                                                        <span>Script</span>
                                                        <Switch
                                                            checked={this.state.onEnteredIsScript}
                                                            onChange={event => {
                                                                this.setState({"onEnteredIsScript": event.target.checked})
                                                            }}
                                                        />
                                                        <span>URL</span>

                                                    </div>
                                                    <TextField
                                                        dir={'ltr'}
                                                        fullWidth={true}
                                                        multiline={this.state.onEnteredIsScript}
                                                        label="پس از ورود"
                                                        placeholder={this.state.onEnteredIsScript === false ? "Url here ... (http://soul.com/)" : ""}
                                                        className={classes.textField}
                                                        value={this.state.onEnteredIsScript === false ? this.state.model.events.onEntered.url : this.state.model.events.onEntered.script}
                                                        onChange={this.handleChange('events.onEntered.' + (this.state.onEnteredIsScript === false ? 'url' : 'script'))}
                                                        margin="normal"
                                                        variant="outlined"
                                                        rowsMax={50}
                                                    />
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <VerifiedIcon/>
                                    <span>اعتبارسنجی</span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{width: "100%"}}>
                                        <div>
                                            <span>Script</span>
                                            <Switch
                                                checked={this.state.onValidationIsScript}
                                                onChange={event => {
                                                    this.setState({"onValidationIsScript": event.target.checked})
                                                }}
                                            />
                                            <span>URL</span>

                                        </div>
                                        <TextField
                                            dir={'ltr'}
                                            fullWidth={true}
                                            multiline={this.state.onValidationIsScript}
                                            label="پس از ورود"
                                            placeholder={this.state.onValidationIsScript === false ? "Url here ... (http://soul.com/)" : ""}
                                            className={classes.textField}
                                            value={this.state.onValidationIsScript === false ? this.state.model.validation.url : this.state.model.validation.script}
                                            onChange={this.handleChange('events.validation.' + (this.state.onValidationIsScript === false ? 'url' : 'script'))}
                                            margin="normal"
                                            variant="outlined"
                                            rowsMax={50}
                                        />
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <div>
                            <Button variant="contained" size="small" className={classes.button} onClick={() => {
                                this.setState({isBusy: true});
                                this.afterSwitch();
                                this.model.save(() => {
                                    this.setState({isBusy: false});
                                })
                            }}>
                                <SaveIcon className={classes.leftIcon}/>
                                ذخیره
                            </Button>
                            <Button variant="contained" size="small" className={classes.button}>
                                <CloseIcon className={classes.leftIcon}/>
                                بستن
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={'busyIndicator'} style={{
                    display: (this.state.isBusy ? "block" : "none")
                }}></div>
            </div>
        )
    }
}

export default withStyles(styles)(EditQuestion);