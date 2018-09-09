function Question() {
    this.parentGroup = null;
    this.title = '';
    this.uid = '';
    this.groupUid = '';
    this.inSearch = false;
}

Question.prototype.FQN = function () {
    return this.parentGroup.parentMenu.uid.toString() + '.' + this.parentGroup.uid.toString() + '.' + this.uid.toString();
};
Question.prototype.deserialize = function (input, parent) {
    this.parentGroup = parent;
    if (!input) return this;
    this.title = input.title;
    this.uid = input.uid;
    this.groupUid = input.groupUid;
    this.inSearch = input.inSearch;
    // if (this.groupUid)
    //     this.uid = this.parentGroup.parentMenu.uid + '.' + this.groupUid + '.' + this.uid;
    return this;
};
module.exports = Question;