/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

/** # SCHEMAS and MODELS #
/*  ====================== */

/** 2) Create a 'Person' Model */
let Schema = mongoose.Schema;

let personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

/** # [C]RUD part I - CREATE #
/*  ========================== */

/** 3) Create and Save a Person */
let createAndSavePerson = function(done) {
  const person = new Person({name: "Joe", age: 15, favoriteFoods: ['burger', 'cola']});
  person.save((err, data) => err ? done(err) : done(null, data))

};

/** 4) Create many People with `Model.create()` */
let createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data));
    };

/** # C[R]UD part II - READ #
/*  ========================= */

/** 5) Use `Model.find()` */
let findPeopleByName = function(personName, done) {
  Person.find({name: personName}, (err, data) => err ? done(err) : done(null, data));  
};

/** 6) Use `Model.findOne()` */
let findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, (err, data) => err ? done(err) : done(null, data));
};

/** 7) Use `Model.findById()` */
let findPersonById = function(personId, done) {
  Person.findById({_id: personId}, (err, data) => err ? done(err) : done(null, data));
};

/** # CR[U]D part III - UPDATE # 
/*  ============================ */

/** 8) Classic Update : Find, Edit then Save */
let findEditThenSave = function(personId, done) {
  let foodToAdd = 'hamburger';
  Person.findById(personId, (err, data) => {
    if(err) {
      done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => err ? done(err) : done(null, data));
  });             
};

/** 9) New Update : Use `findOneAndUpdate()` */
let findAndUpdate = function(personName, done) {
  let ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet},
    {new: true},
    (err, data) => err ? done(err) : done(null, data)
  )
};

/** # CRU[D] part IV - DELETE #
/*  =========================== */

/** 10) Delete one Person */
let removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));  
};

/** 11) Delete many People */
let removeManyPeople = function(done) {
  let nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => err ? done(err) : done(null, data));
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */

let queryChain = function(done) {
  let foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => err ? done(err) : done(null, data))  
};


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
