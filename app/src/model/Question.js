import {Event} from "./Event";
import {FieldInfo} from "./FieldInfo";
import {QuestionValidation} from "./QuestionValidation";

export class Question {
    parentGroup;
    title;
    uid;
    groupUid;
    fieldInfo;
    events;
    _title;
    forceUpdate;
    validation;
    set title(newValue) {
        this._title = newValue;
        if(this.forceUpdate != null)
            this.forceUpdate();
    }

    get title() {
        return this._title;
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
        this.validation = new QuestionValidation().deserialize(input.validation, this);
        return this;
    }
}
