import {Component} from '@angular/core';
import appState from "../app-state/app-state";
import {Map} from "../map/map";
import {instruction} from "../simulator/instruction";
@Component({
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  map: Map = appState.map;
  scripts: string[]  = appState.scripts;
  currentRobotIndex = 0;
  instruction: string = instruction;

  setCurrentRobotIndex(index: number) {
    this.currentRobotIndex = index;
  }

  setCurrentRobotScript(script: string) {
    this.scripts[this.currentRobotIndex] = script;
  }
}
