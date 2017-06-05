import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {SimulatorComponent} from './simulator/simulator.component';
import {MapConstructorComponent} from './map-constructor/map-constructor.component';
import {AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdTabsModule} from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdTabsModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [
    AppComponent,
    CodeEditorComponent,
    SimulatorComponent,
    MapConstructorComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
