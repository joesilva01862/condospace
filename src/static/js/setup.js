/*
   This is invoked by setup.html to handle announcement related operations.
   Also used by setup.html to load units, loadSetup()
*/

const ADMIN_TYPE = 0;
const BOARD_MEMBER_TYPE = 1;
const SECRETARY_TYPE = 2;
const RESIDENT_TYPE = 3;

var resident_type = RESIDENT_TYPE;

var uiSetupMap = new Map();
uiSetupMap.set('unit', "unit");
uiSetupMap.set('restype', "resident_type");
uiSetupMap.set('user_id', "user_id");
uiSetupMap.set('password', "password");
uiSetupMap.set('name', "name");
uiSetupMap.set('email', "email");
uiSetupMap.set('phone', "phone");
uiSetupMap.set('startdt_month', 'startdt_month');
uiSetupMap.set('startdt_year', 'startdt_year');
uiSetupMap.set('occup1_name', 'occup1_name');
uiSetupMap.set('occup1_email', 'occup1_email');
uiSetupMap.set('occup1_cc', 'occup1_cc');
uiSetupMap.set('occup1_phone', 'occup1_phone');
uiSetupMap.set('occup1_has_key', 'occup1_has_key');
uiSetupMap.set('occup2_name', 'occup2_name');
uiSetupMap.set('occup2_email', 'occup2_email');
uiSetupMap.set('occup2_cc', 'occup2_cc');
uiSetupMap.set('occup2_phone', 'occup2_phone');
uiSetupMap.set('occup2_has_key', 'occup2_has_key');
uiSetupMap.set('occup3_name', 'occup3_name');
uiSetupMap.set('occup3_email', 'occup3_email');
uiSetupMap.set('occup3_cc', 'occup3_cc');
uiSetupMap.set('occup3_phone', 'occup3_phone');
uiSetupMap.set('occup3_has_key', 'occup3_has_key');
uiSetupMap.set('occup4_name', 'occup4_name');
uiSetupMap.set('occup4_email', 'occup4_email');
uiSetupMap.set('occup4_cc', 'occup4_cc');
uiSetupMap.set('occup4_phone', 'occup4_phone');
uiSetupMap.set('occup4_has_key', 'occup4_has_key');
uiSetupMap.set('occup5_name', 'occup5_name');
uiSetupMap.set('occup5_email', 'occup5_email');
uiSetupMap.set('occup5_cc', 'occup5_cc');
uiSetupMap.set('occup5_phone', 'occup5_phone');
uiSetupMap.set('occup5_has_key', 'occup5_has_key');
uiSetupMap.set('emerg_name', 'emerg_name');
uiSetupMap.set('emerg_email', 'emerg_email');
uiSetupMap.set('emerg_phone', 'emerg_phone');
uiSetupMap.set('emerg_has_key', 'emerg_has_key');
uiSetupMap.set('owner_name', 'owner_name');
uiSetupMap.set('owner_email', 'owner_email');
uiSetupMap.set('owner_phone', 'owner_phone');
uiSetupMap.set('owner_address', 'owner_address');
uiSetupMap.set('rental_unit_checkbox', 'rental_unit_checkbox');
uiSetupMap.set('oxygen_equipment', 'oxygen_equipment');
uiSetupMap.set('limited_mobility', 'limited_mobility');
uiSetupMap.set('routine_visits', 'routine_visits');
uiSetupMap.set('has_pet', 'has_pet');
uiSetupMap.set('bike_count', 'bike_count');
uiSetupMap.set('insurance_carrier', 'insurance_carrier');
uiSetupMap.set('knob_radio', 'knob_radio');
uiSetupMap.set('lever_radio', 'lever_radio');
uiSetupMap.set('vehicle_checkbox', 'vehicle_checkbox');
uiSetupMap.set('make_model_0', 'make_model_0');
uiSetupMap.set('plate_0', 'plate_0');
uiSetupMap.set('color_0', 'color_0');
uiSetupMap.set('year_0', 'year_0');
uiSetupMap.set('make_model_1', 'make_model_1');
uiSetupMap.set('plate_1', 'plate_1');
uiSetupMap.set('color_1', 'color_1');
uiSetupMap.set('year_1', 'year_1');
uiSetupMap.set('notes', 'notes');

