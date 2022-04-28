export class Todo {
    id: string | undefined = undefined;
    title: string | undefined = undefined;
    completed: boolean = false;

    constructor(id: string, title: string, completed: boolean = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    toObject(): any {
        return {
            id: this.id,
            title: this.title,
            completed: this.completed,
        }
    }
}