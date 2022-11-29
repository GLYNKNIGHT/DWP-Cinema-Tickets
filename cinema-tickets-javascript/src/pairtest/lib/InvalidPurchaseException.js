export default class InvalidPurchaseException extends Error {


   constructor(message){
    super(message);
    
    this.name = "InvalidPurchaseException"
    
   }
   
 alerts = {
    invalidID : 'Invalid ID',
    overMaxTickets : 'You can not purchase more than 20 tickets'
 }   


}
