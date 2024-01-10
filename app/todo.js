export class Todo {
    constructor(id, title){
        this.id = id;
        this.title = title;
    }

    getName(){
        return `${this.id} ${this.title}`;
    }
}