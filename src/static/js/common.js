
$(document).ready(function() {
	$(".photo").on('click', function() {
		var url = $(this).attr('src');
		$("#modal-image").attr('src', url);
		$("#myModal").modal("show");
	});
/*
  $("#sidebar").mCustomScrollbar({
      theme: "minimal"
  });
*/
  $('#menuButtonOpen, #menuButtonClose').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
/*
  $('#sidebarClose').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
*/
  let timeout;
  //document.getElementById("progress-bar").style.display = "none";
});

var timeoutId = 0;
var count = 0;
var op = 0;
var op_decr = 0;
var SUCCESS_MSG = 0;
var ERROR_MSG = 1;

const MESSAGE_BLOCK_ID = "message_block_id";
const UPLOAD_EVENT_PICTURE = "event_picture";
const UPLOAD_LISTING = "listing";
const SELECTED_FILES_CONTROL = "selectedFiles";

document.addEventListener("DOMContentLoaded", init, false);

/* these are global variables; used in multiple .js files
   For this to work: import common.js first; import the page's .js file; in the onLoadAction(), populate these vars
*/
window.loggedin_id_global = null;
window.loggedin_userid_global = null;
window.loggedin_name_global = null;
window.loggedin_tenant_global = null;

function init() {
    // if the user isn't logged in, certain elements will not be present
    if ( document.getElementById('files_cntrl') != null ) {
        document.querySelector('#files_cntrl').addEventListener('change', handleFileSelect, false);
        document.getElementById('progress_bar').style.display = 'none';
    }
}

function gen_residents_pdf() {
    var request = new XMLHttpRequest()
    get_url = "/" + window.loggedin_tenant_global + "/generatepdf";
    request.open('GET', get_url, true);
    request.onload = function () {
        // Begin accessing JSON data here
        var json = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            alert('Census Forms PDF has been created');
        }
        else {
            alert('Error retrieving residents list');
        }
    }
    request.send();
}

function displayMessage(type, param2, param3) {
    if (param3 === undefined) {
        line_start = 900;
        msg = param2;
    }
    else {
        line_start = param2;
        msg = param3;
    }

    secs = 4;
    intv = 100;
    count = (secs * 1000) / intv;
    op = 1;
    op_decr = op / count;
    div_block = document.getElementById(MESSAGE_BLOCK_ID);
    if (type == SUCCESS_MSG) {
        div_block.style.background = 'green';
    }
    else {
        div_block.style.background = 'red';
    }

    div_block.innerHTML = msg;
    div_block.style.display = 'block';
    div_block.style.opacity = op;
    div_block.style.top = ''+line_start+'px';
    timeoutId = setInterval(fadeAction, intv);
}

function fadeAction() {
    //alert('action report');
    op -= op_decr;
    count -= 1;
    transition = document.getElementById(MESSAGE_BLOCK_ID);
    transition.style.opacity = op;
    if (count == 0) {
        clearTimeout(timeoutId);
        transition.style.display = 'none';
    }
}

function handleRentalClick(cb) {
    if ( cb.checked ) {
        set_rental_disability(false);
    }
    else {
        blank_and_disable_rental();
    }
}

function handleNoVehiclesClick(cb) {
    if ( cb.checked ) {
        blank_and_disable_vehicles();
    }
    else {
        set_vehicles_disability(false);
    }
}

function set_rental_disability(flag) {
    document.getElementById('owner_name').disabled = flag;
    document.getElementById('owner_email').disabled = flag;
    document.getElementById('owner_phone').disabled = flag;
    document.getElementById('owner_address').disabled = flag;
}

function blank_and_disable_rental() {
    document.getElementById('owner_name').value = '';
    document.getElementById('owner_email').value = '';
    document.getElementById('owner_phone').value = '';
    document.getElementById('owner_address').value = '';
    set_rental_disability(true);
}

function set_vehicles_disability(flag) {
    document.getElementById("make_model_0").disabled = flag;
    document.getElementById("plate_0").disabled = flag;
    document.getElementById("color_0").disabled = flag;
    document.getElementById("year_0").disabled = flag;
    document.getElementById("make_model_1").disabled = flag;
    document.getElementById("plate_1").disabled = flag;
    document.getElementById("color_1").disabled = flag;
    document.getElementById("year_1").disabled = flag;
}

