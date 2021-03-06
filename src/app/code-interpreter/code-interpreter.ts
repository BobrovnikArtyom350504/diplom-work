import { TSMap as Map } from "typescript-map";

export class CodeInterpreter {
    private processedScript: any;
    private stepCallback: any;
    private executionSpeed: number = 1000;
    private isStopped: boolean = true;
    private currentRow: number = 0;
    private breakpoints: number[] = [];
    private executedBreakpoints: number[] = [];
    private onBreakPointStop: any;
    private availableVariables: Map<string, any> = new Map<string, any>();


    constructor(
        private id: number,
        private script?: string,
        private onExecuteCallback?: any,
        availableVariables?: Map<string, any>
    ) {
        if(availableVariables)
            this.addVariables(availableVariables);
        if(script)
            this.processScript();
    }

    setOnStepExecuted(callback: any) {
      this.stepCallback = callback;
    }

    getCurrentRow() {
      return this.currentRow;
    }

    removeOnStepExecutedCallback() {
      this.stepCallback = () => {};
    }

    onStepExecute(stringNumber: number) {
      this.stepCallback(stringNumber);
    }

    addVariables(availableVariables: Map<string, any>) {
        availableVariables.forEach((value, varName)=>{
            this.availableVariables.set(varName, value);
        });
    }

    setScript(script: string) {
        this.script = script;
        this.stop();
        this.executedBreakpoints = [];
        this.processScript();
    }

    setBreackPointCallback(onBreakPointStop: any) {
        this.onBreakPointStop = onBreakPointStop;
    }

    addBreackpoint(number: number) {
        if(this.breakpoints.indexOf(number) === -1)
            this.breakpoints.push(number);
    }

    setOnExecutedCallback(callback: any) {
      this.onExecuteCallback = callback;
    };

    removeBreackpoint(number: number) {
        let index = this.breakpoints.indexOf(number);
        if(index >= 0)
            this.breakpoints.splice(index, 1);
    }

    stop() {
        this.isStopped = true;
    }

    run() {
        this.isStopped = false;
        this.doSteps();
    }

    rerun() {
        this.executedBreakpoints = [];
        this.processScript();
        this.currentRow = 0;
        this.onStepExecute(this.currentRow);
        this.run();
    }

    initScript() {
      this.executedBreakpoints = [];
      this.processScript();
      this.currentRow = 0;
      this.onStepExecute(this.currentRow);
    }

    getBreakpoints() {
      return this.breakpoints;
    }

    doStep() {
      this.isStopped = true;
        if(this.isStopped) {
            if(this.breakpoints.indexOf(this.currentRow) >= 0)
                this.executedBreakpoints.push(this.currentRow);
            let step = this.processedScript.next();
            if(step.done) {
              this.initScript();
            }
            else {
              this.currentRow++;
              this.onStepExecute(this.currentRow);
            }
        }
    }

    setSpeed(speed: number) {
        this.executionSpeed= speed;
    }

    private doSteps() {
        if (this.breakpoints.indexOf(this.currentRow) >= 0 &&
            this.executedBreakpoints.indexOf(this.currentRow) === -1) {
            this.onBreakPointStop();
            this.stop();
            this.executedBreakpoints.push(this.currentRow);
        }
        else
            setTimeout(()=>{
                if(!this.isStopped) {
                    let step = this.processedScript.next();
                    this.currentRow++;
                    this.onStepExecute(this.currentRow);
                    if(!step.done) this.doSteps();
                    else {
                        this.onExecuteCallback();
                    }
                }
            }, this.executionSpeed);
    }

    private processScript() {
        let lines = this.script.split(/\r\n|\r|\n/);
        let processedLine = lines.map((line)=>{
            return `${this.proccesString(line)} yield "${line}";`;
        });
        let processedScript = processedLine.join('\n');
        this.setGenerator(processedScript);
    }

    private proccesString(string: string): string {
        this.availableVariables.keys().forEach((varName)=>{
           string = string.split(varName).join(`this.availableVariables.get("${varName}")`);
        });
        return string;
    }

    private setGenerator(script: string) {
        let generatorString =  'function* (){ ' + script + ' }';
        let generatorFunction = new Function('return ' + generatorString)();
        let generator = generatorFunction.call(this);
        this.processedScript = generator;
    }
}
