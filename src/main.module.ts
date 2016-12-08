import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from './http-services'
import { NgValidations } from './ng2-validations.service'

@NgModule({
	imports: [FormsModule, ReactiveFormsModule, HttpModule],
	providers: [HttpService, NgValidations],
	exports: []
})
export class NgValidationsModule {}