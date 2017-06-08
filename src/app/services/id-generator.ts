export namespace Services {
    export class IdGenerator {
        protected id: number = 0;

        nextId(): number {
            return this.id++;
        }
    }
}
