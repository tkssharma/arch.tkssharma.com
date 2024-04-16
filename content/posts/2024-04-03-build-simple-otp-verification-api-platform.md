---
date: 2024-04-03
title: 'Build Simple OTP verification Platform in Node JS'
shortTitle: 'Build Simple OTP verification Platform in Node JS'
description: 'Build Simple OTP verification Platform in Node JS'
template: post
featuredImage: '../thumbnails/nodejs.png'
thumbnail: '../thumbnails/nodejs.png'
slug: build-otp-verification-platform-in-nodejs
categories:
  - nodejs
  - security
  - aws
tags:
  - nodejs
  - security
  - aws
---


In today’s digital world, security is paramount. One common method to enhance security, especially in user authentication processes, is One-Time Password (OTP) verification. OTP adds an extra layer of security by generating a unique code that users must enter alongside their credentials. In this tutorial, we’ll walk through the process of building an OTP verification system using Node.js and MongoDB, step by step.

![](../images/otp.jpeg)

Prerequisites: Before we dive into the implementation, make sure you have the following installed:

*   Node.js: Make sure you have Node.js installed on your system. You can download it from the official Node.js website.
*   MongoDB: Install MongoDB to store user data and OTP information. You can download it from the official MongoDB website.
*   Text Editor: Choose a text editor or IDE of your choice. VS Code, Sublime Text, or Atom are popular choices.

Setting Up the Project: Let’s start by setting up our project directory and installing the necessary dependencies. Open your terminal and follow these steps:

1.  Create a new directory for your project:

mkdir otp-verification-system  
cd otp-verification-system

Initialize a new Node.js project:

npm init -y

Install required dependencies:

npm install express mongoose twilio dotenv body\-parser

*   `express`: For creating the web server.
*   `mongoose`: For interacting with MongoDB.
*   `twilio`: To send OTP via SMS.
*   `dotenv`: For managing environment variables.
*   `body-parser`: Middleware for parsing incoming request bodies.

Now that we have our project set up, let’s start building our OTP verification system.

Setting Up MongoDB: First, let’s set up our MongoDB database. Create a file named `db.js` in your project directory and add the following code:
```js

const mongoose = require('mongoose');  
  
function connect() {  
  return new Promise((resolve, reject) => {  
    mongoose.connect('mongodb://localhost/otp\_verification', {  
      useNewUrlParser: true,  
      useUnifiedTopology: true,  
    });  
  
    const db = mongoose.connection;  
  
    db.on('error', error => {  
      console.error('MongoDB connection error:', error);  
      reject(error);  
    });  
  
    db.once('open', () => {  
      console.log('Connected to MongoDB');  
      resolve();  
    });  
  });  
}  
  
module.exports = { connect };

```

This code connects to a local MongoDB instance and creates a database named `otp_verification`.

Creating the User Model: Next, let’s create a user model to store user information. Create a file named `models/User.js` and add the following code:

```js
const mongoose = require('mongoose');  
  
const userSchema = new mongoose.Schema({  
  username: String,  
  phone: String,  
  otp: String,  
  otpExpiration: Date,  
});  
  
module.exports = mongoose.model('User', userSchema);

```

This schema defines the structure of our user documents in MongoDB, including fields for username, phone number, OTP, and OTP expiration time.

Generating and Sending OTP: Now, let’s create the logic to generate and send OTP via SMS. We’ll use the Twilio API for this. Create a file named `utils/otp.js` and add the following code:
```js

const twilio = require('twilio');  
const dotenv = require('dotenv');  
  
dotenv.config();  
  
const accountSid = process.env.TWILIO\_ACCOUNT\_SID;  
const authToken = process.env.TWILIO\_AUTH\_TOKEN;  
const client = new twilio(accountSid, authToken);  
  
async function sendOTP(phone, otp) {  
  try {  
    const message = await client.messages.create({  
      body: \`Your OTP is: ${otp}\`,  
      from: process.env.TWILIO\_PHONE\_NUMBER,  
      to: phone,  
    });  
    console.log(\`OTP sent to ${phone}: ${message.sid}\`);  
  } catch (error) {  
    console.error('Error sending OTP:', error);  
  }  
}  
  
module.exports = { sendOTP };

```

Ensure you have set up a Twilio account and obtained the necessary credentials (Account SID, Auth Token, and Phone Number), which should be stored in a `.env` file.

Implementing OTP Verification Endpoint: Now, let’s create an endpoint to handle OTP verification. Create a file named `routes/auth.js` and add the following code:

```js
const express = require('express');  
const router = express.Router();  
const User = require('../models/User');  
const { sendOTP } = require('../utils/otp');  
const {randomInt} = require('crypto')  
  
router.post('/sendotp', async (req, res) => {  
  const { phone } = req.body;  
  
  // Generate a 6-digit OTP  
  //const otp = Math.floor(100000 + Math.random() \* 900000).toString();  
  const otp =  randomInt(100000, 999999);  
  
  try {  
    // Save OTP and its expiration time in the database  
    const user = await User.findOneAndUpdate(  
      { phone },  
      { otp, otpExpiration: Date.now() + 600000 }, // OTP expires in 10 minutes  
      { upsert: true, new: true }  
    );  
  
    // Send OTP via SMS  
    await sendOTP(phone, otp);  
  
    res.status(200).json({ success: true, message: 'OTP sent successfully' });  
  } catch (error) {  
    console.error('Error sending OTP:', error);  
    res.status(500).json({ success: false, message: 'Failed to send OTP' });  
  }  
});  
  
router.post('/verifyotp', async (req, res) => {  
  const { phone, otp } = req.body;  
  
  try {  
    // Find user by phone number and OTP  
    const user = await User.findOne({ phone, otp });  
  
    if (!user || user.otpExpiration < Date.now()) {  
      return res.status(400).json({ success: false, message: 'Invalid OTP' });  
    }  
  
    // Clear OTP and expiration time after successful verification  
    user.otp = undefined;  
    user.otpExpiration = undefined;  
    await user.save();  
  
    res.status(200).json({ success: true, message: 'OTP verified successfully' });  
  } catch (error) {  
    console.error('Error verifying OTP:', error);  
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });  
  }  
});  
  
module.exports = router;
```
This code defines two endpoints: `/sendotp` to generate and send OTP, and `/verifyotp` to verify the OTP entered by the user.

Starting the Server: Finally, let’s create the main server file to start our application. Create a file named `server.js` and add the following code:

```js
const express = require('express');  
const bodyParser = require('body-parser');  
const { connect } = require('./db'); // Import the connect function from db.js  
const authRoutes = require('./routes/auth');  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
// Middleware  
app.use(bodyParser.json());  
  
// Routes  
app.use('/auth', authRoutes);  
  
connect()  
  .then(() => {  
    app.listen(PORT, () => {  
      console.log(\`Server is running on port ${PORT}\`);  
    });  
  })  
  .catch(error => {  
    console.error('Error connecting to database:', error);  
  });
```

This code sets up an Express server, parses incoming JSON requests, and defines routes for authentication.

Conclusion: Congratulations! You’ve successfully built an OTP verification system using Node.js and MongoDB. This system adds an extra layer of security to your application by verifying users’ identity through one-time passwords sent via SMS. Feel free to expand upon this system by adding features like email-based OTP verification, rate limiting, or enhancing error handling.