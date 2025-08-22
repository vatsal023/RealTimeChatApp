const {User} = require{"../models/userModel.js"};
const {validateRegister} = require("../Validation/auth.js");

async function registerController(req,res){
    const {firstName,lastName,email,password} = req.body;
    
    try{
        const {error} = validateRegister(req.body)
         
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }

        //Check if user with the given email already exists
        let user = await User.findOne({email});

        if(user && user.verified){
            return res.status(409).send({message:"User with given email already exists"});
        }
        
        if(user && user.verificationLinkSent){
            return res.status(400).send({message:"A verification link has already sent to this email"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password,salt);

        ///save the user with hashed password
        user = await new User({
            ...req.body,password:hashPassword
        }).save();

        const token = setUser(user);
        res.cookie("uid",token);
    }catch(error){
        console.error("Error in registerController:",error);
        res.status(500).send({message:"Internal Server Error"});
    }


};

module.exports = registerController;
