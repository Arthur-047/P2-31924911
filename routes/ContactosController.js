require('dotenv').config();
const ContactosModel = require('./ContactosModel');
const nodemailer = require('nodemailer');


class ContactosController {
    constructor() {
      this.model = new ContactosModel();
      this.model.connect();

      
  
    }
    async add(req, res) {
      const correo = 'apontarthur2005.15@gmail.com';
      const nombre = 'arthur martinez';
      const comentario = 'soy ingeniero';
      console.log(req.body)
      /*Ip address*/
      const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
      const url = 'http://ipwho.is/' + ip;
      const response = await fetch(url);
      const json = await response.json();
      const pais = json.country
  
  
      const responseGoogle = req.body["g-recaptcha-response"];
      const secretGoogle = "6LetJ5UqAAAAAKOKfKtP3S-9mUc27nuzGxDqGSgA";
      const urlGoogle = `https://www.google.com/recaptcha/api/siteverify?secret=${secretGoogle}&response=${responseGoogle}`;
      const RecaptchaGoogle = await fetch(urlGoogle, { method: "post", });
      const google_response_result = await RecaptchaGoogle.json();
      console.log(google_response_result)
      if (google_response_result.success == true) {
        /*Fecha y hora*/
  
        let hoy = new Date();
        let horas = hoy.getHours();
        let minutos = hoy.getMinutes();
        let hora = horas + ':' + minutos;
        let fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear() + '' + '/' + '' + hora;
  
  
        const customer = `
                            <h2>Información del Cliente</h2>
                              <p>Email: ${correo}</p>
                              <p>Nombre: ${nombre}</p>
                              <p>Comentario: ${comentario}</p>
                              <p>Fecha: ${fecha}</p>
                              <p>IP: ${ip}</p>
                              <pli>Pais: ${pais}</p>
                              `;
  
        const receiver = {
          from: 'ejemplo@ejemplo.com',
          to: 'programacion2ais@dispostable.com',
          subject: 'Informacion del Contacto',
          html: customer
        };
  
  
        transporter.sendMail(receiver, (err, info) => {
          if (err) {
            console.log(err)
          }
  
          else {
            this.model.save(correo, nombre, comentario, ip, fecha, pais);
            res.send({request: 'Formulario enviado'});
          }
  
        })
  
      } else {
        res.send({request:'Verifica el captcha para avanzar'})
      }
  
    }
  }

module.exports = ContactosController