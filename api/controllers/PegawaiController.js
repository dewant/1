/**
 * PegawaiController
 *
 * @description :: Server-side logic for managing pegawais
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Excel 	= require('exceljs');
module.exports = {
	index: function(req, res) {
		var kota;
		var posisi;

Kota.find().exec(function(err, kotas){
	Posisi.find().exec(function(err, posisis){
				
		res.view('pegawai/index', {
			"Kota": kotas, 
			"Posisi": posisis
		});

	})
})
	
	// Posisi.find(),exec(function(err, posisi){

	// })
		// })
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	knex.select().table('kota').then(function(result) {
		// 		kota = result;
		// 	});
		// 	knex.select().table('posisi').then(function(result) {
		// 		posisi = result;
		// 	});

		// 	setTimeout(function() {
		// 		res.view('pegawai/index', {
		// 			"kota": kota,
		// 			"posisi": posisi
		// 		});
		// 	}, 1000);
		// }
	},
	get: function(req, res) {
		var out;
		var pegawai_name 		= req.param('name');
		var tahun_masuk			= req.param('tahun');
		var pegawai_TTL			= req.param('TTL');
		var pegawai_telp 		= req.param('telp');
		var pegawai_kota_name	= req.param('kota_name');
		var alamat				= req.param('alamat');
		var pegawai_gender 		= req.param('gender');
		var pegawai_status		= req.param('status');
		var pegawai_posisi		= req.param('posisi_name');
		Pegawai.find().populate(['kota', 'posisi']).exec(function(err, pegawais){
			var number = 0;
			pegawais.forEach(function(pegawai){
				pegawai.number 	= number;
				pegawai.act 	= '<div class="btn-group"><button class="btn btn-warning btn-pegawai-update" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-pegawai-delete" data-id="'+pegawai.id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button><button class="btn btn-info btn-pegawai-detail" data-id="'+pegawai.id +'"><i class="glyphicon glyphicon-info-sign"></i> Detail</button></div>';
				number++;		
			});

			var data = {
				"data" : pegawais
			};

			res.send(data);
		})
		
		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	knex.select(['pegawai_id', 'pegawai_name', 'pegawai_telp', 'kota_name', knex.raw('IF(pegawai_gender="L", "Laki-laki", "Perempuan") as pegawai_gender'), 'posisi_name'])
		// 	.from('pegawai')
		// 	.join('posisi', 'pegawai.pegawai_posisi_id', 'posisi.posisi_id')
		// 	.join('kota', 'pegawai.pegawai_kota_id', 'kota.kota_id')
		// 	.then(function(result) {
		// 			result[key].act 	= '<div class="btn-group"><button class="btn btn-warning btn-pegawai-update" data-id="'+val.pegawai_id +'"><i class="glyphicon glyphicon-repeat"></i> Update</button><button class="btn btn-danger btn-pegawai-delete" data-id="'+val.pegawai_id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Delete</button></div>';
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
	var add_data = {
		pegawai_name	 : req.param('pegawai_name'),
		tahun			 : req.param('tahun'),
		TTL				 : req.param('TTL'),
		telp			 : req.param('telp'),
		kota 			 : req.param('kota_name'),
		alamat 			 : req.param('alamat'),
		pegawai_gender	 : req.param('pegawai_gender'),
		posisi 			 : req.param('posisi'),
		status	 		 : req.param('pegawai_status')
	}
	if(req.param('pegawai_name') !== '' && req.param('telp') !== '' && req.param('Pegawai_gender') !== ''){
		Pegawai.create(add_data).exec(function(err, pegawai){

				out = {
					status: true,
					msg : 'Data Pegawai Berhasil Ditambah'
				};
					sails.sockets.broadcast('global', 'pegawai_add', out);
					res.send(out);
		});
	}
	else {
		out = {
			status: false,
			msg: 'Data Pegawai Tidak Boleh Kosong'
		};

		res.send(out); }
		
	    // var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var pegawai_name 	= req.param('pegawai_name');
		// 	var pegawai_telp 	= req.param('pegawai_telp');
		// 	var pegawai_kota 	= req.param('pegawai_kota');
		// 	var pegawai_gender 	= req.param('pegawai_gender');
		// 	var pegawai_posisi 	= req.param('pegawai_posisi');
		// 	if (pegawai_name !== '' && pegawai_telp !== '' && pegawai_kota !== '' && pegawai_gender !== '' && pegawai_posisi !== '') {
		// 		var data = {
		// 			pegawai_name: pegawai_name,
		// 			pegawai_telp: pegawai_telp,
		// 			pegawai_kota_id: pegawai_kota,
		// 			pegawai_gender: pegawai_gender,
		// 			pegawai_posisi_id: pegawai_posisi
		// 		};

		// 		knex('pegawai').insert(data).then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Pegawai berhasil ditambahkan'
		// 			};
		// 			sails.sockets.broadcast('global', 'pegawai_add', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'Pegawai tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	show_edit: function(req, res) {
		var out;
		var data = req.param('pegawai_id');
		Pegawai.findOne(data).exec(function(err, pegawai){

			out = {
				status: true,
				'data' : pegawai
			};

				res.send(out);
		});
		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var pegawai_id = req.param('pegawai_id');
		// 	if (pegawai_id !== '') {
		// 		knex.select().table('pegawai').where({
		// 			pegawai_id: pegawai_id
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
		// 			msg: 'ID Pegawai tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},

	update: function(req, res) {
		var out;
		var id = req.param('id');
		var update_data = {
			pegawai_name	 : req.param('pegawai_name'),//param ngambil di add.ejs
			tahun			 : req.param('tahun'),
			TTL				 : req.param('TTL'),
			telp			 : req.param('telp'),
			kota			 : req.param('kota_name'),
			pegawai_gender	 : req.param('pegawai_gender'),
			posisi			 : req.param('posisi_name'),
			status			 : req.param('pegawai_status')
		}

		Pegawai.update({id : id}, update_data).exec(function(err, pegawai){
			if(typeof(err) != 'undefined'){
				out ={
					status: true,
					msg: 'Pegawai telah di up'
				};
				sails.sockets.broadcast('global', 'pegawai_update', out)
				res.send(out);
			}
		});
	    // var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var pegawai_id 		= req.param('pegawai_id');
		// 	var pegawai_name 	= req.param('pegawai_name');
		// 	var pegawai_telp 	= req.param('pegawai_telp');
		// 	var pegawai_kota 	= req.param('pegawai_kota');
		// 	var pegawai_gender 	= req.param('pegawai_gender');
		// 	var pegawai_posisi 	= req.param('pegawai_posisi');
		// 	if (pegawai_id !== '' && pegawai_name !== '' && pegawai_telp !== '' && pegawai_kota !== '' && pegawai_gender !== '' && pegawai_posisi !== '') {
		// 		var data = {
		// 			pegawai_name: pegawai_name,
		// 			pegawai_telp: pegawai_telp,
		// 			pegawai_kota_id: pegawai_kota,
		// 			pegawai_gender: pegawai_gender,
		// 			pegawai_posisi_id: pegawai_posisi
		// 		};

		// 		knex('pegawai').where({
		// 			pegawai_id: pegawai_id
		// 		}).update(data).then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Pegawai berhasil diupdate'
		// 			};
		// 			sails.sockets.broadcast('global', 'pegawai_update', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'Pegawai tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	delete: function(req, res) {
		var out;
		var pegawai_id = req.param('pegawai_id');
		Pegawai.destroy(pegawai_id).exec(function(err, pegawai){
			if(typeof(err) !== 'undefined'){

			out = {
				status: true,
				msg: 'Data Pegawai berhasil dihapus'
				};

				sails.sockets.broadcast('global', 'pegawai_delete', out);
				res.send(out);
			}
		});
	    // var out 		= {};
		// var knex 		= sails.config.knex;
		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var pegawai_id 		= req.param('pegawai_id');
		// 	if (pegawai_id !== '') {
		// 		knex('pegawai').where({
		// 			pegawai_id: pegawai_id
		// 		}).del().then(function(id) {
		// 			out = {
		// 				status: true,
		// 				msg: 'Data Pegawai berhasil dihapus'
		// 			};
		// 			sails.sockets.broadcast('global', 'pegawai_delete', out);
		// 			res.send(out);
		// 		});
		// 	} else {
		// 		out = {
		// 			status: false,
		// 			msg: 'ID Pegawai tidak boleh kosong'
		// 		};

		// 		res.send(out);
		// 	}
		// }
	},
	// join: function(req, res, next) {
	// 	if (err) throw err;
	// 	db.getCollection('pegawai').aggregate([
	// 		{ $lookup:
	// 			{
	// 				from: 'kota',
	// 				localField: 'kota_name',
	// 				foreignField: 'kota',
	// 				as: 'kotasid'
	// 			}
	// 		}
	// 		], function(err, res) {
	// 		if (err) throw err;
	// 		console.log(JSON.stringify(res));
	// 		db.close();
	// 	});
	// },
	// detail: function(req, res) {
	// 	var id 					= req.param('id');
	// 	var detail = {
	// 	 pegawai_name 		    : req.param('pegawai_name'),
	// 	 TTL					: req.param('TTL'),
	// 	 pegawai_telp 	     	: req.param('telp'),
	// 	 pegawai_gender 		: req.param('pegawai_gender'),
	// 	 posisi			 		: req.param('posisi_name')
	// 	}
	// 	Pegawai.find({id : id}, detail).exec(function(err, pegawais){
			
	// 		pegawais.forEach(function(pegawai){
				
	// 		});

	// 		var data = {
	// 			"data" : pegawais
	// 		};

	// 		res.send(data);
	// 	})
	// },

	export: function(req, res) {

			var workbook 	= new Excel.Workbook();
			var sheet 		= workbook.addWorksheet('Data Pegawai');
			var worksheet 	= workbook.getWorksheet('Data Pegawai');

			worksheet.addRow(['Nama Pegawai', 'Tahun Masuk', 'Alamat', 'Tanggal Lahir', 'Telp Pegawai', 'Kota Pegawai', 'Jenis Kelamin', 'Status', 'Posisi Pegawai']);
			worksheet.getCell('A1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('B1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('C1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('D1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('E1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('F1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('G1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('H1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			worksheet.getCell('I1').border = {
			    top: {style:'thin'},
			    left: {style:'thin'},
			    bottom: {style:'thin'},
			    right: {style:'thin'}
			};
			
		Pegawai.find().populate(['kota', 'posisi']).exec(function(err, pegawai){
		var cell 	= 2;
		pegawai.forEach(function(val, key) {
		worksheet.addRow([val.pegawai_name, val.tahun, val.alamat, val.TTL, val.telp, val.kota.kota_name, val.pegawai_gender, val.status, val.posisi.posisi_name]);

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
					worksheet.getCell('C'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('D'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('E'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('F'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('G'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('H'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					worksheet.getCell('I'+cell).border = {
					    top: {style:'thin'},
					    left: {style:'thin'},
					    bottom: {style:'thin'},
					    right: {style:'thin'}
					};
					cell++;
				});

				// Style
				worksheet.getRow(1).font = {size: 12, bold: true };
				worksheet.getColumn(1).width = 20;
				worksheet.getColumn(2).width = 30;
				worksheet.getColumn(3).width = 25;
				worksheet.getColumn(4).width = 20;
				worksheet.getColumn(5).width = 20;
				worksheet.getColumn(6).width = 20;
				worksheet.getColumn(7).width = 20;
				worksheet.getColumn(8).width = 20;
				worksheet.getColumn(9).width = 20;

				workbook.xlsx.writeFile('D:/Data Pegawai.xlsx').then(function() {
					res.download('D:/Data Pegawai.xlsx', function (err) {
			            if (err) {
			              return res.serverError(err);
			            } else {
			              return res.ok();
			            }
			        });
			    });
			});
		

		// var knex = sails.config.knex;

		// if (req.session.data_login === undefined) {
		// 	res.redirect('/');
		// } else {
		// 	var workbook 	= new Excel.Workbook();
		// 	var sheet 		= workbook.addWorksheet('Data Pegawai');
		// 	var worksheet 	= workbook.getWorksheet('Data Pegawai');

		// 	worksheet.addRow(['ID Pegawai', 'Nama Pegawai', 'Telp Pegawai', 'Kota Pegawai', 'Jenis Kelamin', 'Posisi Pegawai']);
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
		// 	worksheet.getCell('C1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};
		// 	worksheet.getCell('D1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};
		// 	worksheet.getCell('E1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};
		// 	worksheet.getCell('F1').border = {
		// 	    top: {style:'thin'},
		// 	    left: {style:'thin'},
		// 	    bottom: {style:'thin'},
		// 	    right: {style:'thin'}
		// 	};

		// knex.select().table('pegawai').then(function(result) {
		// var cell = 2;
		// result.forEach(function(val, key) {
		// worksheet.addRow([val.pegawai_id, val.pegawai_name, val.pegawai_telp, val.pegawai_kota_id, val.pegawai_gender, val.pegawai_posisi_id]);

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
		// 			worksheet.getCell('C'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			worksheet.getCell('D'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			worksheet.getCell('E'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			worksheet.getCell('F'+cell).border = {
		// 			    top: {style:'thin'},
		// 			    left: {style:'thin'},
		// 			    bottom: {style:'thin'},
		// 			    right: {style:'thin'}
		// 			};
		// 			cell++;
		// 		});

		// 		// Style
		// 		worksheet.getRow(1).font = {size: 12, bold: true };
		// 		worksheet.getColumn(1).width = 12;
		// 		worksheet.getColumn(2).width = 30;
		// 		worksheet.getColumn(3).width = 13;
		// 		worksheet.getColumn(4).width = 14;
		// 		worksheet.getColumn(5).width = 14;
		// 		worksheet.getColumn(6).width = 15;

		// 		workbook.xlsx.writeFile('./assets/excel/Data Pegawai.xlsx')
		// 	    .then(function() {
		// 			res.download('./assets/excel/Data Pegawai.xlsx', function (err) {
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

function newFunction(res) {
	res.view('pegawai/index');
}

