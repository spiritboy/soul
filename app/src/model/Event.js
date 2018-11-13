import {cmd} from "./cmd";

export class Event {
    parentQuestion;
    onExited;
    onEntered;
    onExiting;
    onEntering;
    onValidate;

    deserialize(input, parent ) {
        if(!input)return this;
        this.onExited = new cmd().deserialize(input.onExited,parent);
        this.onEntered = new cmd().deserialize(input.onEntered,parent);
        this.onExiting = new cmd().deserialize(input.onExiting,parent);
        this.onEntering = new cmd().deserialize(input.onEntering,parent);
        this.onValidate = null;// new cmd().deserialize(input.onValidate,parent);
        this.parentQuestion = parent;
        return this;
    }
}