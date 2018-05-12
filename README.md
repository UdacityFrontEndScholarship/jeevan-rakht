[![GitHub issues](https://img.shields.io/github/issues/UdacityFrontEndScholarship/jeevan-rakht.svg)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/UdacityFrontEndScholarship/jeevan-rakht.svg)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/pulls)
[![GitHub forks](https://img.shields.io/github/forks/UdacityFrontEndScholarship/jeevan-rakht.svg?style=social&label=Fork)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/network)
[![GitHub stars](https://img.shields.io/github/stars/UdacityFrontEndScholarship/jeevan-rakht.svg?style=social&label=Stars)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/UdacityFrontEndScholarship/jeevan-rakht.svg?style=social&label=Watch)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/watchers)
[![GitHub contributors](https://img.shields.io/github/contributors/UdacityFrontEndScholarship/jeevan-rakht.svg)](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/graphs/contributors)

# GoogleUdacity_JeevanRakht
JeevanRakht is a Virtual Blood Bank web app, that aims at providing mechanism for people in need to directly talk to willing donors, and also find out blood availability in nearby blood banks.
On this platform people willing to donate blood can sign up with details of their blood groups, location. Also there’ll be accounts of blood banks with details like number of packages of blood available and blood group, location of blood bank to filter out nearest blood banks.
You can find the project's wireframe below which depicts the basic flow of our web application.

## Project Wireframe
![wireframe - flow](https://user-images.githubusercontent.com/15084301/38657424-c22747d2-3e3d-11e8-9447-7862553d7142.jpg)

## Getting Started
jeevanrakht has separate home page for website and web application.
This project consists of two part like all web application.
* Frontend Part -- HTML, CSS, jQuery and Bootstrap4
* Backend Part -- Node.js with express.js and MongoDB

## Color palette
![color palette](https://raw.githubusercontent.com/UdacityFrontEndScholarship/jeevan-rakht/master/public/assets/Color%20palette.jpg)

## Homepage Mockup
[jeevanrakht.pdf](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1907369/jeevanrakht.pdf)

## Web Application page
https://jeevanrakht.herokuapp.com/

## Website page
https://jeevanrakht.herokuapp.com/index.html

## Learn About Folder Structure (Check FAQ for more info on folder structure)
```
Note : The folder structure may changes i.e we may include/exclude some folders/files as project progresses but the 
overall sructure will remain as presented below:
```
### Backend Part (node.js, express.js with MongoDB)
* \bin          -- Application code listening for HTTP requests
* \config       -- DB connection URL, OAuth2 secrets etc to be used in application
* \db           -- MongoDB Driver code to be used in application
* \models       -- MongoDB collections schema
* \routes       -- Apllication code for handling different UI routes e.g /login, /users etc
* \views        -- Apllication related htmls files related to application routes
* \controllers  -- Methods to interact with DB and reflects the data on views
* \utils        -- Common Utility functions used in application
* app.js        -- Application driver code

### Frontend Part
* \public   
  - index.html -- homepage for our website
* \public\assets -- This will have scss, css, js, images
  - css
    - app.css   -- CSS for our application
    - main.css  -- CSS for our website
  - js
    - app.js    -- JS for our application
    - main.js   -- JS for website
  - images      -- Put your images here
  - optimized_images  -- we will create optimized images using grunt & image magick to optimize site/app performance.
  - scss        -- We are not using it as most people are not familier with scss

* gulpfile.js -- This is a task runner to launch app and monitor for file(scss,css,js) changes and reloads the browser.

### Common to both Frontend and Backend
* \views -- This will have htmls for our app (the htmls are with .hjs extension)
  - \auth     -- This module will have htmls related to authentication and authorization e.g login, signup etc.
  - \main     -- This module will have htmls related to main blocks of app e.g locate and donate
  - \profile  -- This module will have htmls related to user profiles
  - \partials -- This module will have common htmls blocks which will be used in all other htmls. e.g head, header, footer etc
  - app.hjs   -- This is the home page of our app
  - 404.hjs   -- html for page not found
* package.json

### Below is used to generate Optimized Image
* Gruntfile.js
<br />[Getting started with Grunt](https://gruntjs.com/getting-started)

### Below is used to deploy web app on Heroku
* Procfile
* Procfile.windows
<br />[Learn about building, deploying and managing your apps on Heroku](https://devcenter.heroku.com/)

## How to launch the app locally?
* Step1 -- Fork the project repo and clone it in your local directory
```
Note : You can directly update the frontend components inside public\ directory
but we have used gulp to automate the process. You need not to refresh the page after each change
or go to codepen to check your changes you made in scss or html or js files. Just run gulp and have fun.
```
* Step2 -- Download and install Node(latest stable version) (npm comes along with node)<br />
[Node](https://nodejs.org/en/) -- (e.g v 8.11 )
<br />[What is npm?](https://www.npmjs.com/)
```
verify with below command
>>>node -v
>>>npm -v
With node 10.x version, I see people struggling to start the application using "npm start" command. 
Therefore I request everyone to go for stable version of node i.e 8.11.
```

* Make sure you run all your commands fron inside cloned /jeevan-rakht folder
* Step3 -- Install the npm modules from the package.json
```
>>> npm install
this command installs all the node related packages required to run the app locally in 
/node_modules folder. You can see this folder inside /jeevan-rakth folder after running npm install
```

* Step4 -- Launch the application using below command:
```
Below command will run gulpfile.js and start the static website(Frontend)
>>> npm install -g gulp
>>> gulp
The application will be running at http://localhost:3000 URL
```
[What is gulp?](https://gulpjs.com/)
![gulp_run](https://user-images.githubusercontent.com/15084301/38658055-110a4996-3e41-11e8-9c28-9324e87cd008.JPG)

OR
```
Below command will start as full web application(Backend+Frontend)
>>> npm install -g nodemon
>>> npm start
The application will be running at http://localhost:3000
if not then please check if you have set any default PORT in your environment/path variable
i.e http://localhost:<your_env_port_variable>
```
![node_run](https://user-images.githubusercontent.com/15084301/38658058-17bea426-3e41-11e8-8dd6-9009ba81fcc3.JPG)

```
If you get an node-sass module error while running npm start saying app crashed,
then make sure your node version is 8.11 (not 10.x) and 
if the issue still persists then run the command as shown in below image:
```
![image](https://user-images.githubusercontent.com/15084301/39688089-b99528fe-51ee-11e8-9ee2-35ec7a46ccf2.png)

* Step5 -- No more steps
```
Now you don't need to repeat above steps always to run the app rather its one time task.
But if you clone the project in new location then again you need to repeat step 3(only).

Connect with co-mods if you stuck anywhere
```
## RESTFull APIs for jeevanrakht web application
[jeevanrakht_REST_APIs.pdf](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1911725/jeevanrakht_REST_APIs.pdf)

## Contributing Guidelines
Please refer to this [CONTRIBUTING guide](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/blob/master/CONTRIBUTING.md) to know more about general guidelines, creatig issues, pull requests, git commits etc.

## FAQ
- I can see many changes in the parent project repo, how may I sync my github repo with parent repo without losing my changes which I am currently working on in my local?
  - [Sync_forked_repo_with_parent_repo.docx](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1917880/Sync_forked_repo_with_parent_repo.docx)

- How can I get the link to add in PRs to show my changes?
  - You can share the github pages link or Heroku link where reviewer can go can see you changes live which will help them to take a call on your PR efficiently.
  <br />[Know more about github pages](https://guides.github.com/features/pages/)
  <br />[Deploying Applications with Heroku](https://in.udacity.com/course/deploying-applications-with-heroku--ud272)

- Where is the homepage for the jeevanrakht?
  - jeevanrakht has separate home page for website and web application. views/app.hjs is the home page for web application whereas /public/index.html is the static page for our website.

- Where to start, I am not getting where are the html files for the website and web application?
  - All html files for the website is inside /public folder and all the html files for web application is inside /views folder under different modules.

- I don't see any html files in /views folder
  - All the htmls are there with .hjs extension under /views, feel free to open and edit it like you do any other html files

- There are many subfolders inside /views, I can see only app.hjs and 404.hjs files
  - We have divided and modularized our folder structure based on the functionalities to manage the files efficiently otherwise it will be very chaotic once your project grows. Below are the main modules in our application:
/auth   -- It has all files related to authentication e.g login, signup, forgot pw pages etc
/main   -- It has main components of application e.g locate and donate related pages.
/profile -- It contains pages corresponding to user profiles, update email, mobile etc.
/others -- All other random files are kept here.
 
- What is 404.hjs file used for?
  - 404.hjs is default page to be shown to user if he/she visits any URL wrong path which is not the part of jeevanrakth application.

## Contributors
- Utkarsh Gupta
- Imran Khan
- Vidit Kothari
- Gaurav Singh
- Shashank Kumar
- Soumya Ranjan Behera
- Sujan Patel

## Working Repo/Site
- Repo : https://github.com/UdacityFrontEndScholarship/jeevan-rakht/
- Site : https://jeevanrakht.herokuapp.com/index.html
- App  : https://jeevanrakht.herokuapp.com

## Style Guide
This style guide acts as the official guide to follow in your projects. Udacity evaluators will use this guide to grade your projects. There are many opinions on the "ideal" style in the world of Front-End Web Development. Therefore, in order to reduce the confusion on what style students should follow during the course of their projects, we urge all students to refer to this [style guide](https://udacity.github.io/frontend-nanodegree-styleguide/) for their projects.
