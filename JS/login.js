function login() {
    var email = signinEmail.value;
    var password = signinPassword.value;

    for (var i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].email === email){
            console.log("email is found");
            document.getElementById('incorrect').innerHTML = '<span class="text-success m-3">Email is found</span>'

        }
    }

}
