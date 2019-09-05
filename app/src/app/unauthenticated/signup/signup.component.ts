import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Api } from '../../Api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  form: FormGroup;

  startRequest: boolean = false;
  endRequest: boolean = false;
  errorRequest: boolean = false;
  okRequest: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) {
    this.createForm();
  }


  createForm(){
    this.form = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      birthday: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/),
      ]),
      sex: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  
  
  onSignUp(){
      if(this.form.invalid)
        return;
      
      this.startRequest = true;
      this.endRequest  = false;
      this.okRequest = false;
      this.errorRequest = false;
      
      this.http.post(Api.entryPoint+'users', this.form.value, Api.httpOptions)
      .toPromise().then(res=>{
        this.okRequest = true;
        this.endRequest = true;
      }).catch(err=>{
        this.endRequest = true;
        this.errorRequest = true;
      }).finally(()=>{
        this.startRequest = false;
      })
    
  }

}
