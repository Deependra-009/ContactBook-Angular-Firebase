import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ContactForm!:FormGroup

  constructor() { }

  

  ContactList:any=[
    {
      id:1,
      name:"Deependra",
      number:"1234567890"
    },
    {
      id:2,
      name:"Deependra",
      number:"1234567890"
    },
    {
      id:3,
      name:"Deependra",
      number:"1234567890"
    },
    {
      id:4,
      name:"Deependra",
      number:"1234567890"
    },
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
  }

  addContactItem(){
    this.ContactForm.controls['id'].setValue(this.ContactList.length+1);
    console.log(this.ContactForm.value);
    this.ContactList=[...this.ContactList,this.ContactForm.value]
    
    
  }

}
