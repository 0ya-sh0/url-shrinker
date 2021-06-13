# URL Shrinker

### Shrink URLs to a 6-letter code or choose your custom words

[Available here](https://ssurl.herokuapp.com/)

Uses nanoid to crate 6-letter code. 
Uses MongoDB for DB (MongoDB Atlas for Hosting).
Ejs as a templating engine.

**TODO List**

- [ ] Complete this README
- [x] Move to MongoDB atlas
- [x] Deploy this
- [ ] Complete API

**ENV Setup to test locally**

create ".env" file in root

template :
```
MONGO_URI=mongodb://localhost:27017/url_shrinker
PORT=5000
COOKIE_SECRET=SOME_COOKIE_SECRET_MUST_BE_KEPT_SECRET_AS_IT_IS_A_SECRET
```
execute "npm run local"

NOTE: needs heroku cli to be installed
