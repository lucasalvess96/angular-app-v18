import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent {
  title?: string;
  message?: string;

  private readonly matDialogRef = inject(MatDialogRef);

  readonly data = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.matDialogRef.close(true);
  }

  onDismiss(): void {
    this.matDialogRef.close(false);
  }
}
