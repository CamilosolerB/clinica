$(document).ready(function(){

    $('.btnfil').on('click',function(){
        alert("botn consulta")
    
        let btn=$('.btnfil').index(this);
        let documentodoct=$('.doctor').eq(btn);
        let documentopac=$('.paciente').eq(btn);
        let fecha=$('.fecha').eq(btn);

        let dd=documentodoct.val();
        let dp=documentopac.val();
        let f=clave.val();
    
        //alert(d+"\n"+n+"\n"+c+"\n"+r+"\n"+e+"\n"+i)
    
        $.ajax({
        
            type:"POST",
            url:"/pdf",
            data:{
                docdoctor:dd,docpac:dp,fecha:f
            }
        })
    
    
    })
})