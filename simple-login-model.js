// install first
// npm install express passport passport-local bcrypt

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Mock user data
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$C70/9Iyc3qsgcq7c5biNl.yW8VpbLd89ZcC0sofJzOQcWbYpiDXiS", // "password1"
  },
  {
    id: 2,
    username: "user2",
    password: "$2b$10$C70/9Iyc3qsgcq7c5biNl.yW8VpbLd89ZcC0sofJzOQcWbYpiDXiS", // "password1"
  },
];

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Passport local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: "Invalid username or password" });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid username or password" });
      }
    });
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

// Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
