import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeScrollsService {
  section_name: string = '';

  set_section_name(id: string) {
    this.section_name = id;
  }

  get_section_name(): string {
    return this.section_name;
  }

  constructor() {}
}
