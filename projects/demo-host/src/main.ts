import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { MATHJAX_ADDITIONAL_GROUPS } from 'mathjax-editor';
import { EXTRA_SYMBOL_GROUPS } from './app/extra-symbols';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    { provide: MATHJAX_ADDITIONAL_GROUPS, useValue: EXTRA_SYMBOL_GROUPS }
  ]
}).catch(err => console.error(err));