var uiProfileMap = new Map();
uiProfileMap.set('unit', "selected_unit");
uiProfileMap.set('restype', "resident_type");
uiProfileMap.set('name', "name");
uiProfileMap.set('email', "email");
uiProfileMap.set('phone', "phone");
uiProfileMap.set('start_month', 'startdt_month');
uiProfileMap.set('start_year', 'startdt_year');
uiProfileMap.set('occup1_name', 'occup1_name');
uiProfileMap.set('occup1_email', 'occup1_email');
uiProfileMap.set('occup1_cc', 'occup1_cc');
uiProfileMap.set('occup1_phone', 'occup1_phone');
uiProfileMap.set('occup1_has_key', 'occup1_has_key');
uiProfileMap.set('occup2_name', 'occup2_name');
uiProfileMap.set('occup2_email', 'occup2_email');
uiProfileMap.set('occup2_cc', 'occup2_cc');
uiProfileMap.set('occup2_phone', 'occup2_phone');
uiProfileMap.set('occup2_has_key', 'occup2_has_key');
uiProfileMap.set('occup3_name', 'occup3_name');
uiProfileMap.set('occup3_email', 'occup3_email');
uiProfileMap.set('occup3_cc', 'occup3_cc');
uiProfileMap.set('occup3_phone', 'occup3_phone');
uiProfileMap.set('occup3_has_key', 'occup3_has_key');
uiProfileMap.set('occup4_name', 'occup4_name');
uiProfileMap.set('occup4_email', 'occup4_email');
uiProfileMap.set('occup4_cc', 'occup4_cc');
uiProfileMap.set('occup4_phone', 'occup4_phone');
uiProfileMap.set('occup4_has_key', 'occup4_has_key');
uiProfileMap.set('occup5_name', 'occup5_name');
uiProfileMap.set('occup5_email', 'occup5_email');
uiProfileMap.set('occup5_cc', 'occup5_cc');
uiProfileMap.set('occup5_phone', 'occup5_phone');
uiProfileMap.set('occup5_has_key', 'occup5_has_key');
uiProfileMap.set('emerg_name', 'emerg_name');
uiProfileMap.set('emerg_email', 'emerg_email');
uiProfileMap.set('emerg_phone', 'emerg_phone');
uiProfileMap.set('emerg_has_key', 'emerg_has_key');
uiProfileMap.set('owner_name', 'owner_name');
uiProfileMap.set('owner_email', 'owner_email');
uiProfileMap.set('owner_phone', 'owner_phone');
uiProfileMap.set('owner_address', 'owner_address');
uiProfileMap.set('rental_unit_checkbox', 'rental_unit_checkbox');
uiProfileMap.set('oxygen_equipment', 'oxygen_equipment');
uiProfileMap.set('limited_mobility', 'limited_mobility');
uiProfileMap.set('routine_visits', 'routine_visits');
uiProfileMap.set('has_pets', 'has_pets');
uiProfileMap.set('bike_count', 'bike_count');
uiProfileMap.set('insurance_carrier', 'insurance_carrier');
uiProfileMap.set('knob_radio', 'knob_radio');
uiProfileMap.set('lever_radio', 'lever_radio');
uiProfileMap.set('vehicle_checkbox', 'vehicle_checkbox');
uiProfileMap.set('make_model_0', 'make_model_0');
uiProfileMap.set('plate_0', 'plate_0');
uiProfileMap.set('color_0', 'color_0');
uiProfileMap.set('year_0', 'year_0');
uiProfileMap.set('make_model_1', 'make_model_1');
uiProfileMap.set('plate_1', 'plate_1');
uiProfileMap.set('color_1', 'color_1');
uiProfileMap.set('year_1', 'year_1');
uiProfileMap.set('notes', 'notes');

loggedin_id_global = null;
loggedin_userid_global = null;
loggedin_name_global = null;
loggedin_tenant_global = null;


/* invoked by setup.html */
function onLoadAction() {
    loggedin_id_global = document.getElementById('loggedin-id').value;
    loggedin_userid_global = document.getElementById('loggedin-userid').value;
    loggedin_name_global = document.getElementById('loggedin-name').value;
    loggedin_tenant_global = document.getElementById('loggedin-tenant').value.trim();
    setupRetrieveUsers(loggedin_tenant_global);
}

