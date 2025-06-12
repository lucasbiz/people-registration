import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-deletion-modal',
  imports: [],
  templateUrl: './confirm-deletion-modal.component.html',
  styleUrl: './confirm-deletion-modal.component.css'
})
export class ConfirmDeletionModalComponent {

  @Output() userDeleted = new EventEmitter<void>();

  constructor(public bsModalRef: BsModalRef) {};

  deleteUser(){
    this.closeModal();
    this.userDeleted.emit();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
};

