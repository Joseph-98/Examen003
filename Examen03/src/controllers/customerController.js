const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM red_biblioteca', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.save=(req, res)=>{
  req.getConnection((error, conectar)=>{
    const datos=req.body;
    conectar.query('Insert into red_biblioteca set ?',[datos],(error, data)=>{
      if(error) throw error;
      res.redirect('/')
    })
  });

}

controller.edit = (req, res) => {
  const  id = req.params.CODIGO;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM red_biblioteca WHERE CODIGO = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const id = req.params.CODIGO;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE red_biblioteca set ? where CODIGO = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const  id= req.params.CODIGO;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM red_biblioteca WHERE CODIGO = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
