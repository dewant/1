module.exports = {
    group : function(){
        Pegawai.sum({groupBy:'kota'}).exec((err, jml_kota)=>{
            console.log(jml_kota);
        })
    }
}