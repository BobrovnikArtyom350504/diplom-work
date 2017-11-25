import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Map} from '../map/map';
import {Rock} from "../map/area/rock/rock";
import {MapObject} from "../map/map-object/map-object";
import appState from "../app-state/app-state";
import {Geolocation} from "../map/geolocation";
import MapData from '../map/map-data';
import {Robot} from "../robot/robot";

@Component({
  templateUrl: './map-constructor.component.html',
  styleUrls: ['./map-constructor.component.css']
})
export class MapConstructorComponent implements AfterViewInit{
  width: number;
  length: number;
  resistance: number;
  maxHeight: number;
  layersCount: number;
  map: Map;
  mapSettingsVisible: boolean = true;
  mapSettingsEdited: boolean = true;
  rockConstructorVisible: boolean = true;
  robotsConstructorVisible: boolean = true;
  @ViewChild('canvas') canvas: any;
  canvasContext: CanvasRenderingContext2D;

  ngAfterViewInit() {
    let canvas = this.canvas.nativeElement;
    this.canvasContext = canvas.getContext('2d');
  }

  addRobot(maxInclineAngle: number, robotSize: number, geolocation: Geolocation) {
    maxInclineAngle = +(maxInclineAngle);
    robotSize = +(robotSize);
    geolocation.x = +(geolocation.x);
    geolocation.y = +(geolocation.y);
    geolocation.angle = +(geolocation.angle);
    this.map.addObject(new MapObject(geolocation, maxInclineAngle, robotSize));
  };



  editRobot(maxInclineAngle: number, robotSize: number, geolocation: Geolocation) {
    maxInclineAngle = +(maxInclineAngle);
    robotSize = +(robotSize);
    geolocation.x = +(geolocation.x);
    geolocation.y = +(geolocation.y);
    this.deleteRobot();
    this.addRobot(maxInclineAngle, robotSize, geolocation);
  }

  deleteRobot() {
    this.map.popObject();
    this.map.areaController.redraw();
    this.map.objects.forEach(object => object.view.render());
  }

  toggleRobotsConstructorVisibility() {
    this.robotsConstructorVisible = !this.robotsConstructorVisible;
  }

  toggleMapSettingsVisibility() {
    this.mapSettingsVisible = !this.mapSettingsVisible;
  }

  toggleRockConstructorVisibility() {
    this.rockConstructorVisible = !this.rockConstructorVisible;
  }

  editRock(rock: Rock) {
    rock.size = +(rock.size);
    rock.height = +(rock.height);
    rock.angel = +(rock.angel);
    rock.x = +(rock.x);
    rock.y = +(rock.y);
    rock.resistance = +(rock.resistance);
    for(let prop in rock)
      rock[prop] = Number(rock[prop]);
    if(rock.x + rock.size < this.map.areaController.area.getLength() &&
      rock.y + rock.size < this.map.areaController.area.getWidth()) {
      this.map.popRock();
      this.map.addRock(rock);
    }
  }

  addRock(rock: Rock) {
    rock.size = +(rock.size);
    rock.height = +(rock.height);
    rock.angel = +(rock.angel);
    rock.x = +(rock.x);
    rock.y = +(rock.y);
    rock.resistance = +(rock.resistance);
    for (let prop in rock)
      rock[prop] = Number(rock[prop]);
    this.map.addRock(rock);
  }

  deleteRock() {
    this.map.popRock();
  }

  private clearCanvas() {
    let canvas = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  }

  createMap(width: number, length: number, maxHeight: number, layersCount: number) {
    width = +(width);
    length = +(length);
    maxHeight = +(maxHeight);
    layersCount = +(layersCount);
    this.width = Math.floor(width);
    this.length = Math.floor(length);
    this.maxHeight = maxHeight;
    this.layersCount = layersCount;
    this.clearCanvas();
    this.map = new Map(
      this.width,
      this.length,
      this.maxHeight,
      this.layersCount,
      this.canvasContext
    );
    appState.map = this.map;
  }

  getMapData(): MapData {

    const map = this.map.getSettings();
    const rocks = this.map.getRocks();
    const mapData: MapData = {
      map: map,
      rocks: rocks
    };

    return mapData;

  }

  saveMap(linkReference) {

    const data= JSON.stringify(this.getMapData());

    const file = new Blob([data], {type: "application/json"});
    const fileName = "map.json";

    linkReference.href = URL.createObjectURL(file);
    linkReference.download = fileName;

    linkReference.click();

  }

  triggerUpload(uploaderElement) {

    uploaderElement.click();

  }

  handleMapJsonFile(file) {

    let fileReader = new FileReader();
    fileReader.onload = ((event: Event) => {
      this.importMapData(JSON.parse(event.target.result));
    });
    fileReader.readAsText(file);

  }

  importMapData(mapData: MapData) {

    this.createMap(
      mapData.map.width,
      mapData.map.length,
      mapData.map.maxHeight,
      mapData.map.layersCount
    );

    mapData.rocks.forEach(rock => {
      this.addRock(rock);
    });

  }


  saveRobotsConfig(linkReference) {

    const data= JSON.stringify(this.map.getObjects());

    const file = new Blob([data], {type: "application/json"});
    const fileName = "robots.json";

    linkReference.href = URL.createObjectURL(file);
    linkReference.download = fileName;

    linkReference.click();

  }

  handleRobotsJsonFile(file) {

    let fileReader = new FileReader();
    fileReader.onload = ((event: Event) => {
      this.importRobotsData(JSON.parse(event.target.result));
    });
    fileReader.readAsText(file);

  }

  importRobotsData(robots: MapObject[]) {

    console.log(robots);

    robots.forEach(robot => {
      this.addRobot(robot.maxInclineAngle, robot.size, robot.geolocation);
    })

  }

}
