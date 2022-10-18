const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Food_item {
  constructor(id, name, imageUrl, description, price,availability,employeeSsn) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.availability=availability;
    this.employeeSsn=employeeSsn;
  }

  save() {
    
    return db.execute(
      'INSERT INTO food_item_table (Name, Price, Image, Discription,Employee_Ssn,Availability) VALUES (?, ?, ?, ?,?,?)',
      [this.name, this.price, this.imageUrl, this.description,this.employeeSsn,this.availability]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM food_item_table WHERE  food_item_table.ID = ?',[id]);
  }
  
  update(id) {
    return db.execute('UPDATE food_item_table SET  Price=?, Name=?, Discription=?,Image=?,Employee_Ssn=? WHERE food_item_table.ID = ?', [this.price,this.name,this.description,this.imageUrl,this.employeeSsn,this.id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM food_item_table');
  }

  static findById(id) {
    return db.execute('SELECT * FROM food_item_table WHERE food_item_table.ID = ?', [id]);
  }
};
