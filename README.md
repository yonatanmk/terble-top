# node_google_oauth_bp

db found at mlab.com

## Running app
npm run dev

## Setup

### Getting google oauth keys

Instructions can be found at:
General: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7593710?start=0
Redirect URIs: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7593722?start=0

1. Go to console.developers.google.com
2. Create new projects, MAKE SURE YOU'RE IN YOUR NEW project
3. Enable Google oAuth API
  a. Click "+Enable API"
  b. Search "google+"
  c. Enable Google+ API
4. Once in new project go to Credentials in sidebar
5. Click "Create Credentials" --> oAuth client ID,
6. Configure Consent Screen
  a. add product name - only thing required
7. Parameters:
    Application Type: Web Application
      -use name given
      -Restrictions:
        Authorized Javascript Origins: http://localhost:PORT
        Authorized Redirect URIs: http://localhost:PORT/* and http://localhost:5000/auth/google/callback
8. module.export googleClientID and googleClientSecret from ./config/keys.js
