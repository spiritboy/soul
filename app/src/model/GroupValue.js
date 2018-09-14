export class GroupValue {
    group;
    questionValues = [];
    eventIsDirtyChanged = [];

    constructor(group) {
        this.group = group;
        this.group.questions.forEach((q) => {
            let qv = new QuestionValue(q);
            qv.eventIsDirtyChanged.push(this.raiseEventIsDirtyChanged);
            this.questionValues.push(qv);
        });
    }

    clear = () => {
        for(let qv of this.questionValues)
            qv.clear();
    }
    destructor = () => {
        this.eventIsDirtyChanged = [];
        for (let qv of this.questionValues) {
            qv.destructor();
        }
    }
    commitValue = () => {
        for (let qv of this.questionValues)
            qv.commitValue();
    };

    isDirty() {
        for (let qv of this.questionValues) {
            if (qv.isDirty())
                return true;
        }
        return false;

    }

    raiseEventIsDirtyChanged = (isDirty) => {
        for (let handler of this.eventIsDirtyChanged)
            handler(this.isDirty());
    }
}

export class QuestionValue {
    constructor(question) {
        this.question = question;
    }

    _committedValue = '';
    eventOnValueChanged = [];
    question;
    _value = '';
    eventIsDirtyChanged = [];
    settingCommittedValue = false;

    set value(newValue) {
        let isDirty1 = this.isDirty();
        this._value = newValue;
        if (this.settingCommittedValue === true)
            this._committedValue = newValue;
        this.raiseEventOnValueChanged(newValue);
        let isDirty2 = this.isDirty();
        if (isDirty1 !== isDirty2)
            this.raiseEventIsDirtyChanged();
    }
    clear = () => {
        this.value = '';
    }
    get value() {
        return this._value;
    }

    beginSetCommittedValue = () => {
        this.settingCommittedValue = true;
    }
    endSetCommittedValue = () => {
        this.settingCommittedValue = false;
    }

    commitValue = () => {
        this._committedValue = this.value;
        this.raiseEventIsDirtyChanged();
    };

    isDirty() {
        return this._committedValue !== this.value;
    }

    raiseEventIsDirtyChanged() {
        for (let handler of this.eventIsDirtyChanged)
            handler(this.isDirty());
    }

    raiseEventOnValueChanged = (newValue) => {
        for (var i = 0; i < this.eventOnValueChanged.length; i++) {
            this.eventOnValueChanged[i](newValue);
        }
    }
    destructor = () => {
        this.eventIsDirtyChanged = [];
    }
}