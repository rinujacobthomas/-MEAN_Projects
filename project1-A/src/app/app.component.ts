import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1-A';
  constructor(private _route:Router,private _userSer:UserService){}
  logout()
  {
    this._userSer.logout();
    this._route.navigate(['/login'])
    console.log('in logout');
    
  }
}
