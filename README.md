# Getting Started

## HandRaiser

Hard coded app made of JS React components built by 5 developers namely, Vincent Serra (Backend: Main App Features), Marcial Norte (Backend: Main App Features), Mark Jowen Medes (Frontend and Websockets), Vanessa Dulva(Frontend), Francisco Ifurung(Team Leader). This app contains two users and one admin. Those two users can be classified as Mentor and Students who interact with each other through real-time handraising and chat. This app is purely handraising system with features that are used by all users for their convenience. This app is very convenient in Classes with a large amount of students which help normalize the crowd content and discipline the students in waiting for their turn.

## Main Features

**Mentors** is the one whose making the classes for the students. Each classes have their individual `List of Students` that were already enrolled in the class they created but before they enter the specific class, each student must enroll first and then the mentor will receive a request on the student list which gives the mentor two options, `accept` or `decline` the student to the class. These classes has `names`, `descriptions` and `start and end dates` which is also managed by the mentor. The class created can be `edited`, `toggled on and off` and can be `deleted`. Once the student raised his hand by clicking the `hand raiser` button and entering his `concern`, the student will now be in the **Queue**. The students from the queue can be deleted by the mentor regardless of their position on the queue but if it's the student's turn, the mentor should help with the concern of the student being helped. 

The classes created by the mentor can be seen in the page of the **Students** if the class is on or not deleted on the day they enter their accounts. The students can ``enroll`` to the class and wait for the mentor's confirmation. Once accepted, the Student can now enter the class and give a ``handraise`` to the mentor who created the app. The Student who hand raise with their concerns will be inserted in the ``queue list`` of that class. Now that the Student is already in the list, he/she can delete himself from the queue maybe for a reason that he already got the solution to his problem but if not, the Student will patiently wait until it is his trun to be assisted by the mentor.

>Students who are already helped by the mentor will go to the **Resolved List**. This list can be viewed in both users.

**Admin** manages the users. On the first stage of this app, the user will login using his [Gmail](https://www.gmail.com/) boom.camp account then the admin will receive a **Login Request** from the user. The admin chooses if the user is a ``mentor`` or a ``student``. Once selected and determined the user type, the mentor will send a ``key`` to the user's Gmail. Once the user receives a verification key, he will copy the code and paste it on the text field of the **Verification Page** where he was redirected after he logs in his google account. The key sent to the user is also visible on the admin page on **Pending Accounts** so that if the user didn't receive the verification key, he will contact the admin to ask for the key instead.

## Special Cases
1. If the **Admin** changes the type of the user from ``mentor`` to ``student``, all classes that were made by that mentor will be automatically ``deleted``, as well as the **Class List** of students who enrolled on each classes and the **Chat**.

2. Once the student is ``enrolled`` in tha class and raise his hand regarding his ``concern``, the mentor can still kick his student out of the class by ``deleting`` the student on the student list of that class. Even if the student is already on being helped, the mentor can still remove the student from the class.

3. When the student is already in the ``queue`` and waiting for his turn to be helped by the mentor but somehow ``log out`` of his account, the student will be deleted on the queue. This is also applied even when the student is already being helped by the mentor.

## Individual Powers
1. The admin can delete a user regardless of its type;
2. The mentor can remove/kick the student out of the class regardless of the student's activity inside the class.

## Added Features
1. Real time chat of student inside the class and private messages of mentor to student.
2. Search Bars in all type of user.

# Prerequisites

Technologies to Install:
- NodeJS
- Docker
- Express.js

# Installing

just npm i to the root directory and also in g1-handraiser folder.

# Built With
 - [ReactJS](https://reactjs.org/) - framework
 - [Git](https://git-scm.com/) - version control system
 - [VSCode](https://code.visualstudio.com/) - code editor
 - [nodemon](https://www.npmjs.com/package/nodemon) - tool used for this node.js app
 - [sqltabs](https://www.sqltabs.com/) - app used for DB
 - [PostgreSQL](https://www.postgresql.org/) - Object-relational DB
 - [MaterialUI](https://material-ui.com/) && [AntD](https://ant.design/) - for app's UI

# How to Run App

Create .env file outside the g1-develop folder and copy this code

``URL=http://localhost:3000
REACT_APP_DB_URL=http://localhost:3001
SECRET_KEY= 5up324pp11c4710n53c237
DB_HOST=localhost
PORT=5432
PASSWORD=handraiser
DATABASE=handraiser
USERS=postgres
GMAIL_ADDRESS=francisco.ifurung@boom.camp
GMAIL_OAUTH_CLIENT_ID=566271695022-1rj2dmbkbcfpadha1fl6k67sgakp108o.apps.googleusercontent.com
GMAIL_OAUTH_CLIENT_SECRET=q67l_hVOwZknGmfUD55xtR_V
GMAIL_OAUTH_REDIRECT_URL=http://localhost:3001/getAccessToken
SCOPES=https://mail.google.com/
ADMIN_PASS=$argon2i$v=19$m=4096,t=3,p=1$EVt46nPZxtymXqH0MVDyzw$KAqBF4KOhOSwANfhUb8xR0RMIm8/OPiR9Oy/Pc4TRQw``

Create another .env file inside the g1-handraiser folder and copy this code

``REACT_APP_DB_URL=http://localhost:3001
REACT_APP_CLIENT_ID = 566271695022-d3jfkv7cmqq6c6unto7bvb7q2osl7hii.apps.googleusercontent.com``