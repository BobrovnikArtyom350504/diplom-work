import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class SimulatorComponent implements AfterViewInit, AfterViewChecked, OnInit {
  map: Map = appState.map;
  currentRobotIndex = 0;
  robots: Robot[] = [];
  @ViewChild('canvas') canvas: ViewChild;
  canvasContext: CanvasRenderingContext2D;
  scripts: string[] = appState.scripts;
  mapApi: MapApi;

  ngOnInit() {
    this.mapApi = new MapApi(this.map);
    this.scripts.forEach((script, id) => {
      this.robots.push(new Robot(this.mapApi));
      let variable =  new TSMap<string, any>();
      variable.set('robot' + (id + 1), this.robots[id]);
      MainLoop.addLoop(id + 1, script, variable);
    });
  }

  ngAfterViewInit() {
    let canvas = this.canvas.nativeElement;
    this.canvasContext = canvas.getContext('2d');
    this.map.setCanvasContext(this.canvasContext);
  }

  ngAfterViewChecked() {
    this.map.areaController.redraw();
    this.map.objects.forEach(object => object.view.render());
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
    this.currentRobotIndex = index;
  }
}
