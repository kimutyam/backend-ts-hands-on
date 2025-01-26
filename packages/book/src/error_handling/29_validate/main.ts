import { printError } from '../26_add_error_but/printError.js';
import { validate } from './validate.js';

const errors = validate(100, 1);
errors.forEach(printError);
