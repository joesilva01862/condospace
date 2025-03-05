
function onLoadAction() {
    console.log('here are contact.js onLoadAction()');
}

function sendContactEmail() {
    // create form data to send via XHR request
    name = document.getElementById('name').value.trim();
    email = document.getElementById('email').value.trim();
    phone = document.getElementById('phone').value.trim();
    message = document.getElementById('message').value.trim();

    if (name.length == 0 || email.length == 0 | message.length == 0) {
        showMsgBox( gettext("Fields name, email and message cannot be blank") );
        return;
    }

    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);

    //create XHR object to send request
    var request = new XMLHttpRequest();

    // initializes a newly-created request
    request.open('POST', 'send_contact_mail', true);

    // send request to the server
    request.send(formData);

    alert("Message has been sent");
    location.reload();
}

function sendCondoRegistration() {
    // create form data to send via XHR request
    //userid = document.getElementById('admin-id').value.trim();
    //userpass = document.getElementById('admin-pass').value.trim();
    name = document.getElementById('name').value.trim();
    email = document.getElementById('email').value.trim();
    phone = document.getElementById('phone').value.trim();
    pref_language = document.getElementById('pref-language').value;
    condo_id = document.getElementById('condo-id').value.trim();
    condo_name = document.getElementById('condo-name').value.trim();
    condo_tagline = document.getElementById('condo-tagline').value.trim();
    condo_location = document.getElementById('condo-location').value.trim();

    if (name.length == 0 ) {
        showMsgBox( gettext("Admin Name cannot be empty") );
        return;
    }

    if (condo_id.length == 0 || condo_id.indexOf(" ") != -1 ) {
        showMsgBox( gettext("Condo Id cannot be empty, cannot have spaces") );
        return;
    }

    if (email.length == 0 ) {
        showMsgBox( gettext("Admin email cannot be empty") );
        return;
    }

    validateEmail('email', true);
    validatePhone('phone', true);

    if (condo_name.length == 0 ) {
        showMsgBox( gettext("Condominium Name cannot be empty") );
        return;
    }

    if (condo_location.length == 0 ) {
        showMsgBox( gettext("Condominium Location cannot be empty") );
        return;
    }

    //create XHR object to send request
    var request = new XMLHttpRequest();

    // initializes a newly-created request
    request.open('POST', 'register_condo', true);

    var requestObj = new Object();
    requestObj.name = name;
    requestObj.email = email;
    requestObj.phone = phone;
    requestObj.pref_language = pref_language;
//    requestObj.userid = userid;
//    requestObj.userpass = userpass;
    requestObj.condo_id = condo_id;
    requestObj.condo_name = condo_name;
    requestObj.condo_tagline = condo_tagline;
    requestObj.condo_location = condo_location;

    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function () {
        // Begin accessing JSON data here
        var json = JSON.parse(this.response);
        console.log(json);

        if (request.status >= 200 && request.status < 400) {
            if (json.status === 'success') {
                showMsgBox( gettext("Success! We sent login info as well as instructions to the email provided") );
                url = json.condo_id + "/" + "login";
                window.location.replace(url);
                return;
            }
            else {
                showMsgBox('Error: '+json.response.message);
                return;
            }
        }
        else {
            showMsgBox( gettext('Error creating registering new condominium') );
            return;
        }
    }

    // send request to the server
    request.send(jsonStr);
}

function sendCondoRegistrationForm() {
    name = document.getElementById('name').value.trim();
    email = document.getElementById('email').value.trim();
    phone = document.getElementById('phone').value.trim();
    pref_language = document.getElementById('pref-language').value;
    condo_id = document.getElementById('condo-id').value.trim();
    condo_name = document.getElementById('condo-name').value.trim();
    condo_tagline = document.getElementById('condo-tagline').value.trim();
    condo_address = document.getElementById('condo-address').value.trim();
    condo_zip = document.getElementById('condo-zip').value.trim();
    condo_location = document.getElementById('condo-location').value.trim();
    use_default_img = document.getElementById('use-default-img');

    if (name.length == 0 ) {
        showMsgBox( gettext("Admin Name cannot be empty") );
        return;
    }

    if (condo_id.length == 0 || condo_id.indexOf(" ") != -1 ) {
        showMsgBox( gettext("Condo Id cannot be empty, cannot have spaces") );
        return;
    }

    validateEmail('email', true);
    validatePhone('phone', true);

    if (condo_name.length == 0 ) {
        showMsgBox( gettext("Condominium Name cannot be empty") );
        return;
    }

    if (condo_location.length == 0 ) {
        showMsgBox( gettext("Condominium Location cannot be empty") );
        return;
    }

    //create XHR object to send request
    var request = new XMLHttpRequest();

    // initializes a newly-created request
    request.open('POST', 'register_condo', true);

    // create form data to send via XHR request
    var formData = new FormData();

    if ( !use_default_img.checked ) {
        img_file = document.getElementById('condo-img-file').files[0];
        if ( img_file == null ) {
            showMsgBox( gettext("You should either check the 'Use a default picture' box or select a picture file") );
            return;
        }
        formData.append("home_pic",  img_file);
        formData.append("use_default_img", "no");
    }
    else {
        formData.append("use_default_img", "yes")
    }

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("pref_language", pref_language);
    formData.append("condo_id", condo_id);
    formData.append("condo_name", condo_name);
    formData.append("condo_tagline", condo_tagline);
    formData.append("condo_address", condo_address);
    formData.append("condo_zip", condo_zip);
    formData.append("condo_location", condo_location);

    request.onload = function () {
        // Begin accessing JSON data here
        var json = JSON.parse(this.response);
        console.log(json);

        if (request.status >= 200 && request.status < 400) {
            if (json.status === 'success') {
                showMsgBox( gettext("Success! We sent login info as well as instructions to the email provided") );
                url = json.condo_id + "/" + "login";
                window.location.replace(url);
                return;
            }
            else {
                showMsgBox( gettext('Error: '+json.response.message) );
                return;
            }
        }
        else {
            showMsgBox( gettext('Error creating registering new condominium') );
            return;
        }
    }

    // send request to the server
    request.send(formData);
}

function pictureSelectAction(fileControl, imageControl) {
    file = document.getElementById(fileControl).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            document.getElementById(imageControl).src = image.src;
            document.getElementById(imageControl).style.display = 'block';
        };
    }
}

function useDefaultImgClicked() {
    if (document.getElementById('use-default-img').checked) {
        document.getElementById('condo-img-file').style.display = 'none';
        document.getElementById('condo-img').style.display = 'none';
    }
    else {
        document.getElementById('condo-img-file').style.display = 'block';
        //document.getElementById('condo-img').style.display = 'block';
    }
}