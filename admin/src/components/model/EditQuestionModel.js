import {api} from "../../services/api";
import {FieldInfoModelFactory} from "./FieldInfo/FieldInfoModelFactory";

export class EditQuestionModel {
    uid = '';
    guid = '';
    muid = '';
    title = {en: '', fa: ''};
    inSearch = '';
    validation = {
        url: '',
        script: ''
    };
    events = {
        onExited: {
            url: '',
            script: ''
        },
        onEntered: {
            url: '',
            script: ''
        },
        onExiting: {
            url: '',
            script: ''
        },
        onEntering: {
            url: '',
            script: ''
        },
        onValidate: {
            url: '',
            script: ''
        },
    };
    fieldInfo = {type: ''};

    setFieldInfo(type) {
        this.fieldInfo = FieldInfoModelFactory.initFieldInfo(type);
    }

    clear = () => {
        this.uid = '';
        this.guid = '';
        this.muid = '';
        this.title = {en: '', fa: ''};
        this.inSearch = '';
        this.validation = {
            url: '',
            script: ''
        };
        this.events = {
            onExited: {
                url: '',
                script: ''
            },
            onEntered: {
                url: '',
                script: ''
            },
            onExiting: {
                url: '',
                script: ''
            },
            onEntering: {
                url: '',
                script: ''
            },
            onValidate: {
                url: '',
                script: ''
            },
        };
        this.fieldInfo = FieldInfoModelFactory.parseFieldInfo(null)
    }
    load = (muid, guid, quid, callback) => {
        this.clear();
        this.muid = muid;
        this.guid = guid;
        this.uid = quid;
        api.question(muid, guid, quid, (d) => {
            this.title = d.title;
            this.inSearch = d.inSearch;
            if (d.fieldInfo != null)
                this.fieldInfo = FieldInfoModelFactory.parseFieldInfo(d.fieldInfo);
            if (d.events != null)
                this.events = d.events;
            if (d.validation != null)
                this.validation = d.validation;
            if (callback != null)
                callback(d);
        });
    };
    save = (callback) => {
        api.saveQuestion(this, (d) => {
            if (callback != null)
                callback(d);
        })
    }
}