import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  bsModalRef?: BsModalRef;

  constructor( private modalService: BsModalService) { }

  showActionSucess(initialState: Object) {

    this.bsModalRef = this.modalService.show(SuccessModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });
  }


}
