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
    full_name = document.getElementById('full_name').value
    favorite_song = document.getElementById('favorite_song').value
    milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is incorrect.')
        return 
        // Don't continue running the code
}
    if (validate_field(full_name) == false || validate_field(favorite_song) == false || validate_field(milk_before_cereal) == false) {
        alert('One or more extra fields are incorrect.')    
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {  
      
        var user = auth.currentuser

        // Add this user to Firebase database 
        var database_ref = database.ref()

        // Create user data 
        var user_data = {
            email :email,
            full_name : full_name,
            favorite_song : favorite_song,
            milk_before_cereal : milk_before_cereal,
            last_login : Date.now()
        }

        database_ref.child('users/' + userß.uid).set(user_data)


        alert('User Created!')

    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message 

        alert(error_message)
    })


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

function validate_field(field) {
    if (field == null) { 
        return false
    }

    if (field.length <= 0) {
        return false 
    } else { 
        return true 
    }
}}
