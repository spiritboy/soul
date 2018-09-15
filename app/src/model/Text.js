export class Text {
    fa;
    en;
    deserialize(input) {
        if (!input) return this;
        this.fa = input.fa;
        this.en = input.en;
        return this;
    }
    get value() {
        return this.fa;
    }
}