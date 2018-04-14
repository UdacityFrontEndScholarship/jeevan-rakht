# GoogleUdacity_JeevanRakht

The code and development of the JeevanRakht's website is housed here.   
For more details - [Refer to this paper.](https://paper.dropbox.com/doc/JeevanRakht-WebD-Project-ZroUbusvKbwRSRCDFHCOV)

## Project Wireframe
![wireframe - flow](https://user-images.githubusercontent.com/15084301/38657424-c22747d2-3e3d-11e8-9447-7862553d7142.jpg)
## Getting Started
This project consists of two part like all web application.
* Frontend Part -- HTML, CSS, jQuery and Bootstrap4
* Backend Part -- Node.js with express.js and MongoDB 

## Color palette
![color palette](https://user-images.githubusercontent.com/15084301/38657620-eccfa7bc-3e3e-11e8-9dc2-2e1d6622b8ce.jpg)

## Homepage Mockup
[jeevanrakht.pdf](https://github.com/UdacityFrontEndScholarship/jeevan-rakht/files/1907369/jeevanrakht.pdf)

## Learn About Folder Structure
### Backend Part (node.js with MongoDB)
* \bin:
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
- Site : https://utkarsh2102.github.io/GoogleUdacity_JeevanRakht/
