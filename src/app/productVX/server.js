var faker = require('faker');
var uuid = require('node-uuid');
module.exports = function() {
  var data = { products: [] }
  for (var i = 1; i < 21; i++) {

    data.products.push({
	uuid : uuid.v4(),
	name : faker.name.findName(),
	photo : "img/" + i + ".jpg",
	difficulty : Math.floor((Math.random() * 12) + 1),
	seedtime : Math.floor((Math.random() * 12) + 1),
	collecttime : Math.floor((Math.random() * 12) + 1)
})
  }
  
  return data
}


 /* {
      // id: i,
      uuid: uuid.v4(), // field type on product.json: uuid
      name: , // field type on product.json: string
      collecttime: Math.floor((Math.random() * 12) + 1), // field type on product.json: upDown(min,max)
      seedtime: Math.floor((Math.random() * 12) + 1), // field type on product.json: upDown(min,max)
      photo: "img/" + i + ".jpg", // field type on product.json: file
      difficulty: Math.floor((Math.random() * 5) + 1) // field type on product.json: upDown(min,max)
    } */
