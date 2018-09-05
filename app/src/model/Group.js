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
        if (this.groupInfo.type === 'form')
            this.groupValues.push(new GroupValue(this));
        return this;
    }

    deleteGroupValue(groupValue) {
        let ind = this.groupValues.indexOf(groupValue);
        if (ind >= 0) {
            this.groupValues.splice(ind, 1);
        }
    }

    addGroupValue(newGroupValue) {
        if (this.groupValues.indexOf(newGroupValue) < 0)
            this.groupValues.push(newGroupValue);
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
        return{
            data: arr,
            fkId: this.parentMenu.fkId,
            groupUid: this.uid,
            menuUid: this.parentMenu.uid
        }

    }

    loadData(GData) {

    }
}
