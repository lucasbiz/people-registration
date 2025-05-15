import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-success-modal',
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent {

    modalTitle: string = '';

    constructor(public bsModalRef: BsModalRef) {};

    closeModal() {
      this.bsModalRef.hide();
    };

}
