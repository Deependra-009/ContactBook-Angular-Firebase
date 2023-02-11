import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactBookServicesService } from 'src/Services/contact-book-services.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ContactForm!:FormGroup

  constructor(
    private service:ContactBookServicesService
  ) { }

  

  ContactList:any=[
  ]

  ngOnInit(): void {

    this.ContactForm=new FormGroup({
      'id':new FormControl("",[Validators.required]),
      'name':new FormControl("",[Validators.required]),
      'number':new FormControl("",[Validators.required])
    });

  }

  deleteItem(item:any){
    this.ContactList=this.ContactList.filter(
      (data:any)=>data.id!=item.id
    )
    this.service.saveContacts(this.ContactList).subscribe(
      (data:any)=>{
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    
    );
  }

  addContactItem(){
    
    this.ContactForm.controls['id'].setValue(this.ContactList.length+1);
    console.log(this.ContactForm.value);
    this.ContactList=[...this.ContactList,this.ContactForm.value]
    this.saveContact();
   
    
  }

  saveContact(){
    this.service.saveContacts(this.ContactList).subscribe(
      (data:any)=>{
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }

  fetchContact(){
    this.service.getContacts().subscribe(
      (data:any)=>{
        this.ContactList=data;
        console.log(this.ContactList);
        
      },(error)=>{
        console.log(error);
        
      }
    )
  }

  editItem(item:any){

  }



}
