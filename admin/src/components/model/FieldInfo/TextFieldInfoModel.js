import {FieldInfoModel} from "./FieldInfoModel";

export class TextFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'text';
    }
    mask = '';
    minimumCharacter = 0;
    maximumCharacter = 10;
    mask = '';
    parse=(obj)=>{
        this.mask = obj.mask;
        this.minimumCharacter = obj.minimumCharacter;
        this.maximumCharacter = obj.maximumCharacter;
        return this;
    }
}