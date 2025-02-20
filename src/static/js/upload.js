/*
loggedin_id = document.getElementById('loggedin-id').value;
loggedin_name = document.getElementById('loggedin-name').value;
loggedin_tenant = document.getElementById('loggedin-tenant').value;
*/

loggedin_id_global = null;
loggedin_userid_global = null;
loggedin_name_global = null;
loggedin_tenant_global = null;


function onLoadAction() {
    loggedin_id_global = document.getElementById('loggedin-id').value;
    loggedin_userid_global = document.getElementById('loggedin-userid').value;
    loggedin_name_global = document.getElementById('loggedin-name').value;
    loggedin_tenant_global = document.getElementById('loggedin-tenant').value.trim();
    document.getElementById("email-progress-bar").style.display = "none";
    fillAnnouncs();
    retrieveUsers();
    fillSystemSettings();
}


/*
   This is invoked by upload.html to fill the announcements text box.
   Unfortunately, this cannot be placed in announcs.js because
   doing so would force us to import announcs.js from upload.html,
   which would create a double "onLoadAction()" function
*/
function fillAnnouncs() {
    var request = new XMLHttpRequest()
    get_url = "/" + loggedin_tenant_global + "/getannouncs";
    request.open('GET', get_url, true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          var announcs_text = '';
          for (var i=0; i<json.announcs.length; i++) {
              announcs_text += json.announcs[i] + '\n';
          }
          document.getElementById('announctextfield_id').innerHTML = announcs_text;
      }
      else {
          alert('Error retrieving announcements list')
      }

    }
    request.send();
}

function fillSystemSettings() {
    var request = new XMLHttpRequest()
    get_url = "/" + loggedin_tenant_global + "/get_system_settings";
    request.open('GET', get_url, true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          document.getElementById('condo-name').value = json.config['condo_name'];
          document.getElementById('condo-tagline').value = json.config['tagline'];
          document.getElementById('condo-address').value = json.config['address'];
          document.getElementById('condo-zip').value = json.config['zip'];
          document.getElementById('condo-location').value = json.config['condo_location'];
          document.getElementById('home-page-title').value = json.config.home_message.title;
          document.getElementById('about-page-title').value = json.config.about_message.title;
          document.getElementById('home-page-text').value = json.config.home_message.text;
          document.getElementById('about-page-text').value = json.config.about_message.text;
      }
      else {
          alert('Error retrieving announcements list')
      }

    }
    request.send();
}

/*
   This is invoked by upload.html to save announcements.
   Unfortunately, this cannot be placed in announcs.js because
   doing so would force us to import announcs.js from upload.html,
   which would create a double "onLoadAction()" function
*/
function saveAnnouncs() {
    var announcs = document.getElementById("announctextfield_id").value;
    var request = new XMLHttpRequest();
    request.open('POST', '/saveannouncs', true)

    var requestObj = new Object();
    requestObj.lines = announcs;
    jsonStr = '{ "announc": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'success') {
              alert('Announcements have been saved.');
              return;
          }
          else {
              alert('There was a problem trying to save the announcements.');
              return;
          }
      }
      else {
          alert('Error saving the announcements.');
          return;
      }
    }
}

/*
async function uploadFile(filename) {
    let formData = new FormData();
    var fileupload = document.getElementById(filename);

    if (fileupload.files[0] == undefined || fileupload.files[0] == "") {
  	    alert('Please select a document file before clicking the upload button.');
  	    return;
    }

    formData.append("file", fileupload.files[0]);
    formData.append("convname", filename);

    await fetch('/upload', {
      method: "POST",
      body: formData
    }).then(response => {
      if (!response.ok) {
         alert('The file upload has failed.');
      }
      else {
         alert('File upload was successful.');
      }
    });
}
*/

function deleteFile(filepath, filename) {
    var request = new XMLHttpRequest()
    request.open('POST', '/deletefile', true)

    request.onload = function () {
        // Begin accessing JSON data here
        var json = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            if (json.status == 'success') {
                alert('File ' + filename + ' has been deleted.');
                location.reload(true);
            }
            else {
                alert("Some error occurred trying to delete file "+filename);
            }
        }
        else {
            alert('Error communicating with the server.');
        }
    }

    var requestObj = new Object();
    requestObj.filepath = filepath;
    requestObj.filename = filename;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

