import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegistrationService} from "../../services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-new',
  templateUrl: './registration-new.component.html',
  styleUrls: ['./registration-new.component.css']
})
export class RegistrationNewComponent implements OnInit {

  constructor(private registrationService:RegistrationService, private router:Router) { }

  ngOnInit(): void {
  }

  public onAddNewRegistration(f:NgForm){
    this.registrationService.addRegistration(f.value).subscribe(()=>{
      this.router.navigate(["/"]);

    });
  }

}
