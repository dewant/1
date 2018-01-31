/**
 * KotaController
 *
 * @description :: Server-side logic for managing kotas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Excel 	= require('exceljs');
module.exports = {
	index: function(req, res) {
		 	res.view('kota/index');
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	res.view('kota/index');
		// }
	},
	get: function(req, res) {
		Kota.find().exec(function(err, kotas){
			var number = 0;
			kotas.forEach(function(kota){
					kota.number 	= number;
					kota.act 	= '<div class="btn-group"><button class="btn btn-warning btn-kota-update" data-id="'+kota.id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-kota-delete" data-id="'+kota.id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-kota-detail" data-id="'+kota.id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
					number++;				
			})
			var data = {
				"data" : kotas
			};

				res.send(data);
		})
		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	knex.select().table('kota').then(function(result) {
		// 		var number = 1;
		// 		result.forEach(function(val, key) {
		// 			result[key].number 	= number;
		// 			result[key].act 	= '<div class="btn-group"><button class="btn btn-warning btn-kota-update" data-id="'+val.kota_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-kota-delete" data-id="'+val.kota_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-kota-detail" data-id="'+val.kota_id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
		// 			number++;
		// 		});
		// 		var data = {
		// 			"data" : result
		// 		};

		// 		res.send(data);
		// 	});
		// }
	},
	add: function(req, res) {
		var out;
		var data =  req.param('kota_name');
		if(data !== ''){
			Kota.findOrCreate({kota_name : data}).exec(function(err, kota){
		
					out = {
						status: true,
						msg: 'Data Kota Sudah ditambahkan'
					};
					sails.sockets.broadcast('global', 'kota_add', out);
					res.send(out);
		
		
			});
		}
		else {
			out = {
				status: false,
				msg: 'Data Kota Tidak Boleh Kosong'
			};
			res.send(out);
		}

	 //    var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var kota 		= req.param('kota_name');
		// 	if (kota !== '') {
		// 		var data = {
		// 			kota_name: kota
		// 		};

		// 		knex('kota').insert(data).then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Kota berhasil ditambahkan'
		// 			};
		// 			sails.sockets.broadcast('global', 'kota_add', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'Kota tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	show_edit: function(req, res) {
		var out;
		var data = req.param('kota_id');
		Kota.findOne(data).exec(function(err, kota){
	
			out = {
				status: true,
				'data' : kota
			};
				res.send(out);
		});
		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var kota_id = req.param('kota_id');
		// 	if (kota_id !== '') {
		// 		knex.select().table('kota').where({
		// 			kota_id: kota_id
		// 		}).then(function(result) {
		// 			out = {
		// 				status: true,
		// 				data: result[0]
		// 			};

		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'ID Kota tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	update: function(req, res) {
		var out;
		var id = req.param('id');
		var data = req.param('kota_name');
		
		if(data !== ''){
			Kota.update({id : id}, {kota_name : data}).exec(function(err, kota){
			
				out = {
					status: true,
					msg: 'Data Kota telah di up'
				};
				sails.sockets.broadcast('global', 'kota_update', out)
				res.send(out);
		
			});
		}
		else {
			out = {
			status: false,
			msg: 'Data Kota Tidak Boleh Kosong'
			};

			res.send(out);
		}
	    // var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var kota_id 		= req.param('kota_id');
		// 	var kota 			= req.param('kota_name');
		// 	if (kota !== '') {
		// 		var data = {
		// 			kota_name: kota
		// 		};

		// 		knex('kota').where({
		// 			kota_id: kota_id
		// 		}).update(data).then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Kota berhasil diupdate'
		// 			};
		// 			sails.sockets.broadcast('global', 'kota_update', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'Kota tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	delete: function(req, res) {
		var out;
		var kota_id = req.param('kota_id');
		Kota.destroy(kota_id).exec(function(err, kota){
			if(typeof(err) !== 'undefined'){

				out = {
					status: true,
					msg: 'Data Kota berhasil dihapus'
				};
				sails.sockets.broadcast('global', 'kota_delete', out);
				res.send(out);
		}

		});
	    // var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var kota_id 		= req.param('kota_id');
		// 	if (kota_id !== '') {
		// 		knex('kota').where({
		// 			kota_id: kota_id
		// 		}).del().then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Kota berhasil dihapus'
		// 			};
		// 			sails.sockets.broadcast('global', 'kota_delete', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'ID Kota tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	detail: function(req, res) {
		var pegawai_name 		= req.param('pegawai_name');
		var pegawai_telp 		= req.param('telp');
		var pegawai_posisi_id	= req.param('posisi_name');
		var pegawai_gender 		= req.param('pegawai_gender');
		var kota_id				= req.params.kota_id;
		Pegawai.find({kota: kota_id}).populate('posisi').exec(function(err, pegawais){
			var number = 0;
			pegawais.forEach(function(pegawai){
				pegawai.number 	= number;
				pegawai.act 	= '<div class="btn-group"><button classexec="btn btn-warning btn-pegawai-update" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-pegawai-delete" data-id="'+pegawai.id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-pegawai-detail" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
				number++;		
			});

			var data = {
				"data" : pegawais
			};

			res.send(data);
		})
		// var out 		= {};
		// var knex 		= sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var kota_id = req.param('kota_id');
		// 	if (kota_id !== '') {
		// 		knex
		// 		.select('pegawai_name', 'pegawai_telp', knex.raw('IF(pegawai_gender="L", "Laki-laki", "Perempuan") AS pegawai_gender'), 'posisi_name')
		// 		.from('pegawai')
		// 		.leftJoin('posisi', 'pegawai.pegawai_posisi_id', 'posisi.posisi_id')
		// 		.where('pegawai_kota_id', kota_id)
		// 		.then(function(result) {
		// 			var data = {
		// 				"data" : result
		// 			};

		// 			res.send(data);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'ID Kota tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	export: function(req, res) {
				
			var workbook 	= new Excel.Workbook;
			var sheet 		= workbook.addWorksheet('Data Kota');
			var worksheet 	= workbook.getWorksheet('Data Kota');
			
			worksheet.addRow(['ID', 'Nama Kota']);
			worksheet.getCell('A1').border ={
				top: {style:'thin'},
				left: {style:'thin'},
				bottom: {style:'thin'},
				right: {style:'thin'}
			};
			worksheet.getCell('B1').border ={
				top: {style:'thin'},
				left: {style:'thin'},
				bottom: {style:'thin'},
				right: {style:'thin'}
			};
			Kota.find().exec(function(err, kota){
				var cell = 2;
				kota.forEach(function(val, key){
				worksheet.addRow([val.id, val.kota_name]);
					worksheet.getCell('A'+cell).border = {
						top: {style:'thin'},
						left: {style:'thin'},
						bottom: {style:'thin'},
						right: {style:'thin'}
					};
					worksheet.getCell('B'+cell).border = {
						top: {style:'thin'},
						left: {style:'thin'},
						bottom: {style:'thin'},
						right: {style:'thin'}
					};
				cell++;
				})
				worksheet.getRow(1).font = {size: 12, bold: true };
				worksheet.getColumn(1).width = 20;
				worksheet.getColumn(2).width = 20;
							
				workbook.xlsx.writeFile('D:/Data Kota.xlsx').then(function(){
					res.download('D:/Data Kota.xlsx', function (err) {
						if (err) {
						  return res.serverError(err);
						} else {
						  return res.ok();
						}
					});
				});
			})
	
		
		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var workbook 	= new Excel.Workbook();
		// 	var sheet 		= workbook.addWorksheet('Kota');
		// 	var worksheet 	= workbook.getWorksheet('Kota');

		// 	worksheet.addRow(['ID Kota', 'Kota']);
		// 	worksheet.getCell('A1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};
		// 	worksheet.getCell('B1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};

		// 	knex.select().table('kota').then(function(result) {
		// 		var cell = 2;
		// 		result.forEach(function(val, key) {
		// 			worksheet.addRow([val.posisi_id, val.posisi_name]);

		// 			worksheet.getCell('A'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			worksheet.getCell('B'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			cell++;
		// 		});

		// 		// Style
		// 		worksheet.getRow(1).font = {size: 12, bold: true };
		// 		worksheet.getColumn(1).width = 8;
		// 		worksheet.getColumn(2).width = 18;

		// 		workbook.xlsx.writeFile('./assets/excel/Data Kota.xlsx')
		// 	    .then(function() {
		// 			res.download('./assets/excel/Data Kota.xlsx', function (err) {
		// 	            if (err) {
		// 	              return res.serverError(err);
		// 	            } else {
		// 	              return res.ok();
		// 	            }
		// 	        });
		// 	    });
		// 	});
		// }
	}
};