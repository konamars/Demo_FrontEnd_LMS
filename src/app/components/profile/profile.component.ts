import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  course;
  constructor(
    
  ) { }

  ngOnInit(): void {
  }
  tabs = [
    {
      name: 'Edit Profile',
      link: 'edit-profile'
    },
    {
      name: 'Change Password',
      link: 'change-password'
    }
    // ,
    // {
    //   name: 'Invoices',
    //   link: 'invoices'
    // },
    // {
    //   name: 'Certificate',
    //   link: 'certificate'
    // },
  ];
}
