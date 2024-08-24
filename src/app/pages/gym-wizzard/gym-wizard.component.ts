import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CoachService} from "../../services/coach.service";
import {GymService} from "../../services/gym.service";
import {AddressService} from "../../services/address.service";
import {ClassService} from "../../services/class.service";
import {OwnerService} from "../../services/owner.service";
import {ScheduleService} from "../../services/schedule.service";
import {SubscriptionService} from "../../services/subscription.service";
import {
  MatChipEditedEvent,
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRemove,
  MatChipRow
} from "@angular/material/chips";
import {Fruit} from "../ui-components/chips/chips.component";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DynamicFormComponent} from "../../component/dynamic-form/dynamic-form.component";
import {FormFieldMetadata} from "../../component/dynamic-form/form-field-metadata";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-gym-wizard',
  templateUrl: './gym-wizard.component.html',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatStepLabel,
    MatButton,
    MatInput,
    MatLabel,
    MatStepperNext,
    MatStepperPrevious,
    MatIcon,
    MatIconButton,
    NgIf,
    MatError,
    NgForOf,
    JsonPipe,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    DynamicFormComponent,
    MatCard
  ],
  styleUrls: ['./gym-wizard.component.css']
})
export class GymWizardComponent implements OnInit {
  gymForm: FormGroup;
  addressForm: FormGroup;
  coachForms: FormGroup[] = [];
  classForm: FormGroup;
  ownerForm: FormGroup;
  scheduleForm: FormGroup;
  subscriptionForm: FormGroup;
  gymId!: number;
  metaData: string[] = [];
  addOnBlur = true;
  imagesFormArray: FormArray;
  imagePreviewUrls: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  gymFormMetadata: { [key: string]: FormFieldMetadata } = {
    name: {type: 'string'},
    metadata: {type: 'chip'},
    images: {type: 'file'}
  };
  addressFormMetadata: { [key: string]: FormFieldMetadata } = {
    street: {type: 'string'},
    city: {type: 'string'},
    state: {type: 'string'},
    country: {type: 'string'},
    postal_code: {type: 'string'},
  };

  coachFormMetadata: { [key: string]: FormFieldMetadata } = {
    name: {type: 'string'},
    is_freelancer: {type: 'checkBox'},
    description: {type: 'string', layout: "singleRow"},
    preferred_gyms: {type: 'string', },
    price_range: {type: 'string'},
    metadata: {type: 'chip'},
    specialization: {type: 'select'},
    images: {type: 'file'},
    street: {type: 'string',section:'Address'},
    city: {type: 'string'},
    state: {type: 'string'},
    country: {type: 'string'},
    postal_code: {type: 'string'},
  };
  classFormMetadata: { [key: string]: FormFieldMetadata } = {
    name: {type: 'string'},
    description: {type: 'string'},
  };
  ownerFormMetadata: { [key: string]: FormFieldMetadata } = {
    name: {type: 'string'},
    email: {type: 'string'},
  };
  scheduleFormMetadata: { [key: string]: FormFieldMetadata } = {
    class_id: {type: 'string'},
    coach_id: {type: 'string'},
    start_time: {type: 'string'},
    end_time: {type: 'string'},
  };

  constructor(
    private fb: FormBuilder,
    private gymService: GymService,
    private addressService: AddressService,
    private coachService: CoachService,
    private classService: ClassService,
    private ownerService: OwnerService,
    private scheduleService: ScheduleService,
    private subscriptionService: SubscriptionService
  ) {
    this.gymForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      metadata: [[]],
      images: this.fb.array([]),
    });
    this.addressForm = this.fb.group({
      gym_id: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postal_code: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });

    this.classForm = this.fb.group({
      gym_id: [''],
      name: ['', Validators.required],
      description: ['']
    });
    this.ownerForm = this.fb.group({
      gym_id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.scheduleForm = this.fb.group({
      gym_id: [''],
      class_id: ['', Validators.required],
      coach_id: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });
    this.subscriptionForm = this.fb.group({
      gym_id: [''],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      duration_days: ['', [Validators.required, Validators.min(1)]]
    });

    this.imagesFormArray = this.fb.array([]);
    this.gymForm.setControl('images', this.imagesFormArray);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.metaData.push(value);
    }
    event.chipInput!.clear();
  }

  remove(string: string): void {
    const index = this.metaData.indexOf(string);
    if (index >= 0) {
      this.metaData.splice(index, 1);
    }
  }

  edit(string: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(string);
      return;
    }
    const index = this.metaData.indexOf(string);
    if (index >= 0) {
      this.metaData[index] = value;
    }
  }

  onImagesChange(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagesFormArray.push(this.fb.control(files[i]));
      this.imagePreviewUrls.push(URL.createObjectURL(files[i]));
    }
  }

  ngOnInit(): void {
  }

  createGym(stepper: MatStepper): void {
    if (this.gymForm.valid) {
      stepper.next();
    }
  }

  createAddress(stepper: MatStepper): void {
    if (this.addressForm.valid) {
      this.gymForm.setControl('address', this.addressForm);
      this.gymService.createGym(this.gymForm.value).subscribe((gym: { id: number; }) => {
        this.gymId = gym.id;
        this.addressForm.patchValue({gym_id: this.gymId});
        this.classForm.patchValue({gym_id: this.gymId});
        this.ownerForm.patchValue({gym_id: this.gymId});
        this.scheduleForm.patchValue({gym_id: this.gymId});
        this.subscriptionForm.patchValue({gym_id: this.gymId});
        stepper.next();
      });
    }
  }

  addCoachForm(): void {
    const coachForm = this.fb.group({
      gym_id: [this.gymId],
      name: ['', Validators.required],
      description: ['', Validators.required],
      is_freelancer: [''],
      preferred_gyms: [''],
      specialization: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postal_code: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });
    this.coachForms.push(coachForm);
  }

  removeCoachForm(index: number): void {
    this.coachForms.splice(index, 1);
  }

  createCoach(stepper: MatStepper): void {
    let isValid = true;
    this.coachForms.forEach(form => {
      if (!form.valid) {
        isValid = false;
      }
    });
    if (isValid) {
      const coaches = this.coachForms.map(form => form.value);
      this.coachService.createCoaches(coaches).subscribe(() => {
        stepper.next();
      });
    }
  }

  createClass(stepper: MatStepper): void {
    if (this.classForm.valid) {
      this.classService.createClass(this.classForm).subscribe(() => {
        stepper.next();
      });
    }
  }

  createOwner(stepper: MatStepper): void {
    if (this.ownerForm.valid) {
      this.ownerService.createOwner(this.ownerForm.value).subscribe(() => {
        stepper.next();
      });
    }
  }

  createSchedule(stepper: MatStepper): void {
    if (this.scheduleForm.valid) {
      this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(() => {
        stepper.next();
      });
    }
  }

  createSubscription(stepper: MatStepper): void {
    if (this.subscriptionForm.valid) {
      this.subscriptionService.createSubscription(this.subscriptionForm.value).subscribe(() => {
        stepper.next();
      });
    }
  }
}
