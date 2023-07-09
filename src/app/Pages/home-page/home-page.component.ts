import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private auth:AuthServiceService,
    private route:Router
    
  ) { }
  login=true;

  LoginData!: FormGroup;
  RegisterData!: FormGroup;

  ngOnInit(): void {

    this.LoginData = new FormGroup({
      'email': new FormControl('deeputrivedi@gmail.com', [Validators.required, Validators.email]),
      'password': new FormControl('123456', Validators.required)
    });

    this.RegisterData = new FormGroup({
      'email': new FormControl('deeputrivedi123@gmail.com', [Validators.required, Validators.email]),
      'password': new FormControl('123456', Validators.required),
      'cpassword': new FormControl('123456', Validators.required)
    });
  }

  changePage(){
    this.login=!this.login;
  }

  submitLoginFunction(){
    if(this.LoginData.valid ){
      this.auth.signin(this.LoginData.value.email,this.LoginData.value.password).then(
        (data:any)=>{
          localStorage.setItem('token','true');
          
          console.log(data);
          console.log(data.user._delegate.uid);
          localStorage.setItem("uid",data.user._delegate.uid);
   
          this.route.navigate(['dashboard'])
        }
      ).catch(
        (error)=>{
          console.log(error);
          
        }
      )
    }
    
  }

  submitRegisterFunction(){

    if(this.RegisterData.valid && this.RegisterData.value.password==this.RegisterData.value.cpassword){
      this.auth.signUp(this.RegisterData.value.email,this.RegisterData.value.password).then(
        (data)=>{
          alert("registration succefully")
          console.log(data);
        }
      ).catch(
        (error)=>{
          console.log(error);
          
        }
      )
  
      
    }
  }

}
