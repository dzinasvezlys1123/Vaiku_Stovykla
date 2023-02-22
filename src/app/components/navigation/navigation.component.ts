import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isLoggedin=false;

  public afterUserUpdated=()=>{
    this.isLoggedin=this.authService.isLoggedIn();
  }

  constructor(
    private authService:AuthService
  ) { 
    authService.userUpdated.subscribe(this.afterUserUpdated);
    this.afterUserUpdated();
  }

  ngOnInit(): void {
  }

  public logout(){
    this.authService.logout();
    
  }

}
