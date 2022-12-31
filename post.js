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
// Set database variables 
var database = firebase.database()

function save() {
    subject = document.getElementById('subject').value
    body = document.getElementById('body').value

    database.ref('posts/' + subject).set({
        subject : subject,
        body : body
    })

    alert('Post saved succesfully.')
}

function get() {
    var subject = document.getElementById('subject').value
  
    var post_ref = database.ref('users/' + username)
    post_ref.on('value', function(snapshot) {
      var data = snapshot.val()
  
      alert(data.body)
  
    })
}

function update() {
    var subject = document.getElementById('subject').value
    var body = document.getElementById('body').value

    var updates = {
    subject : subject,
    body : body
    }

    database.ref('posts/' + subject).update(updates)

    alert('Post updated successfully!')
}

function remove() {
    var subject = document.getElementById('subject').value

    database.ref('users/' + subject).remove()

    alert('Post removed successfully.')
}