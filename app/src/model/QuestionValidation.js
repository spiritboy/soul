import {api} from "../services/api";

export class QuestionValidation{
    question;
    url;
    script;
    getMenu = () => {
        return this.question.parentGroup.parentMenu;
    }


    findQuestion(guid, quid, row) {
        return this.getMenu().findQV(guid, quid, row);
    }
    validate = () => {
        if((this.url == null || this.url === '') && (this.script == null || this.script === '')) {
            return true;
        }
        let text = '';
        if (this.url != null&& this.url!=='') text = this.url;
        else if (this.script != null&& this.script!=='') text = this.script;

        if (this.url != null && this.url!=='') {
            //async
            let out = api.get(text, null, false);
            return out;
        }
        else if (this.script != null&& this.script!=='') {
            let out = eval(text);
            return out;
        }
    };
    deserialize(input, question ) {
        if (!input) return null;
        this.question = question;
        this.url = input.url;
        this.script = input.script;
        return this;
    }
}