function blank_and_disable_vehicles() {
    document.getElementById("make_model_0").value = '';
    document.getElementById("plate_0").value = '';
    document.getElementById("color_0").value = '';
    document.getElementById("year_0").value = '';
    document.getElementById("make_model_1").value = '';
    document.getElementById("plate_1").value = '';
    document.getElementById("color_1").value = '';
    document.getElementById("year_1").value = '';
    set_vehicles_disability(true);
}

function cleanScreen() {
    document.getElementById('user_id_display').value = '';

    if (document.getElementById('last_update_date') != null) {
        document.getElementById('last_update_date').value = '';
    }

    if (document.getElementById('password') != null) {
        document.getElementById('password').value = '';
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('owner_name').value = '';
    document.getElementById('owner_email').value = '';
    document.getElementById('owner_phone').value = '';
    document.getElementById('owner_address').value = '';
    document.getElementById('rental_unit_checkbox').checked = false;
    document.getElementById('startdt_month').value = '';
    document.getElementById('startdt_year').value = '';

    if (document.getElementById('resident_type') != null) {
        document.getElementById('resident_type').value = '';
    }

    document.getElementById('occup1_name').value = '';
    document.getElementById('occup1_email').value = '';
    document.getElementById('occup1_cc').checked = false;
    document.getElementById('occup1_phone').value = '';
    document.getElementById('occup1_has_key').checked = false;

    document.getElementById('occup2_name').value = '';
    document.getElementById('occup2_email').value = '';
    document.getElementById('occup2_cc').checked = false;
    document.getElementById('occup2_phone').value = '';
    document.getElementById('occup2_has_key').checked = false;

    document.getElementById('occup3_name').value = '';
    document.getElementById('occup3_email').value = '';
    document.getElementById('occup3_cc').checked = false;
    document.getElementById('occup3_phone').value = '';
    document.getElementById('occup3_has_key').checked = false;

    document.getElementById('occup4_name').value = '';
    document.getElementById('occup4_email').value = '';
    document.getElementById('occup4_cc').checked = false;
    document.getElementById('occup4_phone').value = '';
    document.getElementById('occup4_has_key').checked = false;

    document.getElementById('occup5_name').value = '';
    document.getElementById('occup5_email').value = '';
    document.getElementById('occup5_cc').checked = false;
    document.getElementById('occup5_phone').value = '';
    document.getElementById('occup5_has_key').checked = false;

    document.getElementById('emerg_name').value = '';
    document.getElementById('emerg_email').value = '';
    document.getElementById('emerg_phone').value = '';
    document.getElementById('emerg_has_key').checked = false;

    document.getElementById('rental_unit_checkbox').checked = false;
    document.getElementById('owner_name').value = '';
    document.getElementById('owner_email').value = '';
    document.getElementById('owner_phone').value = '';
    document.getElementById('owner_address').value = '';

    document.getElementById('oxygen_equipment').checked = false;
    document.getElementById('limited_mobility').checked = false;
    document.getElementById('routine_visits').checked = false;
    document.getElementById('has_pet').checked = false;
    document.getElementById('bike_count').value = '';
    document.getElementById('insurance_carrier').value = '';
    document.getElementById('knob_radio').checked = false;
    document.getElementById('lever_radio').checked = false;
    document.getElementById('dont_know_radio').checked = false;

    document.getElementById('vehicle_checkbox').checked = false;
    document.getElementById('make_model_0').value = '';
    document.getElementById('plate_0').value = '';
    document.getElementById('color_0').value = '';
    document.getElementById('year_0').value = '';
    document.getElementById('make_model_1').value = '';
    document.getElementById('plate_1').value = '';
    document.getElementById('color_1').value = '';
    document.getElementById('year_1').value = '';

    document.getElementById('notes').value = '';
}

function populateTable(json, table_id, user_type_param) {
    var table = document.getElementById(table_id);
    var rowCount = table.rows.length;

    for (var x=rowCount-1; x>0; x--) {
        table.deleteRow(x);
    }

    for (var i=0; i<json.residents.length; i++) {
        var usertype = json.residents[i].usertype;

        if (user_type_param == 'adm') {
             if (usertype != 0) {
                 continue;
             }
        }

        if (user_type_param == 'resident') {
             if (usertype == 0) {
                 continue;
             }
        }

        var row = table.insertRow( -1 ); // -1 is insert as last
        var del_btn_cell = row.insertCell( - 1 ); // -1 is insert as last
        var unit_cell = row.insertCell( - 1 ); // -1 is insert as last
        var user_id_cell = row.insertCell( - 1 ); // -1 is insert as last
        var pass_cell = row.insertCell( - 1 ); // -1 is insert as last
        var user_type_cell = row.insertCell( - 1 ); // -1 is insert as last
        var name_cell = row.insertCell( - 1 ); // -1 is insert as last
        var email_cell = row.insertCell( - 1 ); // -1 is insert as last
        var phone_cell = row.insertCell( - 1 ); // -1 is insert as last
        var ownername_cell = row.insertCell( - 1 ); // -1 is insert as last
        var owneremail_cell = row.insertCell( - 1 ); // -1 is insert as last
        var ownerphone_cell = row.insertCell( - 1 ); // -1 is insert as last
        var startdate_cell = row.insertCell( - 1 ); // -1 is insert as last


        if (json.residents[i].userid != loggedin_userid_global) {
            click_str = "deleteUserParam('" + json.residents[i].userid + "');";
            console.log(click_str);
            del_btn_cell.innerHTML = '<input id="Button" style="font-size: 11px; height: 20px;" type="button" value="delete" onClick="' + click_str + '" />';
        }

        var unit = json.residents[i].unit;
        var userid = json.residents[i].userid;
        var password = json.residents[i].password;
        var usertype = json.residents[i].usertype;
        var name = json.residents[i].name;
        var email = json.residents[i].email;
        var phone = json.residents[i].phone;
        var ownername = json.residents[i].ownername;
        var owneremail = json.residents[i].owneremail;
        var ownerphone = json.residents[i].ownerphone;
        var startdtMonth = json.residents[i].startdt.month;
        var startdtYear = json.residents[i].startdt.year;

        unit_cell.innerHTML = unit;
        user_id_cell.innerHTML = userid;
        pass_cell.innerHTML = password;
        user_type_cell.innerHTML = usertype;
        name_cell.innerHTML = name;
        email_cell.innerHTML = email;
        phone_cell.innerHTML = phone;
        ownername_cell.innerHTML = ownername;
        owneremail_cell.innerHTML = owneremail;
        ownerphone_cell.innerHTML = ownerphone;
        if (startdtMonth != '' && startdtYear != '') {
            month = startdtMonth > 9 ? startdtMonth : "0"+startdtMonth;
            year = startdtYear > 999 ? startdtYear : "0"+startdtYear;
            startdate_cell.innerHTML = month + "/" + year;
        }
    }
}

// phone cannot have letters (upper or lower)
function validatePhone(control, required) {
    var phone = document.getElementById(control).value;
    phone = phone.trim();

    if ( phone.length == 0 && required == false ) {
        return true;
    }

    for (i=0; i<phone.length; i++) {
        var achar = phone.charAt(i);
        if (achar < '0' || achar > '9') {
            if ( achar != ' ' && achar != '(' && achar != ')' && achar != '-' && achar != '+') {
                return false;
            }
        }
    }
    return true;
}

function validateEmail(control, required) {
    var email = document.getElementById(control).value;
    email = email.trim();

    if (email.length == 0 && required == false) {
        return true;
    }

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhoneFields() {
    let phones = '{ ' +
    '"phone": {"name": "phone", "req":false }, ' +
    '"occup1_phone": {"name": "occup1_phone", "req":false }, ' +
    '"occup2_phone": {"name": "occup2_phone", "req":false }, ' +
    '"occup3_phone": {"name": "occup3_phone", "req":false }, ' +
    '"occup4_phone": {"name": "occup4_phone", "req":false }, ' +
    '"occup5_phone": {"name": "occup5_phone", "req":false }, ' +
    '"emerg_phone": {"name": "emerg_phone", "req":false } ' +
    ' } ';

    const phone_json = JSON.parse(phones);
    let controls = ["phone", "occup1_phone", "occup2_phone", "occup3_phone", "occup4_phone", "occup5_phone", "emerg_phone"];
    var validation_resp = [controls.length];
    var i = 0;

    controls.forEach (function(control) {
        validation_resp[i] = validatePhone(phone_json[control]['name'], phone_json[control]['req']);
        i += 1;
    });

    var count = 0;
    for (i=0; i<controls.length; i++) {
        if (validation_resp[i] == false) {
            count += 1;
        }
    }
    return count;
}

function validateEmailFields() {
    let controls = ["email", "occup1_email", "occup2_email", "occup3_email", "occup4_email", "occup5_email", "emerg_email"];
    let json_string = '{ ' +
    '"email": {"name": "email", "req":false }, ' +
    '"occup1_email": {"name": "occup1_email", "req":false }, ' +
    '"occup2_email": {"name": "occup2_email", "req":false }, ' +
    '"occup3_email": {"name": "occup3_email", "req":false }, ' +
    '"occup4_email": {"name": "occup4_email", "req":false }, ' +
    '"occup5_email": {"name": "occup5_email", "req":false }, ' +
    '"emerg_email": {"name": "emerg_email", "req":false } ' +
    ' } ';

    const json_obj = JSON.parse(json_string);
    var validation_resp = [controls.length];
    var i = 0;

    controls.forEach (function(control) {
        validation_resp[i] = validateEmail(json_obj[control]['name'], json_obj[control]['req']);
        i += 1;
    });

    var count = 0;
    for (i=0; i<controls.length; i++) {
        if (validation_resp[i] == false) {
            count += 1;
        }
    }
    return count;
}

function saveResident(pageName) {
    var request = new XMLHttpRequest();
    post_url = "/" + window.loggedin_tenant_global + "/saveresident";
    request.open('POST', post_url, true);

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'success') {
              alert('Record saved to database');
          }
          else {
              alert('Error saving record to database');
          }
      }
      else {
          alert('Error saving record to database');
      }

      location.reload();
    }

    var requestObj = new Object();
    requestObj.userid = document.getElementById('user_id_adm').value;
    requestObj.tenant = document.getElementById('loggedin-tenant').value;

    if ( document.getElementById('resident_type') != null) {
        requestObj.type = parseInt(document.getElementById('resident_type').value);
    }

    if ( document.getElementById('password') != null ) {
        requestObj.password = document.getElementById('password').value;
        if (requestObj.password.trim().length == 0) {
            alert('Password is a required field');
            return;
        }
    }

    var name = document.getElementById('name').value.trim();

    if (name.length == 0) {
        //displayMessage(ERROR_MSG, "Main occupant's name cannot be blank");
        alert("Main occupant's name cannot be blank");
        return;
    }

    if (validatePhoneFields() > 0) {
        //displayMessage(ERROR_MSG, "One or more phone fields have invalid content");
        alert("One or more phone fields have invalid content");
        return;
    }

    if (validateEmailFields() > 0) {
        alert("One or more email fields have invalid content");
        return;
    }

    requestObj.name = document.getElementById('name').value;
    requestObj.email = document.getElementById('email').value;
    requestObj.phone = document.getElementById('phone').value;

    const occupants = [];
    occupants[0]= new Object();
    occupants[1]= new Object();
    occupants[2]= new Object();
    occupants[3]= new Object();
    occupants[4]= new Object();

    startdt = new Object();
    startdt.month = parseInt(document.getElementById('startdt_month').value);
    startdt.year = parseInt(document.getElementById('startdt_year').value);
    requestObj.startdt = startdt;

    occupants[0].name = document.getElementById('occup1_name').value;
    occupants[0].email = document.getElementById('occup1_email').value;
    occupants[0].cc = document.getElementById('occup1_cc').checked;
    occupants[0].phone = document.getElementById('occup1_phone').value;
    occupants[0].has_key = document.getElementById('occup1_has_key').checked;

    occupants[1].name = document.getElementById('occup2_name').value;
    occupants[1].email = document.getElementById('occup2_email').value;
    occupants[1].cc = document.getElementById('occup2_cc').checked;
    occupants[1].phone = document.getElementById('occup2_phone').value;
    occupants[1].has_key = document.getElementById('occup2_has_key').checked;

    occupants[2].name = document.getElementById('occup3_name').value;
    occupants[2].email = document.getElementById('occup3_email').value;
    occupants[2].cc = document.getElementById('occup3_cc').checked;
    occupants[2].phone = document.getElementById('occup3_phone').value;
    occupants[2].has_key = document.getElementById('occup3_has_key').checked;

    occupants[3].name = document.getElementById('occup4_name').value;
    occupants[3].email = document.getElementById('occup4_email').value;
    occupants[3].cc = document.getElementById('occup4_cc').checked;
    occupants[3].phone = document.getElementById('occup4_phone').value;
    occupants[3].has_key = document.getElementById('occup4_has_key').checked;

    occupants[4].name = document.getElementById('occup5_name').value;
    occupants[4].email = document.getElementById('occup5_email').value;
    occupants[4].cc = document.getElementById('occup5_cc').checked;
    occupants[4].phone = document.getElementById('occup5_phone').value;
    occupants[4].has_key = document.getElementById('occup5_has_key').checked;

    requestObj.occupants = occupants;

    // emergency contact
    requestObj.emerg_name = document.getElementById('emerg_name').value;
    requestObj.emerg_email = document.getElementById('emerg_email').value;
    requestObj.emerg_phone = document.getElementById('emerg_phone').value;
    requestObj.emerg_has_key = document.getElementById('emerg_has_key').checked;

    // owner info (if rental)
    requestObj.ownername = document.getElementById('owner_name').value;
    requestObj.owneremail = document.getElementById('owner_email').value;
    requestObj.ownerphone = document.getElementById('owner_phone').value;
    requestObj.owneraddress = document.getElementById('owner_address').value;
    requestObj.isrental = document.getElementById('rental_unit_checkbox').checked;

    // additional info
    requestObj.oxygen_equipment = document.getElementById('oxygen_equipment').checked;
    requestObj.limited_mobility = document.getElementById('limited_mobility').checked;
    requestObj.routine_visits = document.getElementById('routine_visits').checked;
    requestObj.has_pet = document.getElementById('has_pet').checked;
    requestObj.bike_count = parseInt(document.getElementById('bike_count').value);
    requestObj.insurance_carrier = document.getElementById('insurance_carrier').value;

    // shutoff type
    // 0-don't know,  1-knob,  2-lever
    var valve_type = 0;
    if (document.getElementById('knob_radio').checked) {
        valve_type = 1;
    }
    else
    if (document.getElementById('lever_radio').checked) {
        valve_type = 2;
    }

    requestObj.valve_type = valve_type;

    // vehicles
    requestObj.no_vehicles = document.getElementById('vehicle_checkbox').checked;
    const vehicles = [];
    vehicles[0]= new Object();
    vehicles[1]= new Object();
    vehicles[0].make_model = document.getElementById('make_model_0').value;
    vehicles[0].plate = document.getElementById('plate_0').value;
    vehicles[0].color = document.getElementById('color_0').value;
    vehicles[0].year = parseInt(document.getElementById('year_0').value.trim());
    vehicles[1].make_model = document.getElementById('make_model_1').value;
    vehicles[1].plate = document.getElementById('plate_1').value;
    vehicles[1].color = document.getElementById('color_1').value;
    vehicles[1].year = parseInt(document.getElementById('year_1').value.trim());

    // assign vehicles to requestObj
    requestObj.vehicles = vehicles;

    if (pageName === 'profile') {
        if (resident_type == RESIDENT_TYPE) {
            requestObj.last_update_date = new Date().toLocaleDateString();
        }
        else
        if ( loggedin_user == document.getElementById('user_id_adm').value) {
            requestObj.last_update_date = new Date().toLocaleDateString();
        }
        else {
            requestObj.last_update_date = document.getElementById('last_update_date').value;
        }
    }

    if ( isNaN(requestObj.bike_count) || requestObj.bike_count < 0 ) {
        alert('Invalid content in number of bikes');
        return;
    }

    if ( requestObj.vehicles[0].year < 1900) {
        alert('Year of vehicle 1 must be 1900 or later');
        return;
    }

    if ( requestObj.vehicles[1].year < 1900) {
        alert('Year of vehicle 2 must be 1900 or later');
        return;
    }

    if (pageName === 'setup') {
        requestObj.last_update_date = '';
    }

    requestObj.notes = document.getElementById('notes').value;

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "resident": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

