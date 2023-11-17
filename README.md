# api-event-apps (authenticate + authorization - express.js + sequalize)

- Login and Register Admin and User
- Admin can do create, update, and delete event
- User can see list events
- User can change password
- User can update profile
- User can delete profile
- User can request forgot password and the system will reset the password trough nodemailder

Libraries used:

- Express
- Sequelize (MySQL2)
- Joi
- Cors
- dotenv
- bcyrpt
- nodemailer-express-handlebars
- handlebars
- jsonwebtoken

---

## Run the server

To run the server, use the following command:

```
npm run dev
```

Make sure to have MySQL running on port 3306

## URL

_Server_

```
http://localhost:3000
```

---

## Global Response

_Response (404)_

```
{
  "message": "API Not Found"
}
```

---

## RESTful Endpoints
---

## Admin Endpoints
## POST /api/admin/create

> Create new admin

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "<name>",
  "email": "<email>",
  "password": "<password>"
}
```

_Response (201)_

```
{  
    "message": "Admin berhasil dibuat",
    "data": { <admin_data> }
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

_Response (400)_

```
{
    message: 'Email sudah digunakan.',
}
```
_Response (400)_ - Joi Validation Error
```
{
    "message": "email is required"
}
```

## POST /api/admin/login
> Login admin

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email>",
  "password": "<password>"
}
```
_Response (201)_

```
{  
    "message": "Login successful",
    "token": "<jwt_token>"
}

```
_Response (401)_

```
{
    message: 'Invalid email or password',
}
```
_Response (400)_ - Joi Validation Error
```
{
    "message": "email is required"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```
---

## User Endpoints
## POST /api/user/register

> Register User

_Request Header_
```
not needed
```

_Request Body_

```
{
  "email": "<email>",
  "password": "<password>",
  "firstName": "<firstName>",
  "lastName": "<lastName>",
  "address": "<address>",
  "phoneNumber": "<phoneNumber>"
}
```
_Response (201)_

```
{  
    "message": "User berhasil dibuat",
    "data": { <user_data> }
}
```
_Response (400)_ - Joi Validation Error
```
{
    "message": "email is required"
}
```
_Response (400)_
```
{
    "message": "Email sudah digunakan"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```
## POST /api/user/login
> Login User

_Request Header_
```
not needed
```

_Request Body_

```
{
  "email": "<email>",
  "password": "<password>"
}
```
_Response (201)_

```
{
  "message": "Login successful",
  "token": "<jwt_token>"
}
```
_Response (400)_ - Joi Validation Error
```
{
    "message": "email is required"
}
```
_Response (401)_
```
{
    "message": "Invalid email or password"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

## PUT /api/user/change-password
> Change Password User

_Request Header_
```
Authorization: Bearer <jwt_token>
```

_Request Body_

```
{
   "oldPassword": "<old_password>",
    "newPassword": "<new_password>"
}
```
_Response (200)_

```
{
  "message": "Password changed successfully",
}
```  
_Response (400)_ - Joi Validation Error
```
{
    "message": "oldpassword is required"
}
```
_Response (404)_ 
```
{
    "message": "User not found"
}
```
_Response (400)_ 
```
{
    "message": "Invalid email or password"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

## POST /api/user/forgot-password
> Forgot password user

_Request Header_
```
not needed
```

_Request Body_

```
{
  "email": "<email>",
}
```
_Response (200)_

```
{
  "message": "Email with new password has been sent.",
}
``` 
_Response (400)_ - Joi Validation Error
```
{
    "message": "email is required"
}
```
_Response (404)_
```
{
    "message": "User not found"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

## DELETE /api/user/delete
> Delete account user

_Request Header_

```
Authorization: Bearer <jwt_token>
```

_Request Body_

```
{
  "email": "<email>",
  "password": "<password>"
}
```
_Response (200)_

```
{
  "message": "User and associated profile deleted successfully",
}
``` 
_Response (404)_

```
{
    message: 'User Not Found',
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

## Events Endpoints
## GET /api/events
> Get list event

_Request Header_

```
no need
```

_Request Body_

```
no need
```

_Response (200)_

```
{
  "status": "Success",
  "events": [ <event_data> ]
}
``` 

_Response (500)_

```
{
    message: 'Internal server error.',
}
```
## POST /api/events/create
> Create event (admin only)

_Request Header_

```
Authorization: Bearer <jwt_token>
```

_Request Body_

 "title": "<title>",
  "date": "<date>",
  "venueName": "<venue_name>",
  "jumlahTicket": <jumlah_ticket>
```
_Response (200)_

```
{
  "message": "Event successfully created",
  "event": { <event_data> }
}
``` 
_Response (400)_ - Joi Validation Error
```
{
    "message": "title is required"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```
## PUT /api/events/edit/<eventId>
> Edit event (admin only)

_Request Params_

```
/<eventId>
```

_Request Header_

```
Authorization: Bearer <jwt_token>
```

_Request Body_

 "title": "<title>",
  "date": "<date>",
  "venueName": "<venue_name>",
  "jumlahTicket": <jumlah_ticket>
```
_Response (200)_

```
{
  "message": "Event successfully updated",
  "event": { <event_data> }
}
``` 
_Response (400)_ - Joi Validation Error
```
{
    "message": "title is required"
}
```
_Response (400)_ 
```
{
    "message": "Event not found"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```
## DELETE /api/events/delete/<eventId>
> Delete event (admin only)

_Request Params_

```
/<eventId>
```

_Request Header_

```
Authorization: Bearer <jwt_token>
```

_Request Body_

```
no need
```
_Response (200)_

```
{
  "message": "Event successfully deleted",
}
``` 
_Response (400)_ 
```
{
    "message": "Event not found"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```

## Events Endpoints
## GET /api/profile/

_Request Header_
```
Authorization: Bearer <jwt_token>
```

_Request Body_

```
no need
```
_Response (404)_ 
```
{
    "profile": <data_profile>,
    "status": "message"
}
```
_Response (404)_ 
```
{
    "message": "Profile not found"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```  
## PUT /api/profile/edit
> Edit profile

 _Request Header_

```
Authorization: Bearer <jwt_token>
```

_Request Body_

```
  "firstName": "<first_name>",
  "lastName": "<last_name>",
  "address": "<address>",
  "phoneNumber": "<phone_number>"
```
_Response (200)_

```
{
  "message": "Profile updated successfully",
  "response": { <profile_data> }
}
``` 
_Response (400)_ - Joi Validation Error
```
{
    "message": "firtName is required"
}
```
_Response (404)_ - Joi Validation Error
```
{
    "message": "User not found"
}
```
_Response (500)_

```
{
    message: 'Internal server error.',
}
```
