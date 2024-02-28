import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit{

  confirmForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
      this.createConfirmForm();
  }

  createConfirmForm() {
    this.confirmForm = this.formBuilder.group({
      email: ['', Validators.required],
      confirmCode: ['', Validators.required],
    })
  }

  confirm() {
    if (this.confirmForm.valid) {
      let confirmCode = Object.assign({}, this.confirmForm.value);
      this.authService.confirmCode(confirmCode).subscribe({
        next: (successResponse) => {
          this.router.navigate(["/dashboard"]);
          console.log(successResponse)
        }, error: (errorResponse) => {
          console.log(errorResponse);
        }
      })
    }
  }
}