// we retrieve the user data from the database first
// then we use that data to send him an email.
function startSendEmail() {
    var userid = document.getElementById("userid").value;
    var request = new XMLHttpRequest();
    request.open('POST', '/getresident', true)

    var requestObj = new Object();
    requestObj.type = 'user';
    requestObj.id = userid;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'not_found') {
              alert('Record not found for User Id '+userid);
              return;
          }

          if (json.response.resident.email.trim().length == 0) {
              alert("User doesn't have an email address on file");
              return;
          }

          sendEmail(json);
      }
      else {
          alert('Error retrieving user');
          return;
      }
    }
}

function retrieveUsers() {
    var request = new XMLHttpRequest()
    post_url = "/" + loggedin_tenant_global + "/getresidents";
    request.open('POST', post_url, true)
    var requestObj = new Object();
    requestObj.tenant = loggedin_tenant_global;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          // populate table
          populateTable(json, 'residents_table_id', 'resident');
      }
      else {
          alert('Error retrieving residents list')
      }

    }

    request.send(jsonStr);
}

function sendEmail(json) {
    var userid = json.response.resident.userid;
    var passw = json.response.resident.password;
    var email = json.response.resident.email;

    // here we make a request to "sendsinglemail"
    var request = new XMLHttpRequest();
    request.open('POST', '/sendsinglemail', true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'error') {
              alert('error sending email to user');
          }
          else {
              alert('Email sent to user');
          }
      }
      else {
          alert('Error sending email');
      }

      return;
    }

    var requestObj = new Object();
    requestObj.emailto = email;
    requestObj.subject = 'Your whitegatecondo.com info';
    requestObj.body = 'Your credential to access whitegatecondo.com:\n\nusername: ' + userid + "\npassword: " + passw ;

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

async function updateProgressBar(percent) {
    var element = document.getElementById("status-bar");
    element.style.width = percent + '%';
    element.innerHTML = percent + '%';
}

async function sendBulkEmail() {
    var requestObj = new Object();
    requestObj.subject = document.getElementById('titlefield_id').value;
    requestObj.body = document.getElementById('emailtextfield_id').value;

    if ( requestObj.subject.trim().length == 0 || requestObj.body.trim().length == 0 ) {
        alert("Title and Body of the message are required");
        return;
    }

    // show the progress bar
    document.getElementById("email-progress-bar").style.display = "block";

    // init progress bar data
    updateProgressBar(1);

    try {
      // start a task on the server
      const res = await fetch("/sendmail", {
         // Adding method type
         method: "POST",
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         // Adding body or contents to send
         body: JSON.stringify({
             subject: requestObj.subject,
             body: requestObj.body
         }),
      });

      // init a timer, trigger every 1 second
      timeout = setInterval(getStatus, 1000);
    } catch (e) {
      console.error("Error: ", e);
    }
}

// function will be invoked by the timer until server returns 100 (i.e.100%)
async function getStatus() {
    let status;

    try {
      const res = await fetch("/getstatus");
      status = await res.json();
    } catch (e) {
      console.error("Error: ", e);
    }

    updateProgressBar(status.percent);

    if (status.percent == 100) {
      clearInterval(timeout);
      document.getElementById("progress-bar").style.display = "none";
      alert('Email sent to all users');
      document.getElementById('titlefield_id').value = '';
      document.getElementById('emailtextfield_id').value = '';
      return false;
    }
}

async function sendPasswordReset() {
    var requestObj = new Object();
    requestObj.unit_id = document.getElementById('reset_unit').value;
    requestObj.recipient_email = document.getElementById('recipient_email').value;

    if ( requestObj.unit_id < 1 || requestObj.unit_id > 53 ) {
        alert("Choose a unit number whose password will be reset");
        return;
    }

    // start a task on the server
    fetch("/resetpassword", {
       // Adding method type
       method: "POST",
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       // Adding body or contents to send
       body: JSON.stringify({
           unit_id: requestObj.unit_id,
           recipient_email: requestObj.recipient_email
       }),
    }).then( async (resp) => {
        if (resp.ok) {
           resp_json = await resp.json();
           alert('Email sent to '+resp_json.response.owner_email + ' and ' + resp_json.response.authorized_email);
        }
        else {
            console.error("An error occurred while resetting password.");
            alert("An error occurred while resetting password. Please try again.");
        }
    });
}

// Description of the link is the key
function deleteLink(link_descr) {
    // here we make a request to "upload_link"
    var request = new XMLHttpRequest();
    request.open('POST', '/delete_link', true)

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'error') {
              alert('error uploading a new link');
          }
          else {
              alert("Link '"+link_descr +"' deleted from the list");
              location.reload();
          }
      }
      else {
          alert('Error deleting the link');
      }

      return;
    }

    var requestObj = new Object();
    requestObj.link_descr = link_descr;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

