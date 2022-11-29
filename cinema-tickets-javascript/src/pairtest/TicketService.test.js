import {describe, expect, test} from '@jest/globals';
import TicketTypeRequest from './lib/TicketTypeRequest.js';
import TicketService from './TicketService.js';


describe("Test TicketService class", () => {
    
    const TestTicketService = new TicketService();
    let accountId;
    let adultTickets;
    let childTickets;
    let infantTickets;
    
    

    test(
        `No account ID provided, should return an error.`, ()=>  {
         accountId = 0;
         adultTickets = 5;
         childTickets = 3;
         infantTickets = 5;
           expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(`Invalid ID`)
        });


    test(
        `No tickets in the basket, should return an error.`, ()=>  {
         accountId = 1;
         adultTickets = 0;
         childTickets = 0;
         infantTickets = 0;
           expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(`There are no tickets in your basket`)
        });


    test(
        `Request a total of 23 tickets, should return an error.`, ()=>  {
            accountId = 1;
            adultTickets = 15;
            childTickets = 3;
            infantTickets = 5;
            const expectedTotalTicketNumberError = `You can not purchase more than 20 tickets. You have requested 23 tickets.`;
           expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(expectedTotalTicketNumberError)
        });


    test(
        `Request child and infant tickets only, should return error.`, ()=>  {
            accountId = 1;
            adultTickets = 0;
            childTickets = 3;
            infantTickets = 5;
        const expectedNoAdultsError = `Children and Infants must be accompanied by an adult`;
           expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(expectedNoAdultsError)
        });


    test(
        `Request more infant tickeks than adult tickets, should return an error.`, ()=>   {
            accountId = 1;
            adultTickets = 2;
            childTickets = 3;
            infantTickets = 5;
            const expectedAdultToInfantRatioError = `Infants are not allocated their own seats and must sit with an adult, please ensure their there is a least one adult per infant.`
            expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(expectedAdultToInfantRatioError)
        });


    test(
        `Input request with a string insteaed of a number, should return an error.`, ()=>   {
            accountId = 1;
            adultTickets = '2';
            childTickets = 3;
            infantTickets = 5;
            const incorrectInputError = 'noOfTickets must be an integer'
            expect(()=> TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)).toThrow(incorrectInputError)
            });


    test(
        `Provide correct deatils, should compelete the purchase and show correct number of tickets and price.`, ()=>   { 
            accountId = 1;
            adultTickets = 5;
            childTickets = 3;
            infantTickets = 2;
        
            const expectedCompletedResponce = `Purchase completed for 10 tickets at a cost of £ 130`
            const actual = TestTicketService.purchaseTickets(accountId, adultTickets, childTickets, infantTickets)
            expect(actual).toEqual(expectedCompletedResponce)
        });

            
    test(
        `Provide wrong ticket type to TicketTypeRequest, Should return an error.`, ()=>  {
            let type = 'OAP';
            let noOfTickets = 5;
                expect(()=> new TicketTypeRequest(type, noOfTickets)).toThrow('type must be ADULT, CHILD, or INFANT')
        });


})
