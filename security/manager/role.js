
module.exports = {
    isRoleAllowed: function(req, allowedRoles){
       // console.log(req);
        //console.log("ROLLLLLLLLLLLLLLLLE",req.ticket.role);
        var allowed = allowedRoles.find(e=>e == req.ticket.data.role);
        return (allowed)? true:false;
    }
}