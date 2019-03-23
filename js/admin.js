function loginFunction(){
    var user = $("#user").val();
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(user, password).catch(function(error) {
        console.log('Login failure');
        alert("Login Failed");
        window.location.replace("admin.html");
    });

    $("#login").hide();

    $('#board').show();

    var db = firebase.firestore();

    db.collection("contactus").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var name = doc.data().name;
            var email = doc.data().email;
            var loc = doc.data().loc;
            var prob = doc.data().prob;
            var phone = doc.data().phone;
            var id= doc.id;
            //console.log(name,email,loc,prob);
            if(doc.id!='STATIC'){
                var string = "<div class='col' id='"+ id +"'><div class='card' style='width: 20rem'><div class='card-body'><h5 class='card-title'>" + name + "</h5><h6><b>"+ email +"</b></h6><p><b>"+ loc + "<br>" + phone + "</b><br>" + prob +"</p><button type='button' class='btn btn-outline-danger' onclick='deleteData("+"\""+id+"\""+")'>Delete</a></div></div></div>";
                $("#data_cards").append(string);
            }
        });
    });

}

function deleteData(id){
    var db =firebase.firestore();
    db.collection("contactus").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    idd = '#' + id;
    $(idd).hide();
}