import { Component, Inject, model } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { InternshipData } from '../modals/InternshipData';

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
    MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatCardModule, MatDateFnsModule, MatDialogModule,
    MatCheckboxModule, MatSelectModule, MatChipsModule, MatIconModule, MatSliderModule, MatAutocompleteModule, PopupComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  userForm!: FormGroup;
  submitted: boolean = false;
  currentSkill = new FormControl('');
  separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly addOnBlur = true;
  skills: Skill[] = [{ name: 'JavaScript' }, { name: 'Angular' }];
  internshipDetails!: InternshipData;

  constructor(private formbuilder: FormBuilder, private announcer: LiveAnnouncer, private dialog: MatDialog) {
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator('cdsgroups.com')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      isUndergraduate: [false],
      branch: [{ value: '', disabled: true }],
      percentage: ['',Validators.required],
      skillSet: [[]],
      hasInternship: [false]
    });

    this.userForm.get('isUndergraduate')?.valueChanges.subscribe((value) => {
      if (value) {
        this.userForm.get('branch')?.enable();
      } else {
        this.userForm.get('branch')?.disable();
      }
    });
  }
  
  // custom functions for validations
  emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value as string;
      if (!email) {
        return null;
      }
      const isValid = email.endsWith(`@${domain}`);
      return isValid ? null : { invalidDomain: true };
    };
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills = [...this.skills, { name: value }];
    }
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    this.skills = this.skills.filter(s => s !== skill);
    this.announcer.announce(`Removed ${skill.name}`);
  }

  edit(skill: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(skill);
      return;
    }
    this.skills = this.skills.map(s =>
      s === skill ? { ...s, name: value } : s
    );
  }

  trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }
  
  openDialog(event: any) {
      if (event.checked) {
        const dialogRef = this.dialog.open(PopupComponent, {
          width: '500px',
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.internshipDetails = result;
          } 
          else {
            this.userForm.patchValue({ hasInternship: false });
          }
        });        
      }
    }

  onSubmit(): void {
    this.submitted = true;
  }


}
