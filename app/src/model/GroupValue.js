export class GroupValue {
    group;
    questionValues = [];
    eventIsDirtyChanged = [];
    eventOnValidChanged = [];

    constructor(group) {
        this.group = group;
        this.group.questions.forEach((q) => {
            let qv = new QuestionValue(q);
            qv.eventIsDirtyChanged.push(this.raiseEventIsDirtyChanged);
            qv.eventOnValidChanged.push(this.raiseEventOnValidChanged);
            this.questionValues.push(qv);
        });
    }

    clear = () => {
        for (let qv of this.questionValues)
            qv.clear();
    };
    destructor = () => {
        this.eventIsDirtyChanged = [];
        this.eventOnValidChanged = [];
        for (let qv of this.questionValues) {
            qv.destructor();
        }
    };
    commitValue = () => {
        for (let qv of this.questionValues)
            qv.commitValue();
    };
    rollbackValue = () => {
        for (let qv of this.questionValues)
            qv.rollbackValue();
    };
    isDirty() {
        for (let qv of this.questionValues) {
            if (qv.isDirty())
                return true;
        }
        return false;
    }
    isValid() {
        for (let qv of this.questionValues) {
            if (qv.isValid === false)
                return false;
        }
        return true;
    }
    raiseEventIsDirtyChanged = (isDirty) => {
        for (let handler of this.eventIsDirtyChanged)
            handler(this.isDirty());
    }
    raiseEventOnValidChanged = () => {
        for (let handler of this.eventOnValidChanged)
            handler(this.isValid());
    }
}

export class QuestionValue {
    constructor(question) {
        this.question = question;
    }
    isValid = true;
    _committedValue = '';
    question;
    _value = '';
    eventIsDirtyChanged = [];
    eventOnValueChanged = [];
    eventOnValidChanged = [];
    settingCommittedValue = false;

    set value(newValue) {
        let isDirty1 = this.isDirty();
        this._value = newValue;
        this.checkValidation()
        if (this.settingCommittedValue === true)
            this._committedValue = newValue;
        this.raiseEventOnValueChanged(newValue);
        let isDirty2 = this.isDirty();
        if (isDirty1 !== isDirty2)
            this.raiseEventIsDirtyChanged();
    }
    checkValidation(){
        let valid = true;
        if(this.question.validation!=null)
            valid = this.question.validation.validate();
        if(valid!==this.isValid) {
            this.isValid = valid;
            this.raiseEventOnValidChanged()
        }
        return this.isValid;
    }
    clear = () => {
        this.value = '';
    };

    get value() {
        return this._value;
    }

    rollbackValue = () => {
        this.value = this._committedValue;
    };
    beginSetCommittedValue = () => {
        this.settingCommittedValue = true;
    };
    endSetCommittedValue = () => {
        this.settingCommittedValue = false;
    };

    commitValue = () => {
        this._committedValue = this.value;
        this.raiseEventIsDirtyChanged();
    };

    isDirty() {
        return this._committedValue !== this.value;
    }

    raiseEventOnValidChanged() {
        for (let handler of this.eventOnValidChanged)
            handler(this.isValid);
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
        this.eventOnValidChanged = [];
        this.eventOnValueChanged = [];
    }
}