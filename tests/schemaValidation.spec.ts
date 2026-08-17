import {test,expect} from '@playwright/test';
import Ajv from 'ajv';
import fs from 'fs';

test('schema validation test', async ({request}) => {

  const response = await request.get('https://mocktarget.apigee.net/json');
  const response_body = await response.json();
  console.log(response_body);

  const ajv = new Ajv();
  const validate=ajv.compile(schema);
  const isValid = validate(response_body);
  expect(isValid).toBeTruthy();
});
