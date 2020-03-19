import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() inputType: string;
  @Input() classNames: string;

  constructor() {}

  ngOnInit() {}

  generateId(name: string) {
    return name.split(' ')[0].toLowerCase() + 'Id';
  }

  checkValidity() {
    const { touched, dirty, errors, invalid } = this.control;
    return (touched && invalid) || (dirty && errors);
  }
}
