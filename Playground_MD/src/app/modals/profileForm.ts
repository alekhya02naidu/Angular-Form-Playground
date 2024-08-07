// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// export class ProfileForm {
//   static createForm(fb: FormBuilder): FormGroup {
//     return fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       dob: ['', Validators.required],
//       gender: [''],
//       isUndergraduate: [false],
//       branch: [{ value: '', disabled: true }],
//       percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
//       skillSet: [[]],
//       hasInternship: [false],
//       internshipDetails: fb.group({
//         companyName: [''],
//         role: [''],
//         duration: ['']
//       })
//     });
//   }
// }