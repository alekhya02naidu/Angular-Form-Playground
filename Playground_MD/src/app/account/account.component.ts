import { Component, Inject, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProviderServiceService } from '../provider-service.service';
import { MatButtonModule } from '@angular/material/button';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, CommonModule, MatButtonModule,
    MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatCardModule, MatDateFnsModule, 
    MatCheckboxModule, MatSelectModule, MatChipsModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  userForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formbuilder: FormBuilder, private announcer: LiveAnnouncer) {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      isUndergraduate: [false],
      branch: [{ value: '', disabled: true }],
      skillSet: [[]],
      hasInternship: [false]
    });

    // custom functions for validations

    this.userForm.get('isUndergraduate')?.valueChanges.subscribe((value) => {
      if (value) {
        this.userForm.get('branch')?.enable();
      } else {
        this.userForm.get('branch')?.disable();
      }
    });
  }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   if (value) {
  //     this.userForm.get('skillSet')?.value.push(value);
  //     this.userForm.get('skillSet')?.updateValueAndValidity();
  //   }
  //   event.chipInput!.clear();
  // }

  // remove(skill: string): void {
  //   const index = this.userForm.get('skillSet')?.value.indexOf(skill);
  //   if (index >= 0) {
  //     this.userForm.get('skillSet')?.value.splice(index, 1);
  //   }
  // }

  // edit(skill: string, event: MatChipEditedEvent) {
  //   const value = event.value.trim();
  //   if (!value) {
  //     this.remove(skill);
  //     return;
  //   }
  //   this.userForm.get('skillSet')?.value = this.skills.map(s =>
  //     s === skill ? { ...s, name: value } : s
  //   );
  // }

  // trackBySkill(index: number, skill: Skill): string {
  //   return skill.name;
  // }
}
