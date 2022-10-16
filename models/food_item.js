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
    console.log(this.name);
    console.log(this.imageUrl);
    console.log(this.description);
    console.log(this.price);
    console.log(this.availability);
    console.log(this.employeeSsn);
    return db.execute(
      'INSERT INTO food_item_table (Name, Price, Image, Discription,Employee_Ssn,Availability) VALUES (?, ?, ?, ?,?,?)',
      [this.name, this.price, this.imageUrl, this.description,this.employeeSsn,this.availability]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM food_item_table');
  }

  static findById(id) {
    return db.execute('SELECT * FROM food_item_table WHERE products.id = ?', [id]);
  }
};
