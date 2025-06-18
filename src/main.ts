import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), 
    DialogService,
    DynamicDialogRef,
    provideAnimationsAsync(),
    provideHttpClient(),
  ]
});

