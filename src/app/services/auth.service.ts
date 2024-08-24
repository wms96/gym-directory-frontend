import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {login} from '../dto/login';
import {signUpDTO} from "../dto/signup";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

}
