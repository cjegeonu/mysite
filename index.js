var firebaseConfig = {
    apiKey: "AIzaSyAB-38AQM0O5yJOi8fuA-demkVYdqLP4OM",
    authDomain: "fir-database-41f6e.firebaseapp.com",
    projectId: "fir-database-41f6e",
    storageBucket: "fir-database-41f6e.appspot.com",
    messagingSenderId: "240507875218",
    appId: "1:240507875218:web:1f1cf8e125a93e7ad2db4b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    username = document.getElementById('username').value
  
    console.log("running")
    // // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is incorrect.')
        return 
        // Don't continue running the code
    }
    if (validate_email(email) == false) {
        alert('One or more extra fields are incorrect.')    
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {  
      console.log("here")
        var user = auth.currentUser

        // Add this user to Firebase database 
        var database_ref = database.ref()

        // Create user data 
        var user_data = {
            email :email,
            username : username,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)
        .then(function() {
            alert('User Created!')  
        })
        .catch(function(error) {
            console.log("failed")
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message 
    
            alert(error_message, " - ", error_code);
        })

    })
    .catch(function(error) {
        console.log("failed")
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message 

        alert(error_message, " : ", error_code);
    })

}

// Login function
function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is incorrect.')
        return 
        // Don't continue running the code
    }
    
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser
    
        // Add this user to Firebase database 
        var database_ref = database.ref()

        // Create user data 
        var user_data = {
            last_login : Date.now()
        }
    
    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // Done
    alert('User Logged In!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Validating function
function  validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true  
    } else {
    // Email is not good
    return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false 
    } else {
        return true 
    }
}

function validate_username(username) {
    if (username == null) { 
        return false
    }

    if (username.length <= 0) {
        return false 
    } else { 
        return true 
    }}

