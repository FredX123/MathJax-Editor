import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MathEditorComponent } from './math-editor/math-editor.component';

import { MathSymbolsComponent } from './math-symbols/math-symbols.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
    ReactiveFormsModule,
    MathEditorComponent,
    MathSymbolsComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
