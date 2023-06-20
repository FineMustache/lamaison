const nodemailer = require('nodemailer')

function send(type, email, data) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,

      pass: process.env.MAIL_PASSWORD,

      clientId: process.env.OAUTH_CLIENTID,

      clientSecret: process.env.OAUTH_CLIENT_SECRET,

      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  var text = ""
  var html = ""
  var subject = ""
  switch (type) {
    case 0:
      text = "Confirme sua conta La Maison acessando o link: http://127.0.0.1:5500/verificacao/index.html?token=" + data
      html = `<p>Sua conta La Maison foi criada com sucesso. Agora só falta <a href='${"http://127.0.0.1:5500/verificacao/index.html?token=" + data}'>VERIFICAR A SUA CONTA</a>!</p>`
      subject = "Confirmação de Conta"
      break;
      
    case 1:
      text = `Seu pedido foi confirmado. Os seguintes itens serão entregues no seu endereço: `
      data.produtos.forEach((p, index) => text = text + `${p.qtde}X ${p.nome} ${index === data.produtos.length - 1 ? '. Verifique seus pedidos em: http://localhost:5500/pedidos/index.html' : ', '}`)
      html = `<p>Seu pedido foi confirmado. Os seguintes itens serão entregues no seu endereço:<br>`
      data.produtos.forEach((p, index) => html = html + `<h2>${p.qtde}X <a href="http://localhost:5500/prod/index.html?idProd=${p.id}">${p.nome}</a></h2>`)
      subject = "Compra confirmada"
      break;
  
    default:
      return
  }

  let mailOptions = {
    from: 'lamaison.suporte@gmail.com',
    to: email,
    subject: subject,
    text: text,
    html: html
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = { send }