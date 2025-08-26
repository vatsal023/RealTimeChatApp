const {User} = require("../models/userModel");

const peopleController = async(req,res) =>{
    const users = await User.find({verified:true})

    res.json(user);
    //console.log(users);
}

module.exports = peopleController;