import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Registration} from "../../models/registration";
import {RegistrationService} from "../../services/registration.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.css']
})
export class RegistrationEditComponent implements OnInit {

  public id:string;
  public registration:Registration|null=null;

  constructor(
    private route:ActivatedRoute,
    private registrationService:RegistrationService,
    private router:Router
  ) {

    this.id=this.route.snapshot.params['id'];
    this.registrationService.getRegistration(this.id).subscribe((registration)=>{
      this.registration=registration;
    });

  }

  ngOnInit(): void {
  }

  public onUpdateRegistration(f:NgForm){
    this.registrationService.updateRegistration(this.id,f.value).subscribe(()=>{
      this.router.navigate(['/']);
      });
  }

}
