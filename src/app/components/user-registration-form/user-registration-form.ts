import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPersonModel } from '../../interfaces/person-model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-registration-form',
  imports: [FormsModule, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UserRegistrationForm {
  personDetails: IPersonModel[] = [];
  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  editId: string = '';
  isEditable: boolean = false;
  selectedFile: string = '';

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('persons')
    this.personDetails = storedUsers ? JSON.parse(storedUsers) : []
    this.editId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.editId !== '') {
      this.isEditable = true;
      const user = this.personDetails.find(e => e.id === this.editId);
      if (user) {
        this.userInfo.setValue({
          fullName: user.fullName,
          dob: user.dob,
          age: user.age,
          profession: user.profession,
          address: {
            street: user.address.street,
            city: user.address.city,
            state: user.address.state,
            zipCode: user.address.zipCode
          }, preferences: {
            subscription: user.preferences.subscription,
            language: user.preferences.language,
            contactMethod: user.preferences.contactMethod,
            email: user.preferences.email,
            phno: user.preferences.phno
          }, image: user.image
        })
      }
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private route: Router,private userService:UserService) { }

  userInfo = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    dob: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required]),
    profession: new FormControl('',[Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      state: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]),
    }),
    preferences: new FormGroup({
      subscription: new FormControl(),
      language: new FormControl(),
      contactMethod: new FormControl('email'),
      email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      phno: new FormControl('',[Validators.pattern('^[6-9]\d{9}$')])
    }),
    image: new FormControl()

  })

  onImageChange(event: any): void {
    const file = event.target.files[0]
    if (!file) return;
    const reader = new FileReader();
    this.selectedFile = file.name
    reader.onload = () => {
      const base64 = reader.result as string;
      this.userInfo.get('image')?.setValue(base64);
      event.target.value = ''
      console.log(base64);
    };
    reader.readAsDataURL(file);
  }

  registerUser() {
    this.isSubmitted = true;
    if (this.userInfo.valid) {
      if (this.isEditable) {
        const index = this.personDetails.findIndex(u => u.id === this.editId);
        if (index !== -1) {
          this.personDetails[index] = {
            id: this.editId,
            fullName: this.userInfo.value.fullName || "",
            dob: this.userInfo.value.dob || "",
            age: this.userInfo.value.age || '',
            profession: this.userInfo.value.profession || '',
            address: {
              street: this.userInfo.value.address?.street || "",
              city: this.userInfo.value.address?.city || "",
              state: this.userInfo.value.address?.state || "",
              zipCode: this.userInfo.value.address?.zipCode || ""
            }, preferences: {
              subscription: this.userInfo.value.preferences?.subscription || false,
              language: this.userInfo.value.preferences?.language || '',
              contactMethod: this.userInfo.value.preferences?.contactMethod || "",
              email: this.userInfo.value.preferences?.email || '',
              phno: this.userInfo.value.preferences?.phno || ''
            }, image: this.userInfo.value.image || null
          }
        }

      } else {
        const person: IPersonModel = {
          id: crypto.randomUUID(),
          fullName: this.userInfo.value.fullName || "",
          dob: this.userInfo.value.dob || "",
          age: this.userInfo.value.age || '',
          profession: this.userInfo.value.profession || '',
          address: {
            street: this.userInfo.value.address?.street || "",
            city: this.userInfo.value.address?.city || "",
            state: this.userInfo.value.address?.state || "",
            zipCode: this.userInfo.value.address?.zipCode || ""
          }, preferences: {
            subscription: this.userInfo.value.preferences?.subscription || false,
            language: this.userInfo.value.preferences?.language || '',
            contactMethod: this.userInfo.value.preferences?.contactMethod || "",
            email: this.userInfo.value.preferences?.email || '',
            phno: this.userInfo.value.preferences?.phno || ''
          }, image: this.userInfo.value.image || null

        }

        this.personDetails.unshift(person);

      }
      
      this.userService.saveUser(this.personDetails);
      this.route.navigate(['/viewUsers']);
      this.userInfo.reset();
      
      return;

    }
  }
  
}
