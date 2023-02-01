const express = require('express')
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const isAuth = require('./middleware/isAuth')
const dotenv = require('dotenv')
dotenv.config()
const port = 3000;
const app = express()

let scopes = ["identify"];

passport.use(
  new DiscordStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: 'http://localhost:3000/auth/discord/callback',
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, cb, done) {
      return done(null, profile)
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(express.json())
app.use(cookieParser())
app.use(cookieSession({
  name:"session",
  keys: ["key"],
  maxAge: 3*60*60*1000
}))
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res, next) {
    res.redirect('/')
});
app.get("/",isAuth, (req,res,next) => {
  res.send('<h1>secret stuff </h1>')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
