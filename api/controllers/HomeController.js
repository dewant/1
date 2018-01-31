/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function rand_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	index: function(req, res) {

		var rand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var pegawai, posisi, kota;
		var data_posisi=[], data_kota=[];
		var kota_id				= req.params.kota_id;
		
		data_kota = [
			// {
			//   value : 	
			//   Pegawai.find({kota: kota_id}).exec(function(err, pegawais){
			// 	  var number = 0;
			// 	  pegawais.forEach(function(pegawai){
			// 		  pegawai.number 	= number;
			// 		  pegawai.act 	= '<div class="btn-group"><button classexec="btn btn-warning btn-pegawai-update" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-pegawai-delete" data-id="'+pegawai.id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-pegawai-detail" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
			// 		  number++;		
			// 	  });
	  
			// 	  var data = {
			// 		  "data" : pegawais
			// 	  };
	  
			// 	  res.send(data);
			//   label : Pegawai.find(kota).exec(function(err, pegawais){
			// 	  pegawais.forEach(function(pegawai){
			// 		  var data = {
			// 			  "data" : pegawais
			// 		  };
			// 	  })

			//   })
			//   color : '#ff0000'
			// },
		
			{
			  value : 0,
			  label : 'Solo',
			  color : '#ffff00'
			},
			{
				value : 8,
				label : 'Cilacap',
				color : '#ffff00'
			  },
			{
				value : 1,
				label : 'Surabaya',
				color : '#00ff00',
			},

			{
				value : 1,
				label : 'Bali',
				color : '#0000ff'
			},

			{
				value : 1,
				label : 'Palembang',
				color : '#ffffff'
			},

			{
				value : 1,
				label : 'Banjarmasin',
				color : '#00ffff'
			}
		  ];


		  data_posisi = [
			{
				value : 3,
				label : 'IT',
				color : '#ff0000'
			  },
		  
			  {
				value : 1,
				label : 'Manager',
				color : '#ffff00'
			  },
  
			  {
				  value : 0,
				  label : 'HRD',
				  color : '#ffffff'
				},
  
			  {
				  value : 1,
				  label : 'Sekertaris',
				  color : '#0000ff'
			  },
  
			  {
				  value : 2,
				  label : 'CEO',
				  color : '#00ff00'
				  
			  },
  
			  {
				  value : 1,
				  label : 'Teknisi',
				  color : '#00ffff'
			  }
			];
  
		

		Posisi.count().exec(function(err, posisis){
			Kota.count().exec(function(err, kotas){
				Pegawai.count().exec(function(err, pegawais){
					Cuti.count().exec(function(err, cutis){

					
					res.view('home', {
						"jml_posisi"	: posisis,
						"jml_kota"		: kotas,
						"jml_pegawai"	: pegawais,
						"jml_cuti"		: cutis,
						"data_posisi"	: data_posisi,
						"data_kota"		: data_kota
					})
				})
				})
			});
		});

//  var async = require('async');

// function rand_number(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// module.exports = {
// 	index: function(req, res) {

// 		var rand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// 		var pegawai, posisi, kota;
// 		var data_posisi=[], data_kota=[];


// 		data_kota = [
// 			{
// 			  value : 5,
// 			  label : 'Semarang',
// 			  color : '#FF0000'
// 			},
		
// 			{
// 			  value : 0,
// 			  label : 'Solo',
// 			  color : '#00ff00'
// 			},

// 			{
// 				value : 1,
// 				label : 'Surabaya',
// 				color : '#0061ff'
// 			  },

// 			{
// 				value : 1,
// 				label : 'Bali',
// 				color : '#faff00'
// 			},

// 			{
// 				value : 1,
// 				label : 'Palembang',
// 				color : '#ffffff'
// 			},

// 			{
// 				value : 1,
// 				label : 'Banjarmasin',
// 				color : '#000000'
// 			}
// 		  ];
		

		
// 		var respon_data = {};
// 		async.series([
// 			function(callback){
// 				Posisi.count().exec((err, count)=>{
// 					respon_data.jml_posisi = count;
// 					callback();
// 				})
// 			},

// 			function(callback){
// 				Kota.count().exec((err, count)=>{
// 					respon_data.jml_kota = count;
// 					callback();
// 				});
// 			},

// 			function(callback){
// 				Pegawai.count().exec((err, count)=>{
// 					respon_data.jml_pegawai = count;
// 					callback();
// 				});
// 			},


// 		],


// 		function(err){
// 			respon_data.data_posisi = [];
// 			respon_data.data_kota = [];
// 			res.view('home', respon_data );
// 		});

		// {
		// 	"jml_posisi"	: posisis,
		// 	"jml_kota"		: kotas,
		// 	"jml_pegawai"	: pegawais,
		// 	"data_posisi"	: data_posisi,
		// 	"data_kota"		: data_kota
		// }

	}
};

