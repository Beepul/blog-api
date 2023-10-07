const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})


const Category = mongoose.model('Category', CatSchema);

module.exports = Category;