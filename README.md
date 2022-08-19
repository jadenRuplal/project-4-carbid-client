# CarBid Client

A front end client app for buying cars via bidding or outright purchase

## Installation

## About

The client is where the user interacts with the store. Here is where a user can bid battle others for a specific vehicle with live updates

## Tech

React - single page app
Socket.IO - used to update users actions live on others client side without refreshing the page

## Wireframes

![WIREFRAME](src/resources/images/Wireframe1.png)
![WIREFRAME](src/resources/images/Wireframe2.png)
![WIREFRAME](src/resources/images/Wireframe3.png)

## API

https://github.com/jadenRuplal/project-4-carbid-api

## User Stories

    -As an unregistered user, I would like to sign up and then sign in.
    -As a registered user, I would like to sign in with email and password.
    -As a signed in user, I would like to change password.
    -As a signed in user, I would like to sign out.
    -As an admin, I would like to:
        -Delete messages that people post on listings, that are unacceptable
    -As a signed in user, I would like to purchase products outright using Stripe with react https://github.com/azmenak/react-stripe-checkout.
    -As a signed in user, I would like to see my listings that I have posted
     -As a signed in user, I Would like to:
          - see all posted listings
          - create a listing for others to bid on
          - edit my listings
          - delete my listings for any reason
          - bid against others live
          - see all the listings I have won
          - comment on specific listings
          - delete my comments

    ### Stretch
        -Have a filter
        -potentially two way interaction live
