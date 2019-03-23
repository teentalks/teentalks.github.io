function submitContactForm(){
    var db = firebase.firestore();
    var name = $('#inp_name').val();
    var email = $('#inp_email').val();
    var loc = $('#inp_loc').val();
    var prob = $('#inp_prob').val();
    console.log(name,email,loc,prob);

    db.collection("contactus").add({
        name: name,
        email: email,
        loc: loc,
        prob: prob 
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}