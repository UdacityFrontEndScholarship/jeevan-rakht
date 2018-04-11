# GoogleUdacity_JeevanRakht

The code and development of the JeevanRakht's website is housed here.   
For more details - [Refer to this paper.](https://paper.dropbox.com/doc/JeevanRakht-WebD-Project-ZroUbusvKbwRSRCDFHCOV)

## Getting Started
This project consists of two part like all web application.
* Frontend Part -- HTML, CSS, jQuery and Bootstrap4
* Backend Part -- Node.js with express.js and MongoDB 

## Learn About Folder Structure
### Backend Part (node.js with MongoDB)
* \bin:
* \db:
* \models
* \routes
* \views 
* app.js 

### Frontend Part
* \public   -- html files
* \public\assets -- This will have scss, css, js, images
* gulpfile.js -- This is a task runner to launch app and motitor for file(scss,css,js) changes and reloads the browser.

### Common to both Frontend and Backend
* package.json

### Below is used to generate Optimized Image 
* Gruntfile.js

## How to launch the app locally?
* Step1 -- Fork the project repo and clone it in your local directory
```
Note : You can directly update the frontend components inside public\ directory
but we have used gulp to automate the process. You need not to refresh the page after each change 
or go to codepen to check your changes you made in scss or html or js files. Just run gulp and have fun.
```
* Step2 -- Download and install Node (npm comes along with node)
[Node](https://nodejs.org/en/)
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

>>> gulp
```

OR 
```
Below command will start as full web application(Backend+Frontend)
>>> npm install -g nodemon
>>> npm start
```

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
- Soumya Bahera
- Sujan Patel

## Working Repo/Site
- Repo : https://github.com/UdacityFrontEndScholarship/jeevan-rakht/
- Site : https://utkarsh2102.github.io/GoogleUdacity_JeevanRakht/
