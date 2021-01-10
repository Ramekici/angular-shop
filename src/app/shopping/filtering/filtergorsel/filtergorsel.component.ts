import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtergorsel',
  templateUrl: './filtergorsel.component.html',
  styleUrls: ['./filtergorsel.component.css'],
})
export class FiltergorselComponent {

  @Input() showFiltered: boolean;
  @Input() value = 0;
  progress = 30;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });
  }
  datam: Array<any> = [
    { name: 'canta', value: 'canta' },
    { name: 'cuzdan', value: 'cuzdan' },
    { name: 'valiz', value: 'valiz' },
    { name: 'sal', value: 'sal' }
  ];

  renkDatam: Array<any> = [
    { name: 'kırmızı', value: 'kırmızı', renk: 'red'},
    { name: 'siyah', value: 'siyah', renk: 'black'},
    { name: 'beyaz', value: 'beyaz', renk: 'white'},
    { name: 'mavi', value: 'mavi', renk: 'blue'},
    { name: 'gri', value: 'gri', renk: 'gray'},
    { name: 'kahverengi', value: 'kahve', renk: 'brown'}
  ];

  fiyatDatam: Array<any> = [
    { name: '10.00 - 49.00', value: '49' },
    { name: '50.00 - 99.00', value: '99' },
    { name: '100.00 - 199.00', value: '199' },
    { name: '200.00 - üzeri', value: '200' }
  ];

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    console.log(this.form.value);
  }


}
