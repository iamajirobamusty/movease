import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    _id: UUID,
    userName: string,
    email: string,
    password: string
})

export const driverSchema = new mongoose.Schema({
    _id: UUID,
    userName: string,
    email: string,
    password: string,
    plateNumber: UUID,
})

export const adminSchema = new mongoose.Schema({
    _id: UUID,
    username: string,
    email: string,
    password: string,
})