function handleFileSelect(e) {
    if (!e.target.files)
        return;

    var selDiv = document.getElementById(SELECTED_FILES_CONTROL);
    selDiv.innerHTML = "";

    var files = e.target.files;
    var file_name_string = '';
    var last = files.length - 1;

    for(var i=0; i<files.length; i++) {
        file_name_string += files[i].name;
        if (i < last) {
            file_name_string += ', ';
        }
    }

    document.getElementById('upload_button').disabled = file_name_string === '';
    selDiv.innerHTML = file_name_string;
}

function uploadPictureFiles(name, fileControl, barControl) {
    // retrieve the file object from the DOM
    let files = document.getElementById(fileControl).files;

    if (files.length == 0) {
        alert('Please select the folder where your pictures are');
        return;
    }

    if (name === UPLOAD_LISTING) {
        unit = document.getElementById('unit').value;
        title = document.getElementById('title').value;
        contact = document.getElementById('contact').value;
        price = document.getElementById('price').value;
        if (unit.trim().length == 0) {
            alert('Unit is a required field');
            return;
        }
        if (title.trim().length == 0) {
            alert('Title is a required field');
            return;
        }
        if (contact.trim().length == 0) {
            alert('Contact is a required field');
            return;
        }
        if (price.trim().length == 0) {
            alert('Price is a required field');
            return;
        }
    }

    if (name === UPLOAD_EVENT_PICTURE) {
        title = document.getElementById('title').value;
        event_date = document.getElementById('event_date').value;
        if (title.trim().length == 0) {
            alert('Title is a required field');
            return;
        }
        if (event_date.trim().length == 0) {
            alert('Event date is a required field');
            return;
        }
    }

    // test to make sure the user chose a file
    if (files == undefined || files == "") {
        alert('Please select a file before clicking the upload button.');
        return;
    }

    resp = confirm('Confirm you want to upload ' + files.length + ' pictures');
    if (resp == false) {
        return;
    }

    // create form data to send via XHR request
    var formData = new FormData();

    for (var i=0; i<files.length; i++) {
        // the 3rd param is the filename, which is retrieved on the server as "filename"
        formData.append("file_array",      files[i], files[i].name);
        formData.append("file_size_array", files[i], files[i].size);
    }

    if (name === UPLOAD_LISTING) {
        formData.append("unit", unit);
        formData.append("title", title);
        formData.append("contact", contact);
        formData.append("price", price);
    }
    else
    if (name === UPLOAD_EVENT_PICTURE) {
        formData.append("title", title);
        formData.append("date", event_date);
    }

    //create XHR object to send request
    var request = new XMLHttpRequest();

    var progressBar = document.getElementById(barControl);
    progressBar.value = 0;
    progressBar.style.display = 'inline';

    // add a progress event handler to the AJAX request
    request.upload.addEventListener('progress', event => {
        let totalSize = event.total; // total size of the file in bytes
        let loadedSize = event.loaded; // loaded size of the file in bytes
        // calculate percentage
        var percent = (event.loaded / event.total) * 100;
        progressBar.value = Math.round(percent);
    });

    // initializes a newly-created request
    if (name === UPLOAD_LISTING) {
        post_url = "/" + window.loggedin_tenant_global + "/upload_listing";
        request.open('POST', post_url, true);
    }
    else {
        post_url = "/" + window.loggedin_tenant_global + "/upload_event_pics";
        request.open('POST', post_url, true);
    }

    // ask to be notified when the upload is finished
	/* Holds the status of the XMLHttpRequest.
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    */
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            progressBar.value = 100;
            alert(files.length + ' pictures successfully uploaded');
            progressBar.style.display = "none";
            location.reload();
        }
    };

    // send request to the server
    request.send(formData);
}

