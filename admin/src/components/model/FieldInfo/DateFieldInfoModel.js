import {FieldInfoModel} from "./FieldInfoModel";

export class DateFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'date';
    }
    format = 'yyyy/mm/dd';
    parse=(obj)=>{
        this.format =obj.format!=null?obj.format:'';
        return this;
    }
}