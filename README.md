# GoogleUdacity_JeevanRakht

The code and development of the JeevanRakht's website is housed here.   
For more details - [Refer to this paper.](https://paper.dropbox.com/doc/JeevanRakht-WebD-Project-ZroUbusvKbwRSRCDFHCOV)

## Project Wireframe
![wireframe - flow](https://user-images.githubusercontent.com/15084301/38657424-c22747d2-3e3d-11e8-9447-7862553d7142.jpg)

## Getting Started
jeevanrakht has separate home page for website and web application.
This project consists of two part like all web application.
* Frontend Part -- HTML, CSS, jQuery and Bootstrap4
* Backend Part -- Node.js with express.js and MongoDB

## Color palette
![color palette](https://user-images.githubusercontent.com/15084301/38657620-eccfa7bc-3e3e-11e8-9dc2-2e1d6622b8ce.jpg)

## Homepage Mockup
[jeevanrakht.pdf](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1907369/jeevanrakht.pdf)

## Web Application page
https://jeevanrakht.herokuapp.com/

## Website page
https://jeevanrakht.herokuapp.com/index.html

## Learn About Folder Structure (Check FAQ for more info on folder structure)
### Backend Part (node.js with MongoDB)
* \bin:
* \config:
* \db:
* \models
* \routes
* \views
* \controllers
* app.js

### Frontend Part
* \public   -- html files
* \public\assets -- This will have scss, css, js, images
* gulpfile.js -- This is a task runner to launch app and monitor for file(scss,css,js) changes and reloads the browser.

### Common to both Frontend and Backend
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
```

* Step3 -- Install the npm modules from the package.json
```
>>> npm install
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

* Step5 -- No more steps
```
Connect with co-mods if you stuck anywhere
```
## RESTFull APIs for jeevanrakht web application
[jeevanrakht_REST_APIs.pdf](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1911725/jeevanrakht_REST_APIs.pdf)

## Contributing Guidelines
1. Add assets such as images and other media in assets folder.
2. Follow standard coding practises, naming conventions and the regular document object model (DOM).
2. Make issues on GitHub to propose new features, bugs and then make a PR referencing the same.
3. It is now mandatory for everyone to comment on every PR made and read other people's code.
4. Write your name in Contributors section below when PR is made.
5. Make sure you update your REMOTE ORIGIN in case you have forked this repo : [Refer](https://help.github.com/articles/syncing-a-fork/)
6. Once you update the forked repo make sure you rebase the changes and then open the PR. [Refer](http://stackoverflow.com/questions/7244321/how-do-i-update-a-github-forked-repository)
7. Every PR should only have one logical change and the least number of commits possible (If for some reasons the commits are higher then the creator of the PR would be asked to squash them.) If he/she doesn't comply, then PR is not to be merged.     
[Refer](https://makandracards.com/makandra/527-squash-several-git-commits-into-a-single-commit
) in case there are multiple commits.

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
