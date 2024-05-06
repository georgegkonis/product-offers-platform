import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';
import { LoginRequest } from '../../dto/requests/login-request.dto';
import { NavigationService } from '../../services/navigation.service';

interface LoginForm {
    username: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
        username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });

    constructor(
        private store: Store<AppState>,
        private navigationService: NavigationService
    ) {}

    onSubmit(): void {
        if (this.loginForm.valid) {
            const request: LoginRequest = this.loginForm.getRawValue();
            this.store.dispatch(AuthActions.login(request));
        }
    }

    onCancelClick(): void {
        this.loginForm.reset();
        this.navigationService.navigateToHome();
    }
}

