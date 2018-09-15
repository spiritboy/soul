import {Group} from "./Group";
import {GroupValue} from "./GroupValue";
import {Text} from "./Text";

export class Menu {
    title;
    groups = [];
    search;
    uid;
    fkId = 0;
    eventInited = [];
    eventDoUpdate = [];
    eventCleared = [];

    deserialize(input) {
        if (!input) return this;
        this.uid = input.uid;
        this.title = new Text().deserialize(input.title);
        this.uid = input.uid;
        input.groups.forEach((value) => {
            this.groups.push(new Group().deserialize(value, this));
        });
        this.search = new Group().deserialize(input.search, this);
        this.search.isSearch = true;


        window.menu = this;
        return this;
    }

    loadData(GData) {

    }

    init() {
        this.fkId = 0;
        this.groups.forEach((v, i) => {
            v.init();
        })
        this.raiseEventInited();
    }

    clear() {
        this.fkId = 0;
        this.groups.forEach((v, i) => {
            v.clear();
        })
        this.raiseEventCleared();
    }

    findGroup = (guid) => {
        for (let g of this.groups)
            if (g.uid === guid)
                return g;
    }

    findQV(guid, quid, row) {
        if (!row) row = 0;
        let g = this.findGroup(guid);
        while (g.groupValues.length <= row) {
            //add new groupValue
            g.addGroupValue(new GroupValue(g));
            this.raiseEventDoUpdate()
        }
        for (let qv of g.groupValues[row].questionValues) {
            if (qv.question.uid === quid) {
                return qv;
            }
        }
        return null;
    }

    raiseEventDoUpdate = () => {
        for (let handler of this.eventDoUpdate)
            handler();
    }
    raiseEventInited = () => {
        for (let handler of this.eventInited)
            handler();
    }
    raiseEventCleared = () => {
        for (let handler of this.eventCleared)
            handler();
    }
}
