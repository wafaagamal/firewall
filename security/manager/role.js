
module.exports = {
    isRoleAllowed: function(req, allowedRoles){
        var allowed = allowedRoles.find(e=>e == req.ticket.data.role);
        return (allowed)? true:false;
    }
}