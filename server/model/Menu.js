var Group = require("./Group");

function Menu() {
    this.title = '';
    this.groups = [];
    this.search = '';
    this.uid = '';
    this.fkId = 0;
}
Menu.prototype.deserialize = function (input) {
    if (!input) return this;
    this.uid = input.uid;
    this.title = input.title;
    this.uid = input.uid;
    input.groups.forEach((value) => {
        this.groups.push(new Group().deserialize(value, this));
    });
    this.search = new Group().deserialize(input.search, this);
    this.search.isSearch = true;


    return this;
};
Menu.prototype.questionsInSearch = function () {
    let questionsInSearch = [];
    for (g of this.groups) {
        for (q of g.questions) {
            if (q.inSearch === true) questionsInSearch.push(q);
        }
    }
    return questionsInSearch;
}
Menu.prototype.findQuestion = function(guid, quid)
{
    for (let g of this.groups) {
        if (g.uid === guid) {
            for (let q of g.questions) {
                if (q.uid === quid) {
                    return q;
                }
            }
        }
    }
    return null;
};
Menu.prototype.getProjection= function () {
    let projection = {"fkId": 1};
    this.questionsInSearch().forEach((q) => {
        projection[q.FQN()] = 1
    });
    return projection;
};
module.exports = Menu;