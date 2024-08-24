import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  get breadCrumbs(): BreadCrumb[] {
    return this._breadCrumbs;
  }

  set breadCrumbs(value: BreadCrumb[]) {
    this._breadCrumbs = value;
  }

  nullafyBreadCrumb() {
    this._breadCrumbs = []
  }

  private _breadCrumbs: BreadCrumb[] = [];


}

export interface BreadCrumb {
  name: string,
  url: string
}
