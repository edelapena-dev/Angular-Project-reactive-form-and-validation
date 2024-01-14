import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './switches-page.component.html',
    styles: ``
})
export class SwitchesPageComponent implements OnInit {
    public myForm: FormGroup = this.fb.group({
        gender: ['M', Validators.required],
        wantNotifications: [true, Validators.required],
        termsAndConditions: [false, Validators.requiredTrue],
    });

    person = {
        gender: 'F',
        wantNotifications: false
    }

    constructor(private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.myForm.reset(this.person);
    }

    onSave() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }

        this.person = this.myForm.value;
        console.log('1 - ', this.person);
        //Formas de borrar propiedades que no se quieren asignar a un objeto
        const {  termsAndConditions, ...newPerson } = this.myForm.value;
        this.person = newPerson;
        console.log('2 - ', this.person);

    }
}
