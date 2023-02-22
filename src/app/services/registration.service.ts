import { Injectable } from '@angular/core';
import {Registration} from "../models/registration";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly url="https://angular-auth-5d6dc-default-rtdb.europe-west1.firebasedatabase.app/";
  constructor(
    private http:HttpClient,
    private auth:AuthService,
  ) { }

  public addRegistration(registration:Registration){
    return this.http.post(this.url+"registrations.json",registration);
  }
  public getRegistrations(){
    return this.http.get<{[key:string]:Registration}>(this.url+"registrations.json").pipe(
      map((response):Registration[]=>{
        let registrations:Registration[]=[];
        for (let key in response){
          registrations.push(  {...response[key], id:key}   );
        }
        return registrations;
      })
    );
  }
  public getRegistration(id:string){
    return this.http.get<Registration>(this.url+"registrations/"+id+".json").pipe(
      map( (response):Registration=>{
        return {...response,id:id};
      })
    )
  }

  public updateRegistration(id:string, registration:Registration){

    return this.http.patch(this.url+"registrations/"+id+".json",registration);
  }

  public deleteRegistration(id:string){
    return this.http.delete(this.url+"registrations/"+id+".json");
  }
}
