const Category = require("../models/category");

exports.createCat = async (req,res) => {
    const {name} = req.body;
    try {
        const isExisting = await Category.findOne({name});
        if(isExisting){
            return res.status(401).json({
                message: "This category already exist"
            })
        }else{
            const newCat = await Category.create({name});
            return res.status(200).json({
                message: "sucessfull",
                category: newCat
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}

exports.getAllCat = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Sucessfull",
            categories
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!",
            error: error.message
        })
    }
}