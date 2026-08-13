import {test,expect} from '@playwright/test';
import fs from 'fs';

test('get request with query parameter @getWithQueryParameter', async ({request}) => {

    //create booking to get booking 
    const jsonFile = 'testdata/post-request-data.json';
    const requestData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    
    
    const postresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: requestData
    });
    
    expect(postresponse).toBeOK();

    // query parameters
    const  firstname = 'Abhi';
    const lastname = 'Aher';

    const response = await request.get('https://restful-booker.herokuapp.com/booking/', {
                                            params: {
                                                firstname,
                                                lastname
                                            }
                            });   
    
    expect(response).toBeOK();
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    console.log(responseBody.length);

    expect(responseBody.length).toBeGreaterThan(0);

    for(const items of responseBody){
        expect(items).toHaveProperty('bookingid');
        expect(items.bookingid).toBeGreaterThan(0);
        expect(typeof items.bookingid).toBe('number');
    }
});