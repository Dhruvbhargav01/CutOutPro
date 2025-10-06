// Clerk is your authentication service (manages sign up, login, users).
// But Clerk stores users in its own system, not directly in your MongoDB database.

// 👉 So you need a bridge between Clerk and your database. That’s what this webhook controller is doing.

import {Webhook} from 'svix';
import userModel from '../models/userModel.js';

// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try {
        //create a Svix instance with your Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"] 
        })

        const {data, type} = req.body;

        switch(type){
            case "user.created": {
                
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.create(userData);
                res.json({});

                break;
            }

            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.findOneAndUpdate({clerkId: data.id},userData);
                res.json({});
                break;
            }

            case "user.deleted": {

                await userModel.findOneAndDelete({clerkId: data.id});
                res.json({});
                break;
            }

            default:{
                break;
            }
        }
    } catch (error) {
        coonsole.log(error.message);
        res.json({success: false, message: error.message});
    }    
}

export {clerkWebhooks};