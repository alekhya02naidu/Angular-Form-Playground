import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatDialogActions, MatDialogContent, MatLabel, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  internshipData!: FormGroup;
  isInternshipDataSubmitted: boolean = false;

  constructor(private formbuilder: FormBuilder, private dialogRef: MatDialogRef<PopupComponent>) {
    this.internshipData = this.formbuilder.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSave() {
    this.isInternshipDataSubmitted = true;
    if (this.internshipData.valid) {
      this.dialogRef.close(this.internshipData.value);
    }
    else {
      return;
    }
  }
}
