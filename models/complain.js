const db = require('../util/database');

module.exports = class Complain {
    constructor( cus_id, name,email,complain) {
      this.cus_id=  cus_id;
      this.name = name;
      this.email = email;
      this.complain=complain;
      this.solved=0;
    }
  
    save() {
        console.log("function called");
      return db.execute(
        'INSERT INTO complain_table (customer_ID, Name, Email_Address,Discription,Solved) VALUES (?, ?, ?, ?,?)',
        [this.cus_id, this.name, this.email, this.complain,this.solved]
      );
    }
    
    update(id){
      return db.execute('UPDATE complain_table SET Discription=? WHERE customer_ID=?',
      [this.complain,this.cus_id]);
    }
  
   
    static fetchAll() {
      return db.execute('SELECT * FROM complain_table');
    }
    static solve(id){
    return db.execute('UPDATE complain_table SET Solved=? WHERE customer_ID=?',
      [1,this.cus_id]);

    }
  
    static findById(id) {
      return db.execute('SELECT * FROM complain_table WHERE complain_table.customer_ID = ?', [id]);
    }
  };
  