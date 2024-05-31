var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupInputFields = document.querySelectorAll(".signupClass");
var loginInputFields = document.querySelectorAll(".loginClass");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var registeredUsers = [];

if (localStorage.getItem("users") !== null) {
    registeredUsers = JSON.parse(localStorage.getItem("users"));
}

// signupButton.addEventListener("click", addUser);
// loginButton.addEventListener("click", login);


function addUser() {
    if (validateEmptyFields(signupInputFields) == true) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Please fill out all required fields.</span>'
    }

    else if (validateInputs(signupName) && validateInputs(signupEmail) && validateInputs(signupPassword)) {

        var user = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        }

        if (validateDuplicateEmail()) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">This email address is already in use.</span>'
        } else {
            registeredUsers.push(user);
            localStorage.setItem("users", JSON.stringify(registeredUsers));
            clearForm();
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
            window.location.href = "index.html";

        }

    }

}

for (var i = 0; i < signupInputFields.length; i++) {
    signupInputFields[i].addEventListener("input", function () {
        validateInputs(this);

    })
}

function validateInputs(element) {

    var regex = {
        signupName: /^[a-zA-Z][a-zA-Z\s\-]{2,49}$/,
        signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signupPassword: /^[a-zA-Z0-9]{6,}$/
    }

    var isValid = regex[element.id].test(element.value);

    if (isValid) {
        console.log("matched");
        element.nextElementSibling.classList.add("d-none")
    } else {
        console.log("not matched");
        element.nextElementSibling.classList.remove("d-none")
    }

    return isValid;
}

function validateEmptyFields(fields) {
    var isEmpty = false;

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value == "") {
            isEmpty = true;
        }
    }
    return isEmpty;
}

function validateDuplicateEmail() {
    var isExist = false;
    for (var i = 0; i < registeredUsers.length; i++) {
        if (signupEmail.value.toLowerCase() === registeredUsers[i].email.toLowerCase()) {
            isExist = true;
        }
    }
    return isExist;
}

function clearForm() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}


function login() {
    if (validateEmptyFields(loginInputFields)) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Please fill out all required fields.</span>';
        return;
    }

    for (var i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i].email.toLowerCase() === signinEmail.value.toLowerCase()) {
            console.log("email is found");
            if (registeredUsers[i].password === signinPassword.value) {
                console.log("Login successful!");
                localStorage.setItem("userName", registeredUsers[i].name)
                document.getElementById('incorrect').innerHTML = '<span class="text-success m-3">Login successful!</span>';
                window.location.href = "home.html";
                return;
            } else {
                console.log("wrong password");
                document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Wrong password. Please try again.</span>';
                return;
            }
        }
    }
    document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Your email is not associated with an account. Please sign up for a new account.</span>';
}

