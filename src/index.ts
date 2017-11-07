import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { SignalRMessageModel } from "./model/signalr.chatmessage.model";
import { SignalRService } from "./service/signalr.service";

export * from './model/signalr.chatmessage.model';
export * from './service/signalr.service';

export interface SignalrConfigApp {
  url?: string;
  hubName?: string;
}

@NgModule({
  declarations: [
    
  ],   
  imports: [
      
  ],
  exports:[
      
  ]
})
export class SignalrModule {
  static forRoot(config: SignalrConfigApp): ModuleWithProviders {
    return {
      ngModule: SignalrModule,
      providers: [
        {provide: 'config', useValue: config},
        SignalRService
      ]
    };
  }
}