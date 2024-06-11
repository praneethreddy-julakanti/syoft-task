import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userDataObj: any;

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if(userData) {
      this.userDataObj = JSON.parse(userData);
    }
  }
}
