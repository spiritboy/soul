import {Question} from "./Question";
import {GroupInfo} from "./GroupInfo";
import {GroupValue} from "./GroupValue";
import {api} from "../services/api";
import {Text} from "./Text";

export class Group {
    parentMenu;
    title;
    type;
    uid;
    id;
    groupInfo;
    questions = [];
    isSearch = false;
    inputString;
    groupValues = [];
    eventIsDirtyChanged = [];
    eventSaving = [];
    eventSaved = [];
    eventLoading = [];

    //will remove and recreate everything
    init() {
        //first remove event handlers frm their memory
        for (let gv of this.groupValues) {
            gv.destructor();
        }
        this.groupValues = [];
        if (this.groupInfo.type === 'form') {
            var gv = new GroupValue(this);
            gv.eventIsDirtyChanged.push(this.raiseEventIsDirtyChanged);
            this.groupValues.push(gv);
        }
        this.raiseEventIsDirtyChanged()
    }

    //will clear the values, and preserve the metadata
    clear() {
        //first remove event handlers frm their memory
        if (this.groupInfo.type === 'table') {
            for (let gv of this.groupValues) {
                gv.destructor();
            }
            this.groupValues = [];
        }
        else {
            //form
            this.groupValues[0].clear();
        }
        this.raiseEventIsDirtyChanged()
    }

    deserialize(input, parent) {
        this.inputString = input;
        this.parentMenu = parent;
        if (!input) return this;
        this.title = new Text().deserialize(input.title);
        this.type = input.type;
        this.uid = input.uid;
        this.groupInfo = new GroupInfo().deserialize(input.groupInfo);
        input.questions.forEach((value) => {
            this.questions.push(new Question().deserialize(value, this));
        });
        this.init();
        return this;
    }

    deleteGroupValue(groupValue) {
        let indEvent = groupValue.eventIsDirtyChanged.indexOf(this.eventIsDirtyChanged);
        if (indEvent > -1) {
            groupValue.eventIsDirtyChanged.splice(indEvent, 1);
        }
        let ind = this.groupValues.indexOf(groupValue);
        if (ind >= 0) {
            this.groupValues.splice(ind, 1);
            this.raiseEventIsDirtyChanged();
        }
    }

    addGroupValue(newGroupValue) {
        if (this.groupValues.indexOf(newGroupValue) < 0) {
            newGroupValue.eventIsDirtyChanged.push(this.raiseEventIsDirtyChanged);
            this.groupValues.push(newGroupValue);
            this.raiseEventIsDirtyChanged();
        }
    }

    normalizeData() {
        let arr = [];
        for (let g of this.groupValues) {
            var obj = {};
            for (let q of g.questionValues) {
                if (q.value != null)
                    obj[q.question.uid] = q.value;
                else if (this.isSearch)
                    obj[q.question.uid] = "";
            }
            arr.push(obj);
        }

        arr = this.groupInfo.type === 'table' ? arr : arr[0];
        return {
            data: arr,
            fkId: this.parentMenu.fkId,
            groupUid: this.uid,
            menuUid: this.parentMenu.uid
        }

    }

    save = (callback) => {
        if (this.raiseEventSaving() === true) {
            this.raiseEventLoading(true);
            api.saveGroup(this, () => {
                if (callback != null) callback(true);
                this.raiseEventSaved();
                this.raiseEventLoading(false)
            })
        }
    }
    commitValue = () => {
        for (let gv of this.groupValues)
            gv.commitValue();
    };

    isDirty() {
        for (let gv of this.groupValues)
            if (gv.isDirty())
                return true;
        return false;
    }

    raiseEventIsDirtyChanged = (isDirty) => {
        for (let handler of this.eventIsDirtyChanged)
            handler(this.isDirty());
    };
    raiseEventSaving = () => {
        let saving = true;
        for (let handler of this.eventSaving) {
            let ret = handler();
            if (ret != null && ret == false)
                saving = false;
        }
        return saving;
    };
    raiseEventSaved = () => {
        for (let handler of this.eventSaved)
            handler();
    };
    raiseEventLoading = (isLoading) => {
        for (let handler of this.eventLoading)
            handler(isLoading);
    };
    destructor = () => {
        this.eventIsDirtyChanged = [];
        for (let gv of this.groupValues) {
            gv.destructor();
        }
    }
}
