# Overlook Hotel
<img width="1253" alt="overlook-heropage" src="https://user-images.githubusercontent.com/97044701/166574478-f0fe017d-cb8a-4098-b7df-4148e4794817.png">




#### Getting Started
1. Clone the repo from github.
2. Cd into the directory from your terminal and install the project dependencies:
- Run `npm install` or `npm i` in the terminal
3. To see the HTML page:
- Run `npm start` in the terminal
- Press `ctrl/cmd + c` to exit
4. Copy the local host address from your terminal and add to your web browser to see the HTML page
5. To see the tests:
- Run `npm test` in the terminal

#### To run the server used, locally, please clone and [follow the instructions from this repo](https://github.com/turingschool-examples/overlook-api).
6. Once cloned, open up a seperate `terminal`, go to the API repo and do the following:
    - Run `npm install`
    - Run `npm start`
7. Your server should be ready! Test it by picking any of the given end-points.

### Table of Contents
- [About the Project](#about-the-project)
- [Contributors](#contributors)
- [Technologies Used](#technologies-used)
- [Instructions on Use](#instructions-on-use)
- [Demo of Features](#demo-of-features)
- [Challenges and Wins](#challenges-and-wins)
- [Project Overview and Goals](#project-overview-and-goals)
- [Future Additons](#future-additons)
- [Deployable](#deployable)

#### About the Project
Welcome to Overlook hotel, where the sights are sightful and rooms are plenty! Book your hotel stay with us. You'll love it here. With an easy to use booking system, you can keep track of your stays and even book for a future getaway. There is so much to explore, to get started login as either a *customer* or *manager*. As a customer you can book future stays, see all your bookings, and total cost. As a manager you can delete future bookings for customers and see various hotel stats. 

This was part of the Turing School of Software and Design project curriculum. We were given 1 week to develop a hotel booking application using only vanilla JS and using Test Driven Development. The project spec can be found [here](https://frontend.turing.edu/projects/overlook.html).

#### Contributors
 - [Kal Al-Rajhi](https://github.com/kal-aalrajhi)

#### Technologies Used
- Javascript
- HTML
- CSS
- Mocha
- Chai
- Webpack
- Fetch API
- WAI-ARIA
- Lighthouse
- Sweetalert2

#### Instructions on Use

This app has a fully working login system that saves all the customers bookings and general information. The landing page serves as the login page, you can do the following once you're logged in:

- Customer:
    - Login using the following:
        - Username: *customer50* (you can append any number between 1-50 after *customer* to login as a different customer)
        - Password: *overlook2021*
    - *Customers* will be taken to their dashboard where they are greeted by a custom message. They can see all their bookings and total cost of bookings. Also, *customers* are able to filter their bookings by time lines as well. *Customers* can also book a stay any of the fine 25 rooms available. Depending on the date picked, they'll be shown which rooms are available and details about each room. Once they decide on a room to book, all they have to do is click to book and the dashboard will automatically be updated. Once done, *customers* have the option to logout via the home view.


- Manager: 
    - Login using the following:
        - Username: *manager* 
        - Password: *overlook2021*
    - When a *manager* log in, they will be taken to their own unique dashboard which displays the day's stats and allows the manager to search for a customer. On display are the rooms available, rooms occupied, and total revenue. When searching for a customer, by name, the *manager* will see all the rooms they've booked and how much they've spent on bookings. 

- Finally, either *customer* or *manager* can logout without haveing to refresh the screen.

- Error handling has been implemented to account for Fetch/API errors and user errors. Errors are displayed in the console and relevant errors are displayed to the user through the DOM. The user is guided through constant messages and nudges to make the user experience easy and seamless.  

#### Demo of Features

1. Upon loading the website, you can login as a customer

![Login](https://media.giphy.com/media/DBD4f3ZAzdq1TvR4eG/giphy.gif)

2. View your bookings

![View Bookings](https://media.giphy.com/media/SRhSB7ss7Axgd5TtTI/giphy.gif)

3. Book a room

![Book](https://media.giphy.com/media/t7fSJxujhPNy0tLPTz/giphy.gif)

4. Filter rooms to book

![Filter bookings](https://media.giphy.com/media/VcG6kv6LZwZar4WZxL/giphy.gif)

5. Login as a manager and view stats or a customer's bookinks

![Manager view](https://media.giphy.com/media/D07r9vu1WTigVSNp8p/giphy.gif)

6. You can delete bookings for users

![Delete bookings](https://media.giphy.com/media/J4AhOo0gvAV80fcLkN/giphy.gif)

7. You can add bookings for users

![Manger add](https://media.giphy.com/media/5sAicwlKXxAv5tsjsV/giphy.gif)

And be sure to explore our other features!

#### Challenges and Wins

##### Challenges
- Perfectly timing fetch and asynchronous methods so that the data and UI sync up correctly.
##### Wins
- Making sure the website is fully accessable so that any user type should be able to, login, book and delete without issue. 

#### Project Overview And Goals
- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Use TDD to develop classes and core functionality
- Create a robust test suite that thoroughly tests all functionality of a client-side application
- Develop an application with two different user types with access to different functionality (customer and manager)

#### Future Additions
- Allow users to make an account
- Allow managers to delete accounts
- Add room images
- Allow users to book using a date range

#### Deployable
- [Visit Overlook-Hotel](https://kal-aalrajhi.github.io/overlook-hotel/)
[Please visit instructions before using](#instructions-on-use)
