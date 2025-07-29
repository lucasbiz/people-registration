import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './mypreset';
import { provideHttpClient } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    DialogService, 
    DynamicDialogRef,
    provideHttpClient(),
    provideAnimationsAsync(),
    MessageService,
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
