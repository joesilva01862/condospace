
loggedin_id_global = null;
loggedin_userid_global = null;
loggedin_name_global = null;
loggedin_tenant_global = null;

function onLoadAction() {
    loggedin_id_global = document.getElementById('loggedin-id').value;
    loggedin_userid_global = document.getElementById('loggedin-userid').value;
    loggedin_name_global = document.getElementById('loggedin-name').value;
    loggedin_tenant_global = document.getElementById('loggedin-tenant').value.trim();
}

function handleUnitSelected() {

}

/* this makes the text be only numbers, no decimal sign */
function isNumberKey(txt, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    /*
    if (charCode == 46) {
        //Check if the text already contains the . character
        if (txt.value.indexOf('.') === -1) {
            return true;
        }
        return false;
    }
    */
    if (charCode < 48 || charCode > 57) {
        return false;
    }
    return true;
}

