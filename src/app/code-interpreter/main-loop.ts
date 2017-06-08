import { TSMap as Map } from "typescript-map";
import {CodeInterpreter} from "./code-interpreter";

let loops = new Map<number, CodeInterpreter>();
export class MainLoop {
    static addLoop(id: number, script?: string, availableVariables?: Map<string, any>, callback?: any) {
        if(!loops.has(id)) {
            let loop: any;
            if (callback)
                loop = new CodeInterpreter(id, script, ()=>{loop.rerun(); callback();}, availableVariables);
            else
                loop = new CodeInterpreter(id, script, ()=>{loop.rerun();}, availableVariables);
            loop.setBreackPointCallback(()=>{
                loops.forEach((loop) => {
                    loop.stop();
                });
            });
            loops.set(id, loop);
        }
    }

    static setOnStepCallback(id: number, callback: any) {
      loops.get(id).setOnStepExecuted(callback);
    }

    static getCurrentRow(id: number) {
      return loops.get(id).getCurrentRow();
    }

    static removeStepCallback(id: number) {
      loops.get(id).removeOnStepExecutedCallback();
    }

    static getBreackpoints(id: number) {
      return loops.get(id).getBreakpoints();
    }

    static setOnExecutedCallback(id: number, callback: any) {
        loops.get(id).setOnExecutedCallback(()=>{
            loops.get(id).rerun();
            callback();
        });
    }

    static setScript(id: number, script: string) {
        if(loops.has(id))
            loops.get(id).setScript(script);
    }

    static  addBreackpoint(id: number, number: number) {
        if(loops.has(id))
            loops.get(id).addBreackpoint(number);
    }

    static removeBreackpoint(id: number, number: number) {
        if(loops.has(id))
            loops.get(id).removeBreackpoint(number);
    }

    static stop() {
        loops.forEach((loop)=>{
            loop.stop();
        })
    }

    static run() {
        loops.forEach((loop)=>{
            loop.run();
        })
    }

    static doStep() {
        loops.forEach((loop)=>{
            loop.doStep();
        })
    }

    static setSpeed(speed: number) {
        loops.forEach((loop)=>{
            loop.setSpeed(speed);
        });
    }

    static addVariables(id: number, variables: Map<string, any>) {
        loops.get(id).addVariables(variables);
    }

}
