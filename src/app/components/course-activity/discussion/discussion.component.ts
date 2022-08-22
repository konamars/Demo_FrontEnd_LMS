import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  discussions;
  constructor(private service: OsacadService) {
    this.service.storeCourseProgress$.subscribe((a) => {
      if(a) {
        this.discussions =a['discussions'];
      }
     })
   }

  ngOnInit(): void {
  }

}
