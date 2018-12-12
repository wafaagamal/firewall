
var regHirarical={
    admin:['admin','stackholder']
}

var roles={
    admin:{
        name:'admin',
        maxTicketUsagePerHour: 100,
        maxLogins:1,
        ticketValidationInDays:30
    },
    stackholder:{
        name:'stackholder',
        maxTicketUsagePerHour: 100,
        maxLogins:1,
        ticketValidationInDays:30
    }
}
var getRole=function(role){
    return roles[role]
}
module.exports={
    roles,
    regHirarical,
    getRole
}