function setupRetrieveUsers(tenant) {
    var request = new XMLHttpRequest()
    post_url = "/" + loggedin_tenant_global + "/getresidents";
    request.open('POST', post_url, true);

    var requestObj = new Object();
    requestObj.tenant = tenant;
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          // populate table
          populateTable(json, 'adm_table_id', 'adm');
          populateTable(json, 'residents_table_id', 'resident');
      }
      else {
          alert('Error retrieving residents list')
      }
    }

    request.send(jsonStr);
}


function retrieveUser() {
  var request = new XMLHttpRequest();
  /*
  var unit_number = parseInt(document.getElementById('unit_delete').value.trim());

  if ( isNaN(unit_number) ) {
      alert('Type or select a unit number to retrieve data');
      return;
  }
*/


  var user_id = document.getElementById('user_id_delete').value;
  post_url = "/" + loggedin_tenant_global + "/getresident";
  request.open('POST', post_url, true);

  request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'not_found') {
              alert('Record not found for unit ' + user_id);
              return;
          }

          document.getElementById('name_delete').value = json.response.resident.name;
          document.getElementById('email_delete').value = json.response.resident.email;
          document.getElementById('phone_delete').value = json.response.resident.phone;
      }
      else {
          alert('Error retrieving user')
      }
    }

    var requestObj = new Object();
    requestObj.type = 'user';
    requestObj.tenant = document.getElementById('loggedin-tenant').value;
    requestObj.id = user_id;

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "request": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}


function deleteUser() {
  var request = new XMLHttpRequest();
  var user_id = document.getElementById('user_id_delete').value;

  if (user_id === 'none') {
      alert("Select a unit to be deleted");
      return;
  }

  if ( confirm("Confirm you want to delete unit "+user_id) == false) {
      return;
  }

  request.open('POST', '/deleteresident', true)

  request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'success') {
              alert('Unit '+user_id+' deleted from the database');
              location.reload();
              return;
          }
          else {
              alert('An error happened trying to delete Unit '+user_id);
              return;
          }
      }
      else {
          alert('Error deleting user');
          return;
      }
    }

    var requestObj = new Object();
    requestObj.type = 'user';
    requestObj.tenant = document.getElementById('loggedin-tenant').value;
    requestObj.value = user_id;

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "resident": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}

function deleteUserParam(user_id) {
  var request = new XMLHttpRequest();

  if (user_id === 'none') {
      alert("Select a unit to be deleted");
      return;
  }

  if ( confirm("Confirm you want to delete unit "+user_id) == false) {
      return;
  }

  request.open('POST', '/deleteresident', true)

  request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          if (json.response.status == 'success') {
              alert('Unit '+user_id+' deleted from the database');
              location.reload();
              return;
          }
          else {
              alert('An error happened trying to delete Unit '+user_id);
              return;
          }
      }
      else {
          alert('Error deleting user');
          return;
      }
    }

    var requestObj = new Object();
    requestObj.type = 'user';
    requestObj.tenant = document.getElementById('loggedin-tenant').value;
    requestObj.value = user_id;

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "resident": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}



