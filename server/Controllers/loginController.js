const User = require("../models/userModel");
const {validateLogin} = require("../Validation/auth.js")

async function loginController(req,res){
    try{
        const {error} = validateLogin(req.body);

        if(error){
            return res.status(400).send({message:error.details[0].message});
        }

        //Find the user by email
        const user = await User.findOne({email:req.body.email});
        
        if(!user){
            return res.status(401).send({message:"Invalid Email"});
        }
        
        //Check password validity using bcrypt
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(401).send({message:"Invalid Password"});
        }

        //Check if the user's email is verified
        if(!user.verified){
            return res.status(400).send({message:"User doesn't exist"});
        }


    }catch(error){
        console.error("Error in loginController:",error);
        res.status(500).send({message:"Internal Server Error"});
    }
}

module.exports = loginController;