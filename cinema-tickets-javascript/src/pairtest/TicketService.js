import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
 

confirmedNumberOfAdultTickets;
confirmedNumberOfChildTickets;
confirmedNumberOfInfantTickets 


#confirmTicketTypes(requestedTickets){

  let adultTickets =  new TicketTypeRequest(...requestedTickets[0]);

    if(adultTickets.getTicketType() === requestedTickets[0][0]){
    this.confirmedNumberOfAdultTickets = adultTickets.getNoOfTickets()
    };

  let childTickets = new TicketTypeRequest(...requestedTickets[1]);

    if(childTickets.getTicketType() === requestedTickets[1][0]){
    this.confirmedNumberOfChildTickets = childTickets.getNoOfTickets()
    };

  let infantTickets  = new TicketTypeRequest(...requestedTickets[2])

    if(infantTickets.getTicketType() === requestedTickets[2][0]){
    this.confirmedNumberOfInfantTickets = infantTickets.getNoOfTickets()
    } 

}


purchaseTickets(accountId, ...ticketTypeRequests) {
  
  if(!accountId || accountId === 0){

    throw new InvalidPurchaseException('Invalid ID')
    
  }
  
  let requestedTickets =[
    ['ADULT', ticketTypeRequests[0]],
    ['CHILD', ticketTypeRequests[1]],
    ['INFANT', ticketTypeRequests[2]]
  ];
  
  this.#confirmTicketTypes(requestedTickets) ;
  
  
  let totalNumberOfTickets = this.#noOfTickets();
  
  let totalPrice = this.#orderCost();
  
  let totalNumberOfSeats = totalNumberOfTickets - this.confirmedNumberOfInfantTickets;


try {
  new TicketPaymentService(accountId, totalPrice);
  new SeatReservationService(accountId, totalNumberOfSeats);
}
catch (error) {
  console.log(error)
}

  
return `Purchase completed for ${totalNumberOfTickets} tickets at a cost of £ ${totalPrice}`;

}




#orderCost(){

    let totalPrice =  ( this.confirmedNumberOfAdultTickets* 20) + (this.confirmedNumberOfChildTickets * 10)
    return totalPrice
}


#noOfTickets(){

      let totaNumberOfTickets = this.confirmedNumberOfAdultTickets + this.confirmedNumberOfChildTickets + this.confirmedNumberOfInfantTickets
      
      if(!totaNumberOfTickets){
        throw new InvalidPurchaseException(`There are no tickets in your basket`);
      }

      if (!this.confirmedNumberOfAdultTickets) {
        throw new InvalidPurchaseException(`Children and Infants must be accompanied by an adult`);
        
      };

      if(this.confirmedNumberOfAdultTickets < this.confirmedNumberOfInfantTickets){
        throw new InvalidPurchaseException(`Infants are not allocated their own seats and must sit with an adult, please ensure their there is a least one adult per infant.`);
      };

      if(totaNumberOfTickets > 20){
        throw new InvalidPurchaseException(`You can not purchase more than 20 tickets. You have requested ${totaNumberOfTickets} tickets.`);
      }

      return totaNumberOfTickets

}






  
}


