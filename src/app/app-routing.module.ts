import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CodeEditorComponent} from './code-editor/code-editor.component';
import {SimulatorComponent} from './simulator/simulator.component';
import {MapConstructorComponent} from './map-constructor/map-constructor.component';

const routes: Routes = [
  { path: '', redirectTo: '/map-constructor', pathMatch: 'full' },
  { path: 'code-editor',  component: CodeEditorComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'map-constructor', component: MapConstructorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
