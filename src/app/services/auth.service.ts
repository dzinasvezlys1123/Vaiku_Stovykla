import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthUser } from '../models/authUser';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key="AIzaSyCmJvgrK3y38sK4CDHREFsdhE-g_YOSZcU";
  private readonly url="https://identitytoolkit.googleapis.com/v1/accounts";
  public user:User|null=null;

  public userUpdated=new EventEmitter();

  public afterLogin=(response:User)=>{
    this.user=response;
    localStorage.setItem("user",JSON.stringify(this.user));
    this.userUpdated.emit();

  };

  public autoLogin(){
    let data=localStorage.getItem("user");
    if (data!=null){
      this.user=JSON.parse(data);
    }
  }


  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  public register(authUser:AuthUser){
    return this.http.post<User>(this.url+":signUp?key="+this.key,authUser).pipe(
      tap(this.afterLogin)
    );
  }

  public login(authUser:AuthUser){
    return this.http.post<User>(this.url+":signInWithPassword?key="+this.key,authUser).pipe(
      tap(this.afterLogin)
    );
  }

  public isLoggedIn(){
    return this.user!=null;
  }

  public logout(){
    this.user=null;
    this.router.navigate(["/auth"]);
    localStorage.removeItem("user");
    this.userUpdated.emit();

  }
}
