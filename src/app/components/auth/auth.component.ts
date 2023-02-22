import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/models/authUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoginMode=false;
  public error:string="";

  private afterSuccessLogin=(response:User)=>{
    this.router.navigate(["/"]);
  };

  private afterError=(response:any)=>{
    switch (response.error.error.message) {
      case "INVALID_PASSWORD":
        this.error="Įvestas neteisingas slaptažodis";
        break;
      case "EMAIL_EXISTS":
          this.error="Vartotojas su tokiu el. paštu jau registruotas";
          break;
      case "EMAIL_NOT_FOUND":
          this.error="El. paštas nerastas";
          break;     
      case "WEAK_PASSWORD : Password should be at least 6 characters":
          this.error="Slaptažodis per trumpas";
          break;   
          
      default:
        this.error="Įvyko nežinoma klaida";
    }
    

  }

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(f:NgForm){
    const authUser=new AuthUser(f.value.email,f.value.password);
    console.log( authUser );
    if (this.isLoginMode){
      this.authService.login(authUser).subscribe({
        next:this.afterSuccessLogin,
        error:this.afterError
      });
    }else{
      this.authService.register(authUser).subscribe({
        next:this.afterSuccessLogin,
        error:this.afterError
      });
    }
    
  }

}
