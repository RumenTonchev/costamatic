import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MachineComponent} from './components/machine/machine.component';
import {GrinderComponent} from './components/grinder/grinder.component';
import {HeaterComponent} from './components/heater/heater.component';
import {BeansContainerComponent} from './components/beans-container/beans-container.component';
import {MilkContainerComponent} from './components/milk-container/milk-container.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {faGlassWater, faCoffee, faGlassWaterDroplet} from "@fortawesome/free-solid-svg-icons";
import {BeverageButtonComponent} from './components/machine/beverage-button/beverage-button.component';
import {StoreModule} from '@ngrx/store';
import {machineReducer} from "./State/Machine/machine.reducer";
import {EffectsModule} from '@ngrx/effects';
import {MachineEffects} from "./State/Machine/machine.effects";
import {heaterReducer} from "./State/Heater/heater.reducer";
import {HeaterEffects} from "./State/Heater/heater.effects";
import {beansContainerReducer} from "./State/BeansContainer/beans-container.reducer";
import {BearContainerEffects} from "./State/BeansContainer/beans-container.effects";
import {grinderReducer} from "./State/Grinder/grinder.reducer";
import {GrinderEffects} from "./State/Grinder/grinder.effects";
import {milkContainerReducer} from "./State/MilkContainer/milk-container.reducer";
import {MilkContainerEffects} from "./State/MilkContainer/milk-container.effects";
import {beveragesReducer} from "./State/Beverages/beverages.reducer";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MachinePageComponent } from './pages/machine-page/machine-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ContainerPreviewPositionPipe } from './pipes/container-preview-position.pipe';
import { ContainerPreviewComponent } from './components/container-preview/container-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    GrinderComponent,
    HeaterComponent,
    BeansContainerComponent,
    MilkContainerComponent,
    BeverageButtonComponent,
    MachinePageComponent,
    AdminPageComponent,
    ContainerPreviewPositionPipe,
    ContainerPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      machine: machineReducer,
      heater: heaterReducer,
      beansContainer: beansContainerReducer,
      grinder: grinderReducer,
      milkContainer: milkContainerReducer,
      beverages: beveragesReducer,
    }, {}),
    EffectsModule.forRoot([
      MachineEffects,
      HeaterEffects,
      BearContainerEffects,
      GrinderEffects,
      MilkContainerEffects,
    ]),
    provideFirebaseApp(() => initializeApp({"projectId":"costamatic-admin","appId":"1:620471898474:web:6e68fda21cb2cd76889513","storageBucket":"costamatic-admin.appspot.com","apiKey":"AIzaSyAffDQQdXS-VG0qPdaDQbDSepOzHIwEIuI","authDomain":"costamatic-admin.firebaseapp.com","messagingSenderId":"620471898474"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faGlassWater, faCoffee, faGlassWaterDroplet
    );
  }
}
