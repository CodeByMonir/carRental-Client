import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "dns";
import { jwt } from "better-auth/plugins";
dns.setDefaultResultOrder("ipv4first");
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("CarServer");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session:{
        cookieCache :{
            enabled:true,
            strategy:'jwt',
            maxAge: 60 * 60 * 24 * 30
        }
    },
    plugins:[
        jwt()
    ],
    database: mongodbAdapter(db, {
        client
    }),
});