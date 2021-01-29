import { Component, OnInit } from '@angular/core';
import {Student} from '../service/studentmodel'
import {SrvService} from '../service/srv-service.service';


@Component({
  selector: 'app-studlist',
  templateUrl: './studlist.component.html',
  styleUrls: ['./studlist.component.css']
})
export class StudlistComponent implements OnInit {

StudentFilterGroup: any = {sgroup: '',stud:''};
StudentFilterStud: any = {stud: ''};

  constructor(private srv: SrvService) { }

  ngOnInit(): void {
    this.getStudents();
    console.log(this.students);
    
  }

  onDelete(id){
    this.srv.removeStudent(id).then(()=>{
    this.students = this.students.filter(student=>student.id !== id); this.showstudents = this.showstudents.filter(student=>student.id !== id) })
  }

  students: Student[]=[];
  showstudents: Student[]=[];
  sorting = false;

  async getStudents(){
    this.students = [];
   await this.srv.getStudents().then(()=>
    (this.srv.students).forEach(student=>this.students.push(student)
    
    )
    )

    for (let student in this.students){
      console.log(this.students[student].id);
      let obj = {
        surname : this.students[student].surname,
        id: this.students[student].id,
        name : this.students[student].name,
        middlename: this.students[student].middlename,
        phone: this.students[student].phone,
        email: this.students[student].email,
        birth: this.students[student].birth,
        sgroup: this.students[student].sgroup,
        stud: this.students[student].stud,
      }
      this.showstudents.push(obj);
    }
  }

  useSorting(){
    console.log(this.sorting)
    if (this.sorting == false){
      this.sorting = true; 
      this.students.sort((prev,next) =>{
        if (prev.surname < next.surname) return -1;
        else if (prev.surname > next.surname) return 1;
        else return 0;
      });   
        
    }
    else if (this.sorting == true){
      this.sorting = false;   
      this.students.sort((prev,next) =>{
        if (prev.surname > next.surname) return -1;
        else if (prev.surname < next.surname) return 1;
        else return 0;
       
      });  
       
    }
  }

}