function deletePictureFiles(name, key) {
    resp = confirm('Confirm you want to delete '+key);
    if (resp == false) {
        return;
    }

    //create XHR object to send request
    var request = new XMLHttpRequest();
    var requestObj = new Object();

    if (name === 'listing') {
        post_url = "/" + window.loggedin_tenant_global + "/delete_listing";
        request.open('POST', post_url, true)
        requestObj.unit = key;
    }
    else
    if (name === 'eventpics') {
        post_url = "/" + window.loggedin_tenant_global + "/delete_event_pics";
        request.open('POST', post_url, true)
        requestObj.title = key;
    }

    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);

    request.onload = function () {
        // Begin accessing JSON data here
        var json = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            if (json.response.status == 'success') {
                location.reload();
                return;
            }
        }
    }
}

/* invoked from docs.html */
function uploadFinancialStatement() {
    month = document.getElementById("rep-month").value.trim();
    year = document.getElementById("rep-year").value.trim();
    if (month.length > 2 || year.length != 4) {
        alert("The size of your Month or Year field is incorrect. Please fix it.");
        return;
    }
    month = parseInt(month, 10);
    if (month > 12 || month < 1) {
        alert("The Month field is incorrect. Please fix it.");
        return;
    }
    if (month.length == 1) {
        month = "0"+month;
    }

    rep_name = year + '-' + month;
    uploadFileProgress(rep_name, 'rep-file', 'rep-progress-bar')
}

