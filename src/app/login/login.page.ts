import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl( '', Validators.compose([
        Validators.required,
        Validators.pattern( '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]+$')
      ])),
      password: new FormControl( '', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  validation_messages = {
    'email' : [
      { type: 'required', message: 'el email es requerido para iniciar secion' },
      { type: 'pattern', message: 'el email no es valido' }
    ],
    'password' : [
      { type: 'required', message: 'el password es requerido para iniciar secion' },
      { type: 'pattern', message: 'el password no es valido' }
    ]
  };

  loginUser( value ){
    this.authService.loginUser( value )
    .then( res => {
      console.log( res );
      this.errorMessage = '',
      this.navCtrl.navigateForward( '/dashboard' );
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward( '/register' );
  }

}
