
export class GroupInfo{
    type;
    display;
    deserialize(input) {
        if(!input)return this;
        this.type = input.type;
        this.display = input.display;
        return this;
    }
}