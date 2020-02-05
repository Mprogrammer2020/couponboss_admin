import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  logout() {
    let a = confirm("Are you Sure you want to logout?")
    if (a == true){
    localStorage.clear();
    }
  }

}
