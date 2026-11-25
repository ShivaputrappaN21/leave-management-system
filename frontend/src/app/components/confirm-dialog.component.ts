import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  template: `
  <div *ngIf="show" class="modal d-block" style="background: rgba(0,0,0,.45)">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">{{ title }}</h5></div>
      <div class="modal-body">{{ message }}</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="cancelled.emit()">{{ noText }}</button>
        <button class="btn btn-danger" (click)="confirmed.emit()">{{ yesText }}</button>
      </div>
    </div></div>
  </div>`
})
export class ConfirmDialogComponent {
  @Input() show = false;
  @Input() title = 'Please confirm';
  @Input() message = '';
  @Input() yesText = 'Yes';
  @Input() noText = 'Keep';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
