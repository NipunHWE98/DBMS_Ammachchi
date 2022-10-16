const db = require('../util/database');



module.exports = class Employee {
  constructor( employee_ssn, first_name, last_name, email,contact_no) {
    this.employee_ssn= employee_ssn;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_no=contact_no;
  }

  save() {
    
    return db.execute(
      'INSERT INTO employee_table (First_Name, Last_Name, Email,Contact_No) VALUES (?, ?, ?, ?)',
      [this.first_name, this.last_name, this.email, this.contact_no]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM employee_table');
  }

  static findById(id) {
    return db.execute('SELECT * FROM employee_table WHERE products.id = ?', [id]);
  }
};
