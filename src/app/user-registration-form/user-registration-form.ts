import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonModel } from '../person-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  imports: [FormsModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.css'
})
export class UserRegistrationForm {
  // [x: string]: any;
  personDetails:PersonModel[]=[];
  isSubmitted:boolean=false;
  isSuccess:boolean=false;
  editId:string='';
  isEditable:boolean=false;

  ngOnInit():void{
    const storedUsers = localStorage.getItem('persons')
    this.personDetails= storedUsers ? JSON.parse(storedUsers):[]
    this.editId = this.activatedRoute.snapshot.paramMap.get('id')||'';

    if(this.editId!==''){
      this.isEditable=true;
      const user = this.personDetails.find(e=>e.id === this.editId);
      if(user){
        this.userInfo.setValue({
          fullName:user.fullName,
          dob:user.dob,
          address:{
            street:user.address.street,
            city:user.address.city,
            state:user.address.state,
            zipCode:user.address.zipCode
          },preferences:{
            subscription:user.preferences.subscription,
            language:user.preferences.language,
            contactMethod:user.preferences.contactMethod,
            email:user.preferences.email,
            phno:user.preferences.phno
          }
        })
      }
      console.log(user)
    }
  }

  constructor(private activatedRoute:ActivatedRoute){}

  userInfo=new FormGroup({
    fullName:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    dob:new FormControl('',Validators.required),
    address:new FormGroup({
      street:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      city:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      state:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      zipCode:new FormControl('',[Validators.required,Validators.pattern('^[1-9][0-9]{5}$')]),
      }),
      preferences:new FormGroup({
        subscription:new FormControl(),
        language:new FormControl(),
        contactMethod:new FormControl,
          email:new FormControl(),
          phno:new FormControl()
      })
    
  })
  registerUser(){
    this.isSubmitted=true;
    if(this.userInfo.valid){
      if(this.isEditable){
        const index = this.personDetails.findIndex(u=>u.id === this.editId);
        if(index!== -1){
          this.personDetails[index]={
            id:this.editId,
            fullName:this.userInfo.value.fullName||"",
            dob:this.userInfo.value.dob||"",
            address:{
              street:this.userInfo.value.address?.street||"",
              city:this.userInfo.value.address?.city||"",
              state:this.userInfo.value.address?.state||"",
              zipCode:this.userInfo.value.address?.zipCode||""
            },preferences:{
              subscription:this.userInfo.value.preferences?.subscription||false,
              language:this.userInfo.value.preferences?.language||'',
              contactMethod:this.userInfo.value.preferences?.contactMethod||"",
              email:this.userInfo.value.preferences?.email||'',
              phno:this.userInfo.value.preferences?.phno||''
            }
          }
        }

      }else{
          const person:PersonModel={
          id:crypto.randomUUID(),
          fullName:this.userInfo.value.fullName||"",
          dob:this.userInfo.value.dob||"",
          address:{
            street:this.userInfo.value.address?.street||"",
            city:this.userInfo.value.address?.city||"",
            state:this.userInfo.value.address?.state||"",
            zipCode:this.userInfo.value.address?.zipCode||""
          },preferences:{
            subscription:this.userInfo.value.preferences?.subscription||false,
            language:this.userInfo.value.preferences?.language||'',
            contactMethod:this.userInfo.value.preferences?.contactMethod||"",
            email:this.userInfo.value.preferences?.email||'',
            phno:this.userInfo.value.preferences?.phno||''
          }
          
        }
        
        this.personDetails.push(person);
        
      }
      localStorage.setItem('persons',JSON.stringify(this.personDetails));
        //console.log(localStorage.getItem('persons'))
        this.userInfo.reset();
        this.isSubmitted=false;
        this.isSuccess=true;
        setTimeout(()=>{
          this.isSuccess=false
        },3000)
        return;
    }
    //console.log(this.userInfo.get('fullName')?.hasError('required'));
  }
}
