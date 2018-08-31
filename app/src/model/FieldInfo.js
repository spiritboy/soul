import {Source} from "./Source";

export class FieldInfo{
    parentQuestion;
    type;
    source;
    isFree;
    isMultiSelect;
    clenderType;

    deserialize(input,parent) {
        this.parentQuestion = parent;
        if(!input)return this;
        this.type = input.type;
        this.isFree = input.isFree;
        this.source = new Source().deserialize(input.source, this);
        this.isMultiSelect = input.isMultiSelect;
        this.clenderType = input.clenderType;
        return this;
    }
}