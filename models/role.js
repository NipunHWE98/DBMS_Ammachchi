const db = require('../util/database');



module.exports = class Employee {
  constructor( employee_ssn, role) {
    this.employee_ssn= employee_ssn;
    this.role = role;

  }

  save() {
    
    return db.execute(
      'INSERT INTO role_table (Employee_Ssn,Role) VALUES (?, ?)',
      [this.employee_ssn, this.role]
    );
  }
  
  update(id){

    return db.execute('UPDATE role_table SET Role=? WHERE Employee_Ssn=?',
    [this.role,this.employee_ssn]);
  }

  static deleteById(id) {
    return db.execute('DELETE from role_table WHERE Employee_Ssn=?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM role_table');
  }

  static findById(id) {
    return db.execute('SELECT * FROM role_table WHERE role_table.Employee_Ssn = ?', [id]);
  }
};