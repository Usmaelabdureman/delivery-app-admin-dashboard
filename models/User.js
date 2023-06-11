import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    username : String,
    email: String,
    password: String
});

const Users = models.users || model('users', userSchema);

export default Users;