const express = require('express');
const request = require('request');
const axios = require('axios');
const jwtDecode = require('jwt-decode');
const {google} = require('googleapis');
const bodyParser = require('body-parser');
const router = express.Router();
const gp_client_secret = require('../../config/gp_client_secrets.json');
var { findByEmail, createOAuthUser } = require('../../controllers/userController');
const oauth2Client = new google.auth.OAuth2(
    gp_client_secret['web']['client_id'],
    gp_client_secret['web']['client_secret'],
    'postmessage'
  );

var rawParser = bodyParser.raw();

router.post('/', rawParser,function(req, res, next) {
    if (req.query.state !== req.session.STATE){
        console.log('Invalid state parameter.');
        res.set('Content-Type', 'application/json');
        res.status(401);
        res.json({"error":"Invalid state parameter."});
        return;
    }
    // Obtain authorization code
    let code = req.body.toString('utf8');
    console.log(code);
    // Exchange authorization code with access token
    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (err){
            console.log('Failed to exchange the authorization code with access_token.');
            res.set('Content-Type', 'application/json');
            res.status(401);
            res.json({"error":"Failed to exchange the authorization code with access_token."});
            return;
        } else {
          oauth2Client.setCredentials(tokens);
          let access_token = tokens['access_token'];
        //   console.log(tokens);
          let openID_token = jwtDecode(tokens['id_token'])
        //   console.log(openID_token);
          let gplus_id = openID_token['sub'];
          console.log("Current gplus id: " +gplus_id);
          let pr =  function(url1){
            axios.get(url1)
            .then(response => {
                let result = response.data;
                console.log(result);
                // Verify that the access token is used for the intended user.
                if (result['user_id'] !== gplus_id){
                console.log("Token's user ID doesn't match given user ID.");
                res.set('Content-Type', 'application/json');
                res.status(401);
                res.json({"error":"Token's user ID doesn't match given user ID."});
                }
                // Verify that the access token is valid for this app.
                if (result['issued_to'] !== gp_client_secret['web']['client_id']){
                    console.log("Token's client ID does not match app's.");
                    res.set('Content-Type', 'application/json');
                    res.status(401);
                    res.json({"error":"Token's client ID does not match app's."});
                }
                //Get user info
                let url2 = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+access_token+"&alt=json";
                console.log(url2);
                return axios.get(url2);
                })
                .then(response => {
                    let data = response.data;
                    console.log(data);
                    // Store the access token and gplus_id in the session for later use.
                    req.session.access_token = access_token;
                    req.session.gplus_id = gplus_id;
                    req.session.provider = 'google'
                    req.session.username = data['name']
                    req.session.picture = data['picture']
                    req.session.email = data['email']

                    //See if user exists, if it doesn't make a new one
                    //Srore the user in session
                    findByEmail(data['email'],function(err, user) {
                        console.log("email");
                        if (!err && !user) {
                            let userObj = req.session;
                            userObj.not_flag = 'N';
                            userObj.active_flag = 'A';
                            userObj.type = '1';
                            console.log("create");
                            createOAuthUser(userObj,function(err, newUser) {
                                if (err) {
                                    console.log(err);
                                    res.status(500);
                                    res.send("Internal DB Error");
                                    return;
                                }
                                console.log("new");
                                req.session.user = newUser;
                                req.flash('successMessage', 'User created with Google Signin.');
                            });
                        }else if(user){
                            req.session.user = user;
                        }
                    });
                    console.log(req.session);
                    let output = '';
                    output += '<h1>Welcome, ';
                    output += req.session.username;
                    output += '!</h1>';
                    output += '<img src="';
                    output += req.session.picture;
                    output += ' " style = "width: 160px; height: 160px;border-radius: 150px;\
                    -webkit-border-radius: 150px;-moz-border-radius: 150px;"> ';
                    res.send(output);
                })
                .catch(error => {
                    req.session = null;
                    console.log("axios inner error");
                    console.log(Object.keys(error));
                    console.log(error);
                    res.set('Content-Type', 'application/json');
                    res.status(500);
                    res.json({"error":error.response});
                })
                .catch(error => {console.log("inside catch error");console.log(error);})
            };
        // check also if access token is valid or expired, if expired then resrore
        // the access token
        let stored_access_token = req.session.access_token;
        let stored_gplus_id = req.session.gplus_id;
        console.log("Stored gplus id: " +stored_gplus_id);
        let stored_url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+stored_access_token;
        console.log(stored_url);
        console.log(req.session);
        axios.get(stored_url)
        .then(response => {
            console.log(req.session);
            console.log(response.data);
            if (stored_access_token && gplus_id === stored_gplus_id){
                res.status(200);
                res.send("<p>Current user is already connected.</p>");
            }else{
                console.log("stored_url: " +stored_url);
                // Check that the access token is valid.
                let url1 = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+access_token;
                console.log("url1: " +url1);
                pr(url1);
            }
            })
            .catch(error => {
                console.log("Store access_toke API error");
                console.log(Object.keys(error));
                let url1 = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+access_token;
                console.log("url1: " +url1);
                pr(url1);
            })
            .catch(error => {console.log("inside catch error");console.log(error);})
            }
        });
    });
module.exports = router;