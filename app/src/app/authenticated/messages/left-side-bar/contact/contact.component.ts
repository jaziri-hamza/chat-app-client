import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactService: ContactService;

  constructor(
    contactService: ContactService
  ) {
    this.contactService = contactService;
  }

  ngOnInit() {
    this.contactService.loadContact();
  }




}
