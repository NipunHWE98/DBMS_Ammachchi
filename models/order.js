const db = require('../util/database');

module.exports = class Order {
    constructor( order_id, order_place_time,order_pickup_time,cus_id,charge,date) {
      this.order_id=  order_id;
      this.order_place_time = order_place_time;
      this.order_pickup_time = order_pickup_time;
      this.cus_id=cus_id;
      this.charge=charge;
      this.date=date;

    }
    
  
    addOrder() {
        console.log("function order added");
      return db.execute(
        
        
        'INSERT INTO order_table (Order_Placed_Time, Order_Pickup_Time,customer_ID,Charge,Date) VALUES (?, ?, ?, ?,?)',
        [this.order_place_time, this.order_pickup_time, this.cus_id, this.charge,this.date]
      );
    }
    static getOrderID(){
        return db.execute('SELECT MAX(ID) as ID FROM order_table');
    };

    addFoodOrder(order_ID,food_ID,quantity,Employee_ID) {
      console.log("function called");
      return db.execute(
        'INSERT INTO order_food_item_table( order_table_ID,customer_ID, food_item_ID,Employee_Ssn,Quantity) VALUES (?, ?, ?, ?,?)',
        [order_ID,this.cus_id,food_ID,Employee_ID, quantity]
      );
    };

  };
  