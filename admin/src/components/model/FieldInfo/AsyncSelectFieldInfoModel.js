import {FieldInfoModel} from "./FieldInfoModel";

export class AsyncSelectFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'asyncSelect';
    }
    mask = '';
    parse=(obj)=>{
        this.mask = obj.mask;
        return this;
    }
}