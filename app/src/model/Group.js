import {Question} from "./Question";
import {GroupData} from "./GroupData";
import {GroupInfo} from "./GroupInfo";
import {GroupValue} from "./GroupValue";

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

    init() {
        this.groupValues = [];
        this.groupValues.push(new GroupValue(this))
    }

    deserialize(input, parent) {
        this.inputString = input;
        this.parentMenu = parent;
        if (!input) return this;
        this.title = input.title;
        this.type = input.type;
        this.uid = input.uid;
        this.groupInfo = new GroupInfo().deserialize(input.groupInfo);
        input.questions.forEach((value) => {
            this.questions.push(new Question().deserialize(value, this));
        });
        this.groupValues.push(new GroupValue(this));
        this.groupValues.push(new GroupValue(this));
        this.groupValues.push(new GroupValue(this));
        return this;
    }

    newGroupValue() {
        let _newGroupValue = new GroupValue(this);
        this.groupValues.push(_newGroupValue);
        return _newGroupValue;
    }

    getData() {
        var res = new GroupData();
        res.menuuid = this.parentMenu.uid;
        res.uid = this.uid;
        res.title = this.title;
        this.questions.forEach(function (q, index) {
            res.questionsData.push(q.getData());
        });

        return res;
    }

    loadData(GData) {

    }
}
