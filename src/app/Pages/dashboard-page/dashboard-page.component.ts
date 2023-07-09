import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/Modal/Student';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { DataServiceService } from 'src/app/Service/data-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    private auth:AuthServiceService,
    private data:DataServiceService
  ) { }

  StudentRegister!: FormGroup;
  studentsList: any = [];

  ngOnInit(): void {
    this.data.setUID(JSON.stringify(localStorage.getItem('uid')));
    this.getAllStudents();

    this.StudentRegister = new FormGroup({
      'firstname': new FormControl('deepu', Validators.required),
      'lastname': new FormControl('trivedi', Validators.required),
      'email': new FormControl('deeputrivedi123@gmail.com', [Validators.required, Validators.email]),
      'mobile': new FormControl('1234567890', Validators.required),
      
    });
  }

  signout(){
    this.auth.logout();
  }

  submitStudentRegister(){
      console.log(this.StudentRegister.value);
      // const temp=this.St
      const data:Student={
        id:this.StudentRegister.value.id,
        firstname:this.StudentRegister.value.firstname,
        lastname:this.StudentRegister.value.lastname,
        email:this.StudentRegister.value.email,
        mobile:this.StudentRegister.value.mobile,
        subjects:[
          "math","english","science"
        ]

      }

      this.data.addStudent(data);
  }

  getAllStudents() {

    this.data.getAllStudent().subscribe((res:any) => {
      
      
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      

    }, err => {
      alert('Error while fetching student data');
    })

  }

  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.firstname + ' ' + student.lastname + ' ?')) {
      console.log(student);
      
      this.data.deleteStudent(student);

    }
  }

}
