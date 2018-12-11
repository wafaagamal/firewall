
var length =  {
	
    arFullname: {
        min: 10,
        max: 100
    },
    nationality: {
        min:3,
        max:100
    },
    fullname: {
        min: 3,
        max: 30
    },
    password: {
        min: 8,
        max: 30
    },
    pin: {
        min: 7,
        max: 15
    },
    mobile:{
        min:8,
        max:16
    },
    day: {
        min: 1,
        max: 2
    },
    month: {
        min: 1,
        max: 2
    },
    year: {
        min:4, 
        max:4
    },
    nationalId:{
        min:14,
        max:14
    },
    shortId:{
        min: 1,
        max: 30
    },
    desc: {
        min: 10,
        max: 200
    },
    arDesc: {
        min: 3,
        max: 100
    },
    dateMMYY:{
        min: 6,
        max: 6
    },
    dateDDMMYY:{
        min: 8,
        max: 8
    },
    serialNumber: {
        min: 1,
        max: 12
    },
    egMobileNumber:{
        min:11,
        max:11
    },
    easyUUID: {
        min:10,
        max:40
    },
    username: {
        min: 6,
        max: 30
    },
    carId: {
        min:5,
        max:10
    },
    longNumber: {
        min:1,
        max:4
    },
    email:{
        min:5,
        max:100
    }

}

var regex = {

url: "((https?:\\/\\/(?:www\\.|(?!www)))?[^\\s\\.]+\\.[^\\s]{2,}|www\\.[^\\s]+\\.[^\\s]{2,})",
email: "^[-a-zA-Z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-zA-Z0-9~!$%^&*_=+}{\\'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\\.[-a-zA-Z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$",
pin: "^[0-9]{" + length.pin.min + "," + length.pin.max + "}$",
password:"^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{" + length.password.min + "," + length.password.max + "}$",
hex: "^#?([a-f0-9]{6}|[a-f0-9]{3})$",
slug: "^[a-z0-9-]+$",
htmlTag: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
number: "^[0-9]+$",
longNumber: "^[0-9]{"+length.longNumber.min +","+length.longNumber.max +"}$",
shortId: "^[0-9]{"+length.shortId.min +","+ length.shortId.max+"}$",
year: "^[0-9]{4}$",
serialNumber: "^[0-9\\u0660-\\u0669]{"+length.serialNumber.min +","+ length.serialNumber.max+"}$",
arDesc: "^[\\u0621-\\u064A0-9\\u0660-\\u0669 \\d$@$!%*?& \\-\\n\r\\.]{"+length.arDesc.min+","+length.arDesc.max+"}$",
desc: "^[a-zA-Z0-9\\s]{"+length.desc.min + "," + length.desc.max+"}$",
carId : "^[\\u0621-\\u064A0-9\\u0660-\\u0669\\d]{"+length.carId.min+","+length.carId.max+"}$",
arFullname: "^[\\u0621-\\u064A\\s]{"+ length.arFullname.min +"," + length.arFullname.max +"}$",
fullname:"^([a-zA-Z]{3,10}(\\s[a-zA-Z]{3,10}){1,2})$",
nationalId: "^(2|3)[0-9][0-9][0-1][0-9][0-3][0-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\\d\\d\\d\\d\\d$",
egMobileNumber:"^01[0125]{1}[0-9]{8}$",
egLandline: "^(0)?[2]+[0-9][-]*(\\d{4})[-]*(\\d{3})$",
dateMMYY: "^(0[1-9]|1[0-2])\\/?([0-9]{4})$",
MMDDYY: "^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$",
dateDDMMYY: "^(0[0-2]|1[0-9]|2[0-9]|3[0-1])(0[1-9]|1[0-2])([0-9]{4})$",
coordinates : "^-?[0-9]{1,3}[.][0-9]{1,}$",
nd: function(nf,nt,df,dt){return `^[0-9]{${nf},${nt}}(\\.[0-9]{${df},${dt}})?$`},
mongoId: "^(?=[a-f\\d]{24}$)(\\d+[a-f]|[a-f]+\\d)",
uuid: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
easyUUID: "^[a-z]{1,20}-[a-z]{1,20}-[0-9]{8}$",
negativeShortId: "^-?\\d{"+length.shortId.min +","+ length.shortId.max+"}$",
username: "^[a-zA-Z0-9]{"+length.username.min +","+ length.username.max+"}$",
nationality: "^[a-zA-Z]{"+length.nationality.min +","+ length.nationality.max+"}$"
}

module.exports = {
length: length,
regex: regex
}