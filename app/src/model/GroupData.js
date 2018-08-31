export class GroupData {
    uid;
    menuuid;
    title;
    questionsData= [];
    fkId = 0;



    normalizeData(isSearch) {
        var obj = {};
        for (let q in this.questionsData) {
            if (this.questionsData[q].value!=null)
                obj[this.questionsData[q].uid] = this.questionsData[q].value;
            else if(isSearch)
                obj[this.questionsData[q].uid] = "";
        }

        return obj;
    }

}
