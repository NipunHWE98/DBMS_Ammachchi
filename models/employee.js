const db = require('../util/database');



module.exports = class Employee {
  constructor( employee_ssn, first_name, last_name, email,contact_no,user_name,password) {
    this.employee_ssn=  employee_ssn;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_no=contact_no;
    this.user_name=user_name;
    this.password=password;
  }

  save() {
    
    return db.execute(
      'INSERT INTO employee_table (First_Name, Last_Name, Email,Contact_No,User_Name,Password) VALUES (?, ?, ?, ?,?,?)',
      [this.first_name, this.last_name, this.email, this.contact_no,this.user_name,this.password]
    );
  }
  
  update(id){

    return db.execute('UPDATE employee_table SET First_Name=?,Last_Name=?,Email=?,Contact_No=? WHERE Employee_Ssn=?',
    [this.first_name,this.last_name,this.email,this.contact_no,this.employee_ssn]);
  }

  static deleteById(id) {
    return db.execute('DELETE from employee_table WHERE Employee_Ssn=?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM employee_table');
  }

  static findById(id) {
    return db.execute('SELECT * FROM employee_table WHERE employee_table.Employee_Ssn = ?', [id]);
  }
  static findOfferingFood(id){
    return db.execute('SELECT * FROM  employee_table JOIN food_item_table as employee_food  WHERE employee_table.Employee_Ssn=?',[id])
  }
  static employeeLogin(id){
    return db.execute('UPDATE food_item_table SET Availability =? WHERE food_item_table.Employee_Ssn = ?',[1,id])
  }
  static employeeLogout(id){
    return db.execute('UPDATE food_item_table SET Availability =? WHERE food_item_table.Employee_Ssn = ?',[0,id])

  }
  static getFoodItems(id){
    return db.execute('SELECT * FROM employee_table  WHERE employee_table.Employee_Ssn = ?', [id]);

  }
};
