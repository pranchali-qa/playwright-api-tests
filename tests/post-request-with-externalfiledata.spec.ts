import { test,expect } from '@playwright/test';
import fs from 'fs';

test('post request with external file json format data @postByExternalData', async ({request}) => {

    // read data from json
    const jsonFile = 'testdata/post-request-data.json';
    const requestData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));


    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: requestData
    });

    expect(response).toBeOK();

    const responseObject = await response.json();

    expect(response.status()).toBe(200);
    expect(responseObject).toHaveProperty('booking');
    expect(responseObject).toHaveProperty('bookingid');

    // error  TypeError: bookingData.toMatchObject is not a function solve

    const bookingData = responseObject.booking;
    expect(bookingData).toMatchObject({
        firstname: requestData.firstname,
        lastname: requestData.lastname,
        totalprice: requestData.totalprice,
        depositpaid: requestData.depositpaid,
        additionalneeds: requestData.additionalneeds
    });

    expect(bookingData.bookingdates).toMatchObject({
        checkin: requestData.bookingdates.checkin,
        checkout: requestData.bookingdates.checkout
    });
});