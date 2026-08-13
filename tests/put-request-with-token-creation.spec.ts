import {test,expect} from '@playwright/test';
import fs from 'fs';
import { readJson } from './utility/utility';

test('put request with query parameter @putWithQueryParameter', async ({request}) => {

    //create booking to get booking 
    const jsonFile = 'testdata/post-request-data.json';
    const postrequestData = readJson(jsonFile);
    
    
    const postresponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: postrequestData
    });
    
    expect(postresponse).toBeOK();
    const postResponseBody = await postresponse.json();
    const postbookingData = postResponseBody.booking;

    expect(postbookingData).toMatchObject({
        firstname: postrequestData.firstname,
        lastname: postrequestData.lastname
    });

    // extracting bookingid from the postresponse body
    const postresponsebody = await postresponse.json();
    const bookingid = postresponsebody.bookingid;

    // create token for put request
    const tokenrequestBody = readJson('testdata/token-request-body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: tokenrequestBody
    })
   
    const tokenBody = await tokenResponse.json();
    const token = tokenBody.token;

    // get put data from json file
    const putData = readJson('testdata/put-request-data.json');

    const putresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
                                            headers:{
                                                "Cookie" : `token=${token}`
                                            },
                                            data: putData,
                                            
                                            });  
    
    expect(putresponse).toBeOK();
    const responseBody = await putresponse.json();

    expect(putresponse.status()).toBe(200);
});