import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/app.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProfileComponent } from './components/profile/profile.component';
import { CredentialsHttpInterceptor } from './interceptors/credentials-http.interceptor';

@NgModule({
    declarations: [
        RouterOutletComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ app: appReducer }),
        EffectsModule.forRoot(AuthEffects),
        StoreDevtoolsModule.instrument(),
        HttpClientModule,
        BrowserAnimationsModule,
        ToastModule
    ],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MessageService] },
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsHttpInterceptor, multi: true }
    ],
    bootstrap: [RouterOutletComponent]
})
export class AppModule {}
