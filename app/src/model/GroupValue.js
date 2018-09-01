import {Question} from "./Question";

export class GroupValue {
    constructor(group) {
        this.group = group;
        this.group.questions.forEach((q) =>{
            this.questionValues.push(new QuestionValue(q));
        });
    }

    group;
    questionValues = [];
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