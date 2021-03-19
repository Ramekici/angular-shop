import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() invalid: boolean;

  form: FormControl;

  constructor() { }

  ngOnInit() {
    this.form = new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
  }

}
