import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showError(messageTitle: string, messageText: string): void {
    this.messageService.add({
      severity: 'error',
      summary: messageTitle,
      detail: messageText,
    });
  }
}
