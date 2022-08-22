import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';
import { CommonService } from '../../../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  topic: any = {};
  resources = [];
  constructor(
    private service: OsacadService,
    private toastr: ToastrService,
    private commonService: CommonService) {
   }

  ngOnInit(): void {
    this.commonService.selectedCourseTopic.subscribe(topic => {
      this.topic = topic;
      if (topic && topic.resources) {
        this.resources = topic.resources;
      }
    });
    this.topic = this.commonService.selectedTopicByService;
    if (this.topic && this.topic.resources) {
      this.topic = this.topic;
      this.resources = this.topic.resources;
    }
  }
  redirectToReference(link) {
    window.open(link, '_blank');
  }
  download(resource) {
    if (resource && resource.fileLink) {
      window.location.href = resource.fileLink;
    } else {
      this.toastr.error('No resource found, Please try again later');
    }
  }

}