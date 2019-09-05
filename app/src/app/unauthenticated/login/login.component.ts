import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticatedService } from 'src/app/authenticated.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticatedService
    ) {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  onLogin(){
    let err =  this.authService.login(this.form.value);
    console.log(err);
  }

  get errorLogin(){ return this.authService.errorLogin;}
}
