import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), BsModalService
  ]
});

