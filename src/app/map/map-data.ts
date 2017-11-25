import MapSettings from './map-settings';
import {Rock} from  './area/rock/rock';

export default interface MapData {
  map: MapSettings,
  rocks: Rock[]
}
