import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(){
    this.userService.registro(this.formReg.value)
    .then(response =>{
      this.router.navigate(['/login'])

    })
    .catch(error=> console.log(error));

  }
}
