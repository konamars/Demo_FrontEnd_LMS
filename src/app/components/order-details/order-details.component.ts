import { Component, OnInit, NgZone } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { OsacadService } from '../../services/osacad.service';
import { AppService } from '../../shared/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { ApexService } from '../../shared/services/apex.service';
import { constants } from '../../constants/constants';
import { Router } from '@angular/router';

declare const Razorpay: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  program: any = {};
  totalPrice: any = 0;
  amountPaid: any;
  constructor(
    private commonService: CommonService,
    private osacadService: OsacadService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService,
    private apexService: ApexService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.getEnrollProgram();
  }
  getEnrollProgram() {
    this.program = this.commonService.selectedProgram;
    if(!(this.program && Object.keys(this.program).length)) {
      this.router.navigate(['/home']);
    } else {
      this.calculateTotalPrice();
    }
  }
  proceedForPayment() {
    if (this.program && this.amountPaid >= 1000) {
      const orderDetails = {
        courseId: this.program._id,
        totalPrice: this.calculateTotalPrice(),
        amountPaid: this.amountPaid
      };
      this.osacadService.createOrderId(orderDetails).subscribe(
        (response) => {
          this.redirectRazorPay(response);
        },
        (error) => {
          this.toastr.error('Failed in payment, Please try again');
        });
    } else {
      this.toastr.error('Please enter amount greater than or equal to RS 1,000');
    }
  }
  redirectRazorPay(orderResponse) {
    const options = {
      key: constants.RAZOR_PAY_KEY,
      // amount: (this.calculateTotalPrice() * 100),
      amount: this.amountPaid * 100,
      currency: constants.CURRENCY,
      name: constants.RAZORPAY_INPUT_NAME,
      description: constants.RAZORPAY_INPUT_DESCRIPTION,
      image: '',
      order_id: orderResponse.orderId,
      handler: (response) => {
        this.apexService.showLoader(true);
        this.saveOrderDetails(response);
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
  saveOrderDetails(razorPayResponse) {
    const orderDetails = {
      courseId: this.program._id,
      paymentId: razorPayResponse.razorpay_payment_id,
      totalPrice: this.calculateTotalPrice(),
      amountPaid: this.amountPaid
    };
    this.osacadService.saveOrderDetails(orderDetails).subscribe(
      (response: any) => {
        if (response) {
          this.toastr.success('Successfully placed the order');
          this.ngZone.run(() => this.router.navigate(['/orderConfirmation'], {queryParams: {id: 'done'}}).then());
        }
      },
      (error) => {
        this.toastr.error('Failed in payment');
      });
  }
  calculateTotalPrice() {
    this.totalPrice = this.program.price + ((this.program.price * 18 ) / 100);
    return this.totalPrice;
  }

}
