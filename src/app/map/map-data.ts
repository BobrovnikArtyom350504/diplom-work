import MapSettings from './map-settings';
import {Rock} from  './area/rock/rock';

interface MapData {
  map: MapSettings;
  rocks: Rock[];
}

export default MapData;
