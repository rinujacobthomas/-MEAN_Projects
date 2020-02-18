import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup= new FormGroup({
    first_name:new FormControl(null,Validators.required),
    last_name:new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,Validators.required)
  })

  constructor(private rout:Router,private _userService:UserService) { }

  ngOnInit() {
  }
moveToLogin()
{
  this.rout.navigate(['/login']);
}
register()
{
  if(this.registerForm.valid)
  {
    console.log(JSON.stringify(this.registerForm.value));
    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe({
      next:data=>{
      this.rout.navigate(['/login']);
      console.log(data);
      
    },
      error:error=>console.error('there was an error',error) 
    });
  }
  else
  {
    console.log('invalid form');
    
  }
}
}
