import {api} from "../../services/api";

export class EditQuestionModel {
    uid = '';
    guid = '';
    muid = '';
    title = {en: '', fa: ''};
    inSearch = '';
    fieldInfo = {type: ''}
    load = (muid, guid, quid, callback) => {
        this.muid = muid;
        this.guid = guid;
        this.uid = quid;
        api.question(muid, guid, quid, (d) => {
            console.log(d);
            this.title = d.title;
            this.inSearch = d.inSearch;
            this.fieldInfo = d.fieldInfo;
            if (callback != null)
                callback(d);
        });
    };
    save = () => {
        api.saveQuestion(this, (d) => {
            console.log(d);
        })
    }
}