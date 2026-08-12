import { test, expect } from '@playwright/test';

test('simple get request @getTest', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response).toBeOK();

    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(200);
    console.log("First Element:", responseObject[0]);
});

test('simple post request @postTest', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking',{
          data:{
            "firstname" : "Sahil",
            "lastname" : "Agashe",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-08-12",
                "checkout" : "2019-08-20"
            },
            "additionalneeds" : "Breakfast"
        }
    });
    
    expect(response).toBeOK();

    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(200);
    expect(responseObject.booking.firstname).toEqual("Sahil");
});