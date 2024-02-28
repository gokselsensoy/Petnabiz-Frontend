import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      tcid: ['', Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      let newUser = Object.assign({}, this.registerForm.value);
      this.authService.register(newUser).subscribe({next: successResponse => {
        console.log(successResponse,"İşlem başarılı", "Giriş yapıldı");
        this.router.navigate(["/confirm"]);
      }, error : errorResponse => {
        console.log(errorResponse, "Kayıt başarısız");
      }
    })
    } else {
      console.log("Bilgilerinizden bazıları doğrulanamadı", "Formunuz hatalı");
    }
  }


}
