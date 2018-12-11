var admin={
 email:'wafaa@example.com',
 password:'wafaa@2000'
}
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
    admin,
    regHirarical
}