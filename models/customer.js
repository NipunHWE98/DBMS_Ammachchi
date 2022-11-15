const db = require('../util/database');



module.exports = class Customer {
  constructor( id, first_name, last_name, email,contact_no,password) {
    this.id=  id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_no=contact_no;
    this.password=password;
  }

  save() {
    
    return db.execute(
      'INSERT INTO customer (First_Name, Last_Name, Email,Contact_No,Password) VALUES (?, ?, ?,?,?)',
      [this.first_name, this.last_name, this.email, this.contact_no,this.password]
    );
  }
  
  update(id){

    return db.execute('UPDATE customer SET First_Name=?,Last_Name=?,Email=?,Contact_No=? WHERE ID=?',
    [this.first_name,this.last_name,this.email,this.contact_no,this.employee_ssn]);
  }

  static deleteById(id) {
    return db.execute('DELETE from Customer WHERE ID=?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM customer');
  }

  static findById(id) {
    return db.execute('SELECT * FROM customer WHERE customer.ID = ?', [id]);
  }
  
};
