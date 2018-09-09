var Question = require("./Question");

function Group() {
    this.parentMenu = null;
    this.title = null;
    this.type = null;
    this.uid = null;
    this.id = null;
    this.questions = [];
    this.isSearch = false;
    this.inputString = null;
}

Group.prototype.deserialize = function (input, parent) {
    this.inputString = input;
    this.parentMenu = parent;
    if (!input) return this;
    this.title = input.title;
    this.type = input.type;
    this.uid = input.uid;
    input.questions.forEach((value) => {
        this.questions.push(new Question().deserialize(value, this));
    });
    return this;
};
module.exports = Group;