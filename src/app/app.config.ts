import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './mypreset';
import { provideHttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    BsModalService,
    DialogService, 
    DynamicDialogRef,
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: MyPreset,
          options: {
              darkModeSelector: false,
              cssLayer: {
                  name: 'primeng',
                  order: 'tailwind-base, primeng, tailwind-utilities'
              }
          }
      }
  })
  ]
};
