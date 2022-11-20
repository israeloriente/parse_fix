import { Injectable } from '@angular/core';
import * as Parse from 'parse';
// import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class ParseService {
  constructor() {
    this.initParse();
  }

  initParse() {
    console.log('Parse initialized');
    (Parse.serverURL as any) = 'https://parseapi.back4app.com'; // This is your Server URL
    // Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
    Parse.initialize(
      'uHsnmFBPVs2ZJ7ZnP29mS5h0uAzP3qVxlqX7aXC0', // This is your Application ID
      'yanDnmm45Jlxr85enYg4I2fdmQPYg0z5e02QEMyj' // This is your Javascript key
    );
  }

  async createObject() {
    const myNewObject = new Parse.Object('Todo');
    try {
      const result = await myNewObject.save();
      // Access the Parse Object attributes using the .GET method
      console.log('Todo created', result);
    } catch (error) {
      console.error('Error while creating Todo: ', error);
    }
  }

  async createObjectWithIdempotendy() {
    const myNewObject = new Parse.Object('Todo');
    const uid = new Date().toISOString();
    this.setIdempotency(uid);
    const result = await myNewObject.save();
    console.log('Todo created', result);
  }

  /** Clean X-Parse-Request-Id to prevent problems, because if
   * another request not contains REQUEST_HEADERS it will return
   * duplicate request error.
   */
  public resetIdempotency() {
    Parse.CoreManager.set('REQUEST_HEADERS', {
      'X-Parse-Request-Id': '',
    });
  }

  /**
   * This function is used to set the X-Parse-Request-Id header to a
   * user-provided value. This is used to avoid idempotency issues.
   * @param value The value idempotency uid.
   */
  private setIdempotency(value: string) {
    Parse.CoreManager.set('REQUEST_HEADERS', { 'X-Parse-Request-Id': value });
  }
}
