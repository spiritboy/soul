import {Question} from "./Question";
import {GroupData} from "./GroupData";

export class Group{
    parentMenu;
    title;
    type;
    uid;
    id;
    questions=[];
    isSearch=false;

    init(){
        this.questions.forEach((v,i)=>{v.init();})
    }

    deserialize(input, parent) {
        this.parentMenu = parent;
        if(!input)return this;
        this.title = input.title;
        this.type = input.type;
        this.uid = input.uid;
        input.questions.forEach((value) =>{
            this.questions.push(new Question().deserialize(value,this));
        });
        return this;
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
