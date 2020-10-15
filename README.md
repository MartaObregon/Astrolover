# Astrolover
## Description



A dating social platform based on astrology and a complex algorythm that determines best potential lovers for its cosmic users. 

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **LandingPage** - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account.
- **RegisterPage** - As a user I want to sign up with my full information so that I can safely share my information and status with others.
- **Dashboard-home** - As a user I want to be able to access my daily Horoscope advice and preview my own profile info that other users will see.
- **dashboard-edit** - After the sign up, and whenever the user wants to edit its own public information, the user will have access to edit it on the home page.
- **dashboard-myPotentials** - As a user I want to have access to a suggested list of   other users profiles that fit the Astrolover algorithm criteria.
- **dashboard-datelog** - As a user I want to have access to the interactions with other users, both sent and received. As well I want to have access to the Skype ID after a match is made.
- **otherUser-profile** - As a user I want to have access to the public information about the user I am interested on, as well to have the option of requesting a date.


## ROUTES:

- GET / 
  - renders the logIn.hbs
  - redirects to /dashboard/home if user logged in
  - redirects to /auth/register if user wants to sign up
  
- POST /auth/login
    - redirects to /:id/dashboard if user logged in
    - body:
      - username
      - password
  
- GET /auth/register
  - renders the register-form.hbs 
  - redirects to /:id/dashboard/edit if user has registered for first time
 
- POST /auth/register
  - redirects to / if user has registered
  - body:
    - username
    - email
    - password
    
-GET /dashboard/:id/edit
  -render edit-form.hbs with full public information of the user
  -redirects to /dashboard/home if user saved changes
  - redirects to / if user logs out
  
  
-POST /dashboard/:id/edit
  -redirects to /dashboard/home if user saved changes
  - body:
    -date of birth
    -gender
    -phone number
    -city
    -Catchphrase
    -profile picture
    -SkypeID
    
-GET /dashboard/:id/home
 -renders dashboard-home.hbs
 -redirects to /dashboard/:id/edit if user wants to edit public info
 -redirects to /dashboard/:id/potentials if user wants to see other users
 -redirects to /dashboard/:id/activity if user wants to see interactions with users and matched users contacts details.
 - redirects to / if user logs out
 
-GET /dashboard/:id/potentials
  renders dashboard-potentials.hbs
  -redirects to /profile/:id if users want to go to other users profiles
  - redirects to /dashboard/:id/datelog
  -redirect to /dashboard/:id/home
  - redirects to / if user logs out
  
 -GET /dashboard/:id/datelog
  renders dashboard-datelog.hbs
  -redirects to /profile/:id if users want to go to other users profiles that requested invitation to 
  - redirects to /dashboard/:id/potentials
  -redirect to /dashboard/:id/home
  - redirects to / if user logs out
    
 -GET /profile/:id
  - renders profile-user.hbs
  - redirects to /dashboard/:id/datelog
  - redirects to /dashboard/:id/potentials
   -redirect to /dashboard/:id/home
   - redirects to / if user logs out
    
## Models

User model
 
```
username: {type:String, required:true, unique:true}
password: {type:string, required:true}
email: {type:string, required:true, unique:true}
Horoscope: {enum:[“Aries”, “Taurus”, “Gemini”, “Cancer”, “Leo”, “Virgo”, “Libra”, “Sagitarius”, “Scorpio”, “Aquarius”, ”Piscis”, “Capricorn”], type:string, required:true}
Age: {type:number}
Profile-img{type:string, required:true}
pictures:{[type:string]}
catchphrase:{type:string, required:true, maxLength:100}
city:{type:string}
SkypeId:{type:string, required:true}
horoscopeMatches:{enum:[“Aries”, “Taurus”, “Gemini”, “Cancer”, “Leo”, “Virgo”, “Libra”, “Sagitarius”, “Scorpio”, “Aquarius”, ”Piscis”, “Capricorn”], type:string, maxItems:3}

```

Event model

```
status:{enum:[pending, accepted, declined], type:string}
senderId:{type:string, unique:true}
receiverId:{type:string, unique:true}
message:{type:string}
``` 

## Backlog

List of other features outside of the MVPs scope

Chat
-create a chat
-saved the chat in the database

Geo Location:
- add geolocation 
- show only users in the same area




## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

    


 