function uploadFileProgress(convname, fileControl, barControl) {
    // retrieve the file object from the DOM
    let file = document.getElementById(fileControl).files[0];

    // test to make sure the user chose a file
    if (file == undefined || file == "") {
        alert('Please select a file before clicking the upload button.');
        return;
    }

    //print file details
    console.log("File Name : ",file.name);
    console.log("File size : ",file.size);
    console.log("File type : ",file.type);

    // create form data to send via XHR request
    var formData = new FormData();
    formData.append("file", file);
    formData.append("filesize", ''+file.size); // append only takes string as 2nd arg
    formData.append("convname", convname);

    //create XHR object to send request
    var request = new XMLHttpRequest();

    var progressBar = document.getElementById(barControl);
    progressBar.value = 0;
    progressBar.style.display="inline";

    // add a progress event handler to the AJAX request
    request.upload.addEventListener('progress', event => {
        let totalSize = event.total; // total size of the file in bytes
        let loadedSize = event.loaded; // loaded size of the file in bytes
        // calculate percentage
        var percent = (event.loaded / event.total) * 100;
        progressBar.value = Math.round(percent);
    });

    // initializes a newly-created request
    post_url = "/" + window.loggedin_tenant_global + "/upload";
    request.open('POST', post_url, true);

    // ask to be notified when the upload is finished
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            progressBar.value = 100;
            alert('File '+file.name + ' successfully uploaded');
            progressBar.style.display="none";
            location.reload(true);
        }
    };

    // send request to the server
    request.send(formData);
}

