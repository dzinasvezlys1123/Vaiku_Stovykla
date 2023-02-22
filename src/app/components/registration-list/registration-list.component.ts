import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {Registration} from "../../models/registration";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  public registrations:Registration[]=[];

  private loadData(){
    this.registrationService.getRegistrations().subscribe((result)=>{
      this.registrations=result;
    });
  }

  constructor(private registrationService:RegistrationService) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  public onDeleteClick(id:string|null){
    if (id!=null){
      this.registrationService.deleteRegistration(id).subscribe(()=>{
        this.loadData();
      });
    }
  }

}
