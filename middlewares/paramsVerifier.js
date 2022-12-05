const User = require('../models/userSchema')



const userInParams = async (req,res,next)=>{

    try{

        const user = await User.findOne({userId : req.params.id});

        if(!user){
            return res.status(400).send({
                message : "userId passed dosen't exist"
            })
        }
        req.userInParams = user;
        next();
        
    }catch(err){
        console.log("#### Error while reading the user info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }
}

const validateIdInParams = {
    userInParams
}

    

module.exports = validateIdInParams