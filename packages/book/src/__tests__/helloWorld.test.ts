import { main } from '../helloWorld';

/* eslint-disable no-console */

it('says hello', () => {
  const consoleLog = jest.fn();
  console.log = consoleLog;
  main();
  expect(consoleLog.mock.calls[0][0]).toBe('Hello world!');
});
