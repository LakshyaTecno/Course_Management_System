const User = require('../models/userSchema')
const objectConverter = require('../utils/objectConverter')
const bcrypt = require('bcryptjs');
const constants = require('../utils/constants');

exports.findAll = async (req,res)=>{

    const queryObj = {};
    const userTypeQP = req.query.role;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){
        queryObj.role = userTypeQP
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP
    }

    try{
        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.multipleUserResponse(users));

    }catch(err){
        console.log("#### Error while fetching all user's data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while fetching data"
        })
    }
}

exports.findByUserId = async (req,res)=>{
    try{
        const user = req.userInParams;

        res.status(200).send(objectConverter.singleUserResponse(user));

    }catch(err){
        console.log("#### Error while searching for the user #### ", err.message);
        res.status(500).send({
            message : "Internal server error while fetching data"
        })
    }
}

exports.updateUser = async (req,res)=>{
    try{

        const user = req.userInParams;
        console.log(req.body.userStatus)

        user.name = req.body.name ? req.body.name : user.name
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password
        user.email = req.body.email ? req.body.email : user.email

        if(req.user.role == constants.roles.superAdmin){
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
            user.role = req.body.role != undefined ? req.body.role : user.role
        }
        
        console.log(user)

        const updatedUser = await user.save();


        console.log(`#### ${updatedUser.role} ${updatedUser.name} data updated ####`);
        res.status(200).send(objectConverter.singleUserResponse(updatedUser));

    }catch(err){
        console.log("#### Error while updating user data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating user data"
        });
    }
}