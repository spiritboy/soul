import {Question} from "./Question";
import {GroupData} from "./GroupData";
import {GroupInfo} from "./GroupInfo";
import {GroupValue} from "./GroupValue";

export class Group{
    parentMenu;
    title;
    type;
    uid;
    id;
    groupInfo;
    questions=[];
    isSearch=false;
    inputString;
    groupValue;
    init(){
        this.questions.forEach((v,i)=>{v.init();})
    }

    deserialize(input, parent) {
        this.inputString = input;
        this.parentMenu = parent;
        if(!input)return this;
        this.title = input.title;
        this.type = input.type;
        this.uid = input.uid;
        this.groupInfo = new GroupInfo().deserialize(input.groupInfo);
        input.questions.forEach((value) =>{
            this.questions.push(new Question().deserialize(value,this));
        });
        this.groupValue = new GroupValue(this);
        return this;
    }
    clone(){
        return new Group().deserialize(this.inputString);
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
    loadData(GData){

    }
}
