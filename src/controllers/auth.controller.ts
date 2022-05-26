import { Request, Response } from 'express'

import User, { IUser } from '../models/User.model'

import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response) => {
    try {

        const user: IUser = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        user.password = await user.encryptPassword(user.password);

        const response = await user.save();

        const token: string = jwt.sign({
            _id: response._id
        }, process.env.TOKEN_SECRET || 'secretkey');

        res.header('auth-token', token).json(response)

    } catch (error) {
        throw error
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.status(400).json('Email or password is wrong');

        const correctPassword: boolean = await user.validatePassword(req.body.password);

        if (!correctPassword) return res.status(400).json("Invalid password");

        const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secretkey', {
            expiresIn: 60 * 60 * 24
        })

        res.header('auth-token', token).json(user)

    } catch (error) {
        throw error
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.status(404).json('No user found')

        res.json(user)
    } catch (error) {
        throw error
    }
}

