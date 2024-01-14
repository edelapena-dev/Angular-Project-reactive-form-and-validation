import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './basic-page.component.html',
    styles: ``
})
export class BasicPageComponent implements OnInit {
    //TODO es necesario importar en el reactive.module ReactiveFormModule
    // public myForm: FormGroup = new FormGroup({
    //     name: new FormControl('', [], []),
    //     price: new FormControl(0, [], []),
    //     inStorage: new FormControl(0, [], []),
    // });

    //TODO otra forma de hacer la validacion
    public myForm2: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0)]],
        inStorage: [0, [Validators.required, Validators.min(0)]],
    })
    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.myForm2.reset({
            name: '',
            price: 0,
            inStorage: 0
        });
    }

    isValidField(field: string): boolean | null {
        return this.myForm2.controls[field].errors && this.myForm2.controls[field].touched
    }

    getFieldError(field: string): string | null{
        if (!this.myForm2.controls[field]) return null;

        const errors = this.myForm2.controls[field].errors || {};

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Mínimo ${errors['minlength'].requiredLength} caracters.`
            }
        }

        return null;
    }

    onSave(): void {
        if (!this.myForm2.valid) {
            this.myForm2.markAllAsTouched;
            return;
        }
        console.log(this.myForm2.value);
        this.myForm2.reset({
            name: '',
            price: 0,
            inStorage: 0
        });
    }
}
