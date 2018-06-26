import { BaseError } from 'make-error';

// tslint:disable-next-line:no-class
export default class SignatureMismatchError extends BaseError {
  constructor(public actualSignature: number, public expectedSignature: number) {
    super();
  }
}
