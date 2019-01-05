"use strict";

const root = document.getElementById("root");
onload = () => renderSignInPage();

function renderSignInPage() {
  root.innerHTML = " ";
  util.createAppend("h1", root, { txt: "Sign in for accessing Todo application", class: "form-heading" });
  const signInForm = util.createAppend("form", root, { class: "forms" });
  util.createAppend("h1", signInForm, { txt: "Login" });
  let userLabel = util.createAppend("label", signInForm, { txt: "Username", for: "username", class: "labels" });
  util.createAppend("span", userLabel, { txt: "Incorrect User Email", class: "user-alert show-hide" });
  util.createAppend("input", signInForm, { type: "text", name: "username", placeholder: "Enter Username", id: "username", class: "inputs" }).required = true;
  let pswLabel = util.createAppend("label", signInForm, { txt: "Password", class: "labels", for: "psw" });
  util.createAppend("span", pswLabel, { txt: "Incorrect Password", class: "psw-alert show-hide" });
  util.createAppend("input", signInForm, { type: "password", name: "password", placeholder: "Enter Password", id: "psw", class: "inputs" }).required = true;
  util.createAppend("button", signInForm, { txt: "Sign In", type: "submit", id: "sign-in-btn" });
  let p = util.createAppend("p", signInForm, { txt: "Don't have an account?" });
  const signUpLink = util.createAppend("a", p, { txt: "Sign UP", href: "#", id: "sign-up-link" });

  signInForm.addEventListener("submit", e => checkUser(e, root));
  signUpLink.addEventListener("click", () => renderSignUpPage());
}

function renderSignUpPage() {
  root.innerHTML = " ";
  util.createAppend("h1", root, { txt: "Welcome to Todo application.\nSign up for fully access to Todo application.", class: "form-heading" });
  const signUpForm = util.createAppend("form", root, { action: "#", method: "post", class: "forms" });
  util.createAppend("h1", signUpForm, { txt: "Sign Up" });
  util.createAppend("label", signUpForm, { txt: "Name", for: "name", class: "labels" });
  util.createAppend("input", signUpForm, { type: "text", name: "name", placeholder: "Enter Name", id: "name", class: "inputs" }).required = true;
  util.createAppend("label", signUpForm, { txt: "Email", class: "labels", for: "email" });
  util.createAppend("input", signUpForm, { class: "inputs", type: "email", name: "email", placeholder: "Enter Email", id: "email" }).required = true;
  util.createAppend("label", signUpForm, { txt: "Password", class: "labels", for: "psw" });
  util.createAppend("input", signUpForm, { class: "inputs", type: "password", name: "psw", placeholder: "Enter Password", id: "psw" }).required = true;
  util.createAppend("label", signUpForm, { txt: "Confirm Password", class: "labels", for: "confirm-psw" });
  util.createAppend("input", signUpForm, { class: "inputs", type: "password", name: "Confirm Password", placeholder: "Confirm Password", id: "confirm-psw" }).required = true;
  util.createAppend("button", signUpForm, { txt: "Sign Up", type: "submit", id: "sign-up-btn" });
  let p = util.createAppend("p", signUpForm, { txt: "Already have an account?" });
  const signInLink = util.createAppend("a", p, { txt: "Sign In", href: "#", id: "sign-in-link" });

  signUpForm.addEventListener("submit", e => createNewUser(e, root));
  signInLink.addEventListener("click", () => renderSignInPage());
}


