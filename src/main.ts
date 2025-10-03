import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
