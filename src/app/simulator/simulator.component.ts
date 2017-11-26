import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import appState from "../app-state/app-state";
import {Map} from "../map/map";
import {Robot} from "../robot/robot";
import {MainLoop} from "../code-interpreter/main-loop";
import { TSMap } from "typescript-map";
import {MapApi} from "../map/map-api";

@Component({
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements AfterViewChecked, OnInit {
  map: Map = appState.map;
  currentRobotIndex = 0;
  robots: Robot[] = [];
  @ViewChild('canvas') canvas: any;
  canvasContext: CanvasRenderingContext2D;
  scripts: string[] = appState.scripts;
  mapApi: MapApi;
  currentScriptRows: string[] = [];
  currentRow: number = 0;
  breakpoints: number[] = [];


  ngOnInit() {
    if(this.scripts.length)
      this.setCurrentScriptRows();
    this.mapApi = new MapApi(this.map);
    this.scripts.forEach((script, id) => {
      this.robots.push(new Robot(this.mapApi));
      let variable =  new TSMap<string, any>();
      variable.set('robot', this.robots[id]);
      MainLoop.addLoop(id, script, variable);
      MainLoop.setOnStepCallback(id, ()=>{});
    });
    MainLoop.setOnStepCallback(0, this.onRowChange);
  }

  onRowChange(rowNumber: number) {

    this.currentRow = rowNumber;
    let currentRow = document.querySelector('.row.current');
    if(currentRow) currentRow.classList.remove('current');
    let newRow = document.querySelector(`.row:nth-of-type(${this.currentRow + 1})`);
    if (newRow) newRow.classList.add('current');
  }

  setSpeed(speed: number) {
    MainLoop.setSpeed(+speed);
  }

  toggleBreackPoint(row: any) {
    if (this.breakpoints.indexOf(row) >= 0) {
      this.breakpoints.splice(this.breakpoints.indexOf(row), 1);
      MainLoop.removeBreackpoint(this.currentRobotIndex, row);
    }
    else {
      MainLoop.addBreackpoint(this.currentRobotIndex, row);
      this.breakpoints.push(row);
    }
  }

  ngAfterViewChecked() {
    let canvas = this.canvas.nativeElement;
    this.canvasContext = canvas.getContext('2d');
    this.map.setCanvasContext(this.canvasContext);
    this.map.areaController.redraw();
    this.map.objects.forEach(object => object.view.render());
  }

  setCurrentScriptRows() {
    this.currentScriptRows = this.scripts[this.currentRobotIndex].split(/\r\n|\r|\n/);
  }

  setCurrentRobotBreakpoints() {
    this.breakpoints = MainLoop.getBreackpoints(this.currentRobotIndex);
  }

  run() {
    MainLoop.run();
  }

  stop() {
    MainLoop.stop();
  }

  doStep() {
    MainLoop.doStep();
  }

  setCurrentRobotIndex(index: number) {
    MainLoop.removeStepCallback(this.currentRobotIndex);
    this.currentRobotIndex = index;
    this.currentRow = MainLoop.getCurrentRow(this.currentRobotIndex);
    let currentRow = document.querySelector('.row.current');
    if(currentRow) currentRow.classList.remove('current');
    let newRow = document.querySelector(`.row:nth-of-type(${this.currentRow + 1})`);
    if (newRow) newRow.classList.add('current');
    MainLoop.setOnStepCallback(this.currentRobotIndex, this.onRowChange);
    this.setCurrentScriptRows();
    this.setCurrentRobotBreakpoints();
  }
}
