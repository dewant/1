var Excel 	= require('exceljs');
module.exports = {
	index: function(req, res) {
		var posisi;

	Posisi.find().exec(function(err, posisis){
				
		res.view('cuti/index', {
			"Posisi": posisis
	});
})
    },

	get: function(req, res) {
		var out;
		var pegawai_name 		= req.param('name');
		var pegawai_posisi		= req.param('posisi_name');
		Cuti.find().populate(['posisi']).exec(function(err, cutis){
			var number = 0;
			cutis.forEach(function(cuti){
				cuti.number 	= number;
				cuti.act 	= '<button class="btn btn-danger btn-cuti-delete" data-id="'+cuti.id +'" data-toggle="modal" data-target="#konfirmasiHapus"><i class="glyphicon glyphicon-remove-sign"></i> Selesai</button></div>';
				number++;		
			});

			var data = {
				"data" : cutis
			};

			res.send(data);
        })
    },

    add: function(req, res) {
        var out;
        var add_data = {
            pegawai_name	 : req.param('pegawai_name'),
			posisi 			 : req.param('posisi'),
			telp			 : req.param('telp'),
            mulai            : req.param('mulai'),
			lama             : req.param('lama'),
			alasan			 : req.param('alasan')
        }
        if(req.param('pegawai_name') !== ''){
            Cuti.create(add_data).exec(function(err, cuti){
    
                    out = {
                        status: true,
                        msg : 'Data Cuti Berhasil Ditambah'
                    };
                        sails.sockets.broadcast('global', 'cuti_add', out);
                        res.send(out);
            });
        }
        else {
            out = {
                status: false,
                msg: 'Data Cuti Tidak Boleh Kosong'
            };
    
            res.send(out); }
        },
        delete: function(req, res) {
            var out;
            var cuti_id = req.param('cuti_id');
            Cuti.destroy(cuti_id).exec(function(err, cuti){
                if(typeof(err) !== 'undefined'){
    
                out = {
                    status: true,
                    msg: 'Data Cuti berhasil dihapus'
                    };
    
                    sails.sockets.broadcast('global', 'cuti_delete', out);
                    res.send(out);
                }
            });
        },
        export: function(req, res) {

			var workbook 	= new Excel.Workbook();
			var sheet 		= workbook.addWorksheet('Data Cuti');
			var worksheet 	= workbook.getWorksheet('Data Cuti');

			worksheet.addRow(['Nama Pegawai', 'Posisi Pegawai', 'No. Hp', 'Mulai Cuti', 'Lama Cuti', 'Alasan']);
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
						
		Cuti.find().populate(['posisi']).exec(function(err, cuti){
		var cell 	= 2;
		cuti.forEach(function(val, key) {
		worksheet.addRow([val.pegawai_name, val.posisi.posisi_name, val.telp, val.mulai, val.lama, val.alasan]);

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
				cell++;
				});

				// Style
				worksheet.getRow(1).font = {size: 12, bold: true };
				worksheet.getColumn(1).width = 20;
				worksheet.getColumn(2).width = 30;
				worksheet.getColumn(3).width = 25;
				worksheet.getColumn(4).width = 20;
				worksheet.getColumn(5).width = 20;
				worksheet.getColumn(6).width = 50;

				workbook.xlsx.writeFile('D:/Data Cuti.xlsx').then(function() {
					res.download('D:/Data Cuti.xlsx', function (err) {
			            if (err) {
			              return res.serverError(err);
			            } else {
			              return res.ok();
			            }
			        });
			    });
            });
        }
    };
    
    function newFunction(res) {
        res.view('cuti/index');

}