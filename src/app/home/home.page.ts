import { Component } from '@angular/core';
import { ParseService } from '../parse.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private parse: ParseService) {}

  create() {
    this.parse.createObject();
  }
}
