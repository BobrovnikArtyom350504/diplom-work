import { TSMap as Map } from "typescript-map";
import {LoopLog} from "./log";
let logMap = new Map<number, LoopLog[]>();

export class MainLoopLogger {
    static getLogs(id: number) {
        return logMap.get(id);
    }

    static addLog(id: number, string: string, stringNumber: number) {
        if(!logMap.has(id))
            logMap.set(id, []);
        logMap.get(id).push({stringNumber: stringNumber, string: string});
    }

    static clearLogs(id: number) {
        logMap.set(id, []);
    }
}