/*
function setupSaveResident(pageName) {
    var pageMap = new Map();
    if (pageName === 'setup') {
        pageMap = uiSetupMap;
    }
    else {
        pageMap = uiProfileMap;
    }

    var request = new XMLHttpRequest();
    request.open('POST', '/saveresident', true);

    request.onload = function () {
      // Begin accessing JSON data here
      var json = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
          alert('Record saved to database');
      }
      else {
          alert('Error saving record to database');
      }

      cleanScreen();
    }

    var requestObj = new Object();

    if (pageName === 'setup') {
        //requestObj.unit = document.getElementById(pageMap.get('unit')).value;
        requestObj.userid = document.getElementById(pageMap.get('user_id')).value;
        requestObj.type = parseInt(document.getElementById(pageMap.get('restype')).value);
        requestObj.password = document.getElementById(pageMap.get('password')).value;
    }
    else {
        if (resident_type == ADMIN_TYPE) {
            requestObj.unit = parseInt(document.getElementById(pageMap.get('selected_unit')).innerHTML);
            requestObj.userid = document.getElementById(pageMap.get('selected_user_id')).innerHTML;
            requestObj.type = parseInt(document.getElementById(pageMap.get('resident_type')).value);
        }
        else
        if (resident_type == BOARD_MEMBER_TYPE || resident_type == SECRETARY_TYPE) {
            requestObj.unit = parseInt(document.getElementById(pageMap.get('selected_unit')).innerHTML);
            requestObj.userid = document.getElementById(pageMap.get('selected_user_id')).innerHTML;
            requestObj.type = parseInt(resident_type);
        }
        else { // this is for RESIDENT_TYPE
            requestObj.unit = parseInt(document.getElementById(pageMap.get('unit')).innerHTML);
            requestObj.userid = document.getElementById(pageMap.get('user_id')).innerHTML;
            requestObj.type = parseInt(resident_type);
        }
    }

    requestObj.name = document.getElementById(pageMap.get('name')).value;
    requestObj.email = document.getElementById(pageMap.get('email')).value;
    requestObj.phone = document.getElementById(pageMap.get('phone')).value;

    const occupants = [];
    occupants[0]= new Object();
    occupants[1]= new Object();
    occupants[2]= new Object();
    occupants[3]= new Object();
    occupants[4]= new Object();

    startdt = new Object();
    startdt.month = parseInt(document.getElementById(pageMap.get('startdt_month')).value);
    startdt.year = parseInt(document.getElementById(pageMap.get('startdt_year')).value);
    requestObj.startdt = startdt;

    occupants[0].name = document.getElementById(pageMap.get('occup1_name')).value;
    occupants[0].email = document.getElementById(pageMap.get('occup1_email')).value;
    occupants[0].cc = document.getElementById(pageMap.get('occup1_cc')).checked;
    occupants[0].phone = document.getElementById(pageMap.get('occup1_phone')).value;
    occupants[0].has_key = document.getElementById(pageMap.get('occup1_has_key')).checked;

    occupants[1].name = document.getElementById(pageMap.get('occup2_name')).value;
    occupants[1].email = document.getElementById(pageMap.get('occup2_email')).value;
    occupants[1].cc = document.getElementById(pageMap.get('occup2_cc')).checked;
    occupants[1].phone = document.getElementById(pageMap.get('occup2_phone')).value;
    occupants[1].has_key = document.getElementById(pageMap.get('occup2_has_key')).checked;

    occupants[2].name = document.getElementById(pageMap.get('occup3_name')).value;
    occupants[2].email = document.getElementById(pageMap.get('occup3_email')).value;
    occupants[2].cc = document.getElementById(pageMap.get('occup3_cc')).checked;
    occupants[2].phone = document.getElementById(pageMap.get('occup3_phone')).value;
    occupants[2].has_key = document.getElementById(pageMap.get('occup3_has_key')).checked;

    occupants[3].name = document.getElementById(pageMap.get('occup4_name')).value;
    occupants[3].email = document.getElementById(pageMap.get('occup4_email')).value;
    occupants[3].cc = document.getElementById(pageMap.get('occup4_cc')).checked;
    occupants[3].phone = document.getElementById(pageMap.get('occup4_phone')).value;
    occupants[3].has_key = document.getElementById(pageMap.get('occup4_has_key')).checked;

    occupants[4].name = document.getElementById(pageMap.get('occup5_name')).value;
    occupants[4].email = document.getElementById(pageMap.get('occup5_email')).value;
    occupants[4].cc = document.getElementById(pageMap.get('occup5_cc')).checked;
    occupants[4].phone = document.getElementById(pageMap.get('occup5_phone')).value;
    occupants[4].has_key = document.getElementById(pageMap.get('occup5_has_key')).checked;

    requestObj.occupants = occupants;

    // emergency contact
    requestObj.emerg_name = document.getElementById(pageMap.get('emerg_name')).value;
    requestObj.emerg_email = document.getElementById(pageMap.get('emerg_email')).value;
    requestObj.emerg_phone = document.getElementById(pageMap.get('emerg_phone')).value;
    requestObj.emerg_has_key = document.getElementById(pageMap.get('emerg_has_key')).checked;

    // owner info (if rental)
    requestObj.ownername = document.getElementById(pageMap.get('owner_name')).value;
    requestObj.owneremail = document.getElementById(pageMap.get('owner_email')).value;
    requestObj.ownerphone = document.getElementById(pageMap.get('owner_phone')).value;
    requestObj.owneraddress = document.getElementById(pageMap.get('owner_address')).value;
    requestObj.isrental = document.getElementById(pageMap.get('rental_unit_checkbox')).checked;

    // additional info
    requestObj.oxygen_equipment = document.getElementById(pageMap.get('oxygen_equipment')).checked;
    requestObj.limited_mobility = document.getElementById(pageMap.get('limited_mobility')).checked;
    requestObj.routine_visits = document.getElementById(pageMap.get('routine_visits')).checked;
    requestObj.has_pet = document.getElementById(pageMap.get('has_pet')).checked;
    requestObj.bike_count = parseInt(document.getElementById(pageMap.get('bike_count')).value);
    requestObj.insurance_carrier = document.getElementById(pageMap.get('insurance_carrier')).value;

    // shutoff type
    // 0-don't know,  1-knob,  2-lever
    var valve_type = 0;
    if (document.getElementById(pageMap.get('knob_radio')).checked) {
        valve_type = 1;
    }
    else
    if (document.getElementById(pageMap.get('lever_radio')).checked) {
        valve_type = 2;
    }

    requestObj.valve_type = valve_type;

    // vehicles
    requestObj.no_vehicles = document.getElementById(pageMap.get('vehicle_checkbox')).checked;
    const vehicles = [];
    vehicles[0]= new Object();
    vehicles[1]= new Object();
    vehicles[0].make_model = document.getElementById(pageMap.get('make_model_0')).value;
    vehicles[0].plate = document.getElementById(pageMap.get('plate_0')).value;
    vehicles[0].color = document.getElementById(pageMap.get('color_0')).value;
    vehicles[0].year = parseInt(document.getElementById(pageMap.get('year_0')).value.trim());
    vehicles[1].make_model = document.getElementById(pageMap.get('make_model_1')).value;
    vehicles[1].plate = document.getElementById(pageMap.get('plate_1')).value;
    vehicles[1].color = document.getElementById(pageMap.get('color_1')).value;
    vehicles[1].year = parseInt(document.getElementById(pageMap.get('year_1')).value.trim());

    // assign vehicles to requestObj
    requestObj.vehicles = vehicles;

    if (pageName === 'profile') {
        if (resident_type == RESIDENT_TYPE) {
            requestObj.last_update_date = new Date().toLocaleDateString();
        }
        else
        if ( loggedin_user == document.getElementById(pageMap.get('selected_user_id')).innerHTML) {
            requestObj.last_update_date = new Date().toLocaleDateString();
        }
        else {
            requestObj.last_update_date = document.getElementById(pageMap.get('last_update_date')).value;
        }
    }

    requestObj.password = document.getElementById(pageMap.get('password')).value;

    if (requestObj.password.trim().length == 0) {
        alert('Password is a required field');
        return;
    }

    if (requestObj.unit.trim().length == 0) {
        alert('Unit # is a required field');
        return;
    }


    if ( Number(requestObj.unit) < 1) {
        alert('Unit # must be 1 or greater');
        return;
    }

    if (requestObj.userid.trim().length == 0) {
        alert('User Id is a required field');
        return;
    }

    if ( !isNaN(requestObj.vehicles[0].year) ) {
        if ( requestObj.vehicles[0].year < 1900) {
            alert('Year of vehicle 1 must be 1900 or later');
            return;
        }
    }

    if ( !isNaN(requestObj.vehicles[1].year) ) {
        if ( requestObj.vehicles[1].year < 1900) {
            alert('Year of vehicle 2 must be 1900 or later');
            return;
        }
    }

    if (pageName === 'setup') {
        requestObj.last_update_date = '';
    }

    requestObj.notes = document.getElementById(pageMap.get('notes')).value;

    if (requestObj.name === '') {
        alert('Head of household name is a required field');
        return;
    }

    // const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    jsonStr = '{ "resident": ' + JSON.stringify(requestObj) + '}';
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(jsonStr);
}
*/
