import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators.function';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
    templateUrl: './register-page.component.html',
    styles: ``
})
export class RegisterPageComponent {

    //TODO esto se ocupo antes de crear el servicio validators
    // public myForm: FormGroup = this.fb.group({
    //     name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    //     email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    //     username: ['', [Validators.required, customValidators.cantBeStrider]],
    //     password: ['', [Validators.required, Validators.minLength(6)]],
    //     passwordtwo: ['', [Validators.required]]
    // });

    //TODO esto es lo mismo que arriba pero con el servicio validators
    public myForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
        //
        email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
        username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordtwo: ['', [Validators.required]]
    },
        {
            validators: [
                this.validatorsService.isFieldOneEqualFieldTwo('password', 'passwordtwo')
            ]
        });

    constructor(
        private fb: FormBuilder,
        private validatorsService: ValidatorsService,
        private emailValidator: EmailValidatorService
    ) { }

    isValidField(field: string) {
        //TODO obtener validacion de un service
        return this.validatorsService.isValidField(this.myForm, field);
    }

    onSave() {
        this.myForm.markAllAsTouched();
    }

}
