import { Component, EventEmitter, Output } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() onAction = new EventEmitter<boolean>();
  productToDelete: string = '';

  constructor(
    private sharedService: ShareService,
  ) {
    this.productToDelete = this.sharedService.getProduct().name;
  }

  onDeleteProduct() {
    this.onAction.emit(true);
  }

  onClose() {
    this.onAction.emit(false);
  }
}