function uploadLink() {
    var link_url = document.getElementById('link_url').value.trim();
    var link_descr = document.getElementById('link_descr').value.trim();

    if ( link_url.length == 0  ||  link_descr.length == 0 ) {
        alert("A link and its description are required fields");
        return;
    }

    // here we make a request to "upload_link"
    var request = new XMLHttpRequest();
    post_url = "/" + window.loggedin_tenant_global + "/upload_link";
    request.open('POST', post_url, true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'error') {
              alert('error uploading a new link');
          }
          else {
              alert('Link successfully uploaded to the server');
              location.reload(true);
          }
      }
      else {
          alert('Error uploading the link');
      }

      return;
    }

    var requestObj = new Object();
    requestObj.link_url = link_url;
    requestObj.link_descr = link_descr;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}


function updateSystemSettings() {
    condo_name = document.getElementById('condo-name').value.trim();
    condo_tagline = document.getElementById('condo-tagline').value.trim();
    condo_address = document.getElementById('condo-address').value.trim();
    condo_zip = document.getElementById('condo-zip').value.trim();
    condo_location = document.getElementById('condo-location').value.trim();
    home_page_title = document.getElementById('home-page-title').value.trim();
    home_page_text = document.getElementById('home-page-text').value.trim();
    about_page_title = document.getElementById('about-page-title').value.trim();
    about_page_text = document.getElementById('about-page-text').value.trim();

    if ( condo_name.length == 0  ||  condo_tagline.length == 0  ||  condo_address.length == 0  ||  condo_location.length == 0 ) {
        alert("Condo Name, Tagline, Address, ZIP and Location are required fields");
        return;
    }

    if ( !isInteger(condo_zip) ) {
       alert('ZIP must be size 5 or 8 and only digits');
       return;
    }

    // here we make a request to "upload_link"
    var request = new XMLHttpRequest();
    post_url = "/" + window.loggedin_tenant_global + "/update_system_settings";
    request.open('POST', post_url, true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'error') {
              alert('error uploading system settings');
          }
          else {
              alert('Settings successfully uploaded to the server');
              location.reload(true);
          }
      }
      else {
          alert('Error uploading the settings');
      }

      return;
    }

    var requestObj = new Object();
    requestObj.condo_name = condo_name;
    requestObj.condo_tagline = condo_tagline;
    requestObj.condo_address = condo_address;
    requestObj.condo_zip = condo_zip;
    requestObj.condo_location = condo_location;
    requestObj.home_page_title = home_page_title;
    requestObj.about_page_title = about_page_title;
    requestObj.home_page_text = home_page_text;
    requestObj.about_page_text = about_page_text;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

function isInteger(strNumber) {
  return !isNaN(parseInt(strNumber)) && isFinite(strNumber);
}
