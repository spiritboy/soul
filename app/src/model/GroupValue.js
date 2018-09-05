import {Question} from "./Question";
import {GroupData} from "./GroupData";

export class GroupValue {
    group;
    questionValues = [];
    constructor(group) {
        this.group = group;
        this.group.questions.forEach((q) =>{
            this.questionValues.push(new QuestionValue(q));
        });
    }


}

export class QuestionValue {
    constructor(question) {
        this.question = question;
    }
    onValueChanged = [];
    question;
    _value;
    set value(newValue) {
        this._value = newValue;
        for (var i=0; i < this.onValueChanged.length; i++) {
            this.onValueChanged[i](newValue);
        }
    }

    get value() {
        return this._value;
    }
}