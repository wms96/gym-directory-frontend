import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, ReactiveFormsModule} from '@angular/forms';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormFieldMetadata} from "./form-field-metadata";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  styleUrl:'./dynamic-form.component.scss',
  imports: [
    MatLabel,
    MatChipInput,
    MatChipRemove,
    MatIcon,
    MatError,
    MatChipGrid,
    MatChipRow,
    MatFormField,
    NgSwitchCase,
    MatInput,
    MatOption,
    NgForOf,
    MatSelect,
    NgIf,
    NgSwitch,
    ReactiveFormsModule,
    MatSlideToggle,
    MatCheckbox,
    NgClass
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formMetadata!: { [key: string]: FormFieldMetadata };

  formControlNames: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  ngOnInit(): void {
    this.formControlNames = Object.keys(this.formGroup.controls);
  }

  isFormControl(controlName: string): boolean {
    return this.formGroup.get(controlName)! instanceof FormControl;
  }

  getFieldMetadata(controlName: string): FormFieldMetadata {
    return this.formMetadata[controlName];
  }

  getChipsValue(controlName: string): string[] {
    return this.formGroup.get(controlName)!.value || [];
  }

  add(controlName: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const chips = this.formGroup.get(controlName)!.value || [];
      chips.push(value.trim());
      this.formGroup.get(controlName)!.setValue(chips);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(controlName: string, string: string): void {
    const chips = this.formGroup.get(controlName)!.value || [];
    const index = chips.indexOf(string);

    if (index >= 0) {
      chips.splice(index, 1);
      this.formGroup.get(controlName)!.setValue(chips);
    }
  }

  edit(controlName: string, string: string, event: any): void {
    const chips = this.formGroup.get(controlName)!.value || [];
    const index = chips.indexOf(string);

    if (index >= 0) {
      chips[index] = event.target.value.trim();
      this.formGroup.get(controlName)!.setValue(chips);
    }
  }

  onFilesChange(controlName: string, event: any): void {
    const files = event.target.files;
    const fileArray = this.formGroup.get(controlName)! as FormArray;

    for (let i = 0; i < files.length; i++) {
      fileArray.push(new FormControl(files[i]));
    }
  }

  getFilePreviewUrls(controlName: string): string[] {
    const fileArray = this.formGroup.get(controlName)! as FormArray;
    return fileArray.controls.map(control => URL.createObjectURL(control.value));
  }

  getSections(): (string | undefined)[] {
    return [...new Set(Object.values(this.formMetadata).map(metadata => metadata.section))];
  }

  getControlNamesForSection(section: string | undefined): string[] {
    return Object.keys(this.formMetadata).filter(controlName => this.formMetadata[controlName].section === section);
  }
}
