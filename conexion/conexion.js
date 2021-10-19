const mysql =  require('mysql')
module.exports=()=>
mysql.createConnection({
    host:'bgiebq8wmwx2ho0v9gpb-mysql.services.clever-cloud.com',
    user:'ujpuwetrdavzgjdn',
    password:'PMmPRJrfXjJXRl0Q8LGT',
    port:'3306',
    database:'bgiebq8wmwx2ho0v9gpb'
})