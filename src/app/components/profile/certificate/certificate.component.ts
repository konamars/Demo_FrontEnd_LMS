import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  certificates: any = [];
  constructor(private osacadService: OsacadService) { }

  ngOnInit(): void {
    this.getInvoices();
  }
  getInvoices() {
    this.osacadService.getInvoices().subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.certificates = response.body;
        }
      });
  }

}
