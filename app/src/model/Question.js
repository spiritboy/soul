import {Event} from "./Event";
import {FieldInfo} from "./FieldInfo";
import {QuestionData} from "./QuestionData";

export class Question {
    parentGroup;
    title;
    uid;
    groupUid;
    fieldInfo;
    events;
    _title;
    forceUpdate;
    set title(newValue) {
        this._title = newValue;
        if(this.forceUpdate != null)
            this.forceUpdate();
    }

    get title() {
        return this._title;
    }

    getData() {
        let qdata = new QuestionData();
        qdata.value = this.value;
        qdata.uid = this.uid;

        return qdata;
    }

    init() {
        this.value = "";
    }

    deserialize(input, parent) {
        this.parentGroup = parent;
        if (!input) return this;
        this.title = input.title;
        this.uid = input.uid;
        this.groupUid = input.groupUid;
        if (this.groupUid)
            this.uid = this.parentGroup.parentMenu.uid + '.' + this.groupUid + '.' + this.uid;
        this.fieldInfo = new FieldInfo().deserialize(input.fieldInfo, this);
        this.events = new Event().deserialize(input.events, this);
        return this;
    }
}
