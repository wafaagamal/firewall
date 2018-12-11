
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

module.exports={
    roles,
    regHirarical
}