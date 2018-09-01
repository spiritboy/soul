import {Group} from "./Group";

export class Menu{
    title;
    groups = [];
    search;
    uid;
    fkId = 0;

    deserialize(input) {
        if (!input) return this;
        this.uid = input.uid;
        this.title = input.title;
        this.uid = input.uid;
        input.groups.forEach((value) => {
            this.groups.push(new Group().deserialize(value,this));
        });
        this.search = new Group().deserialize(input.search,this);
        this.search.isSearch = true;


        window.menu = this;
        return this;
    }

    loadData(GData){

    }
    init(){
        this.fkId = 0;
        this.groups.forEach((v,i)=>{v.init();})
    }
    findQV(guid, quid){
        for(let g of this.groups)
        {
            if(g.uid === guid) {
                for (let qv of g.groupValue.questionValues) {
                    if (qv.question.uid === quid) {
                        return qv;
                    }
                }
            }
        }
        return null;
    }
}
