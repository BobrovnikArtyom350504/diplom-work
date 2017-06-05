export namespace Services {
    export class IdGenerator {
        protected id: number = 1;

        nextId(): number {
            return this.id++;
        }
    }
}
