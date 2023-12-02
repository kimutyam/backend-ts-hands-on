import { printError } from '../26_add_error_but/printError';
import { validate } from './validate';

const errors = validate(100, 1);
errors.forEach(printError);
