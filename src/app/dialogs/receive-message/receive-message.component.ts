import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-receive-message',
  templateUrl: './receive-message.component.html',
  styleUrls: ['./receive-message.component.scss']
})
export class ReceiveMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReceiveMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
