import { setWorldConstructor, setDefaultTimeout } from 'cucumber';
import { CreatedDataStack } from 'data_management';

export class GenericWorld {
    public attach;
    public dataStack: CreatedDataStack;

    constructor({attach}) {
        this.attach = attach;
        this.dataStack = CreatedDataStack.getInstance();
    }
}

setWorldConstructor(GenericWorld);
// // cucumber.js timeout for a step 2 min
setDefaultTimeout(12000000);
