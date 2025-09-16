import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent {
  private readonly matDialogRef = inject(MatDialogRef);

  onConfirm(): void {
    this.matDialogRef.close(true);
  }

  onDismiss(): void {
    this.matDialogRef.close(false);
  }
}
