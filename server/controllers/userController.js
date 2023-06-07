const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role, firstname, lastname, phone, gender) =>{
    return jwt.sign(
        {id, email, role, firstname, lastname, phone, gender}, 
        process.env.SECRET_KEY,
        {expiresIn:"24h"}
        )
}

class UserController {
    async registration(req, res, next) {
        const {email, firstname, lastname, phone, gender, password, role} = req.body
        if(!email || !firstname || !lastname || !gender || !password || !phone){
            return next(ApiError.badRequest('Information is not correct'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('User with that email is registered'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password:hashPassword, firstname, lastname, phone, gender})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.firstname, user.lastname, user.phone, user.gender)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.internal('User with that email is not existed'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Password is wrong'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res, next){
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()