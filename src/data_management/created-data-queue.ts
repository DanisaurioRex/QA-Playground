import { ICreatedData } from 'data_management';

export class CreatedDataStack {
    private static instance: CreatedDataStack;
    private queue: Array<{ name: string, data: ICreatedData }> = [];

    private constructor() {}

    public static getInstance() {
        if (!CreatedDataStack.instance) {
            CreatedDataStack.instance = new CreatedDataStack();
        }
        return CreatedDataStack.instance;
    }

    public push(name: string, data: ICreatedData): void {
        this.queue.push({name, data});
    }

    public pop(): { name: string, data: ICreatedData} {
        return this.queue.pop();
    }

    public hasElements(): boolean {
        return this.queue.length > 0;
    }

    public get(name: string): ICreatedData {
        return this.queue.find((data) => name === data.name).data;
    }
}
