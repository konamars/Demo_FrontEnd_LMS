import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dl-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }
  @Input() faq: any[];
  ngOnInit() {
  }

}
