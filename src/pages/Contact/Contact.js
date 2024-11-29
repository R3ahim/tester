import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <div>


<div className="container-boss">

      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Delta Kebab Jodlowa</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>

          <div className="info">
            <div className="information">
              <img src="img/location.png" className="icon" alt="" />
              <p>Jodłowa 11A, 83-110 Tczew, Poland</p>
            </div>
            <div className="information">
              <img src="img/email.png" className="icon" alt="" />
              <p>Mduddin@deltakebab.com</p>
            </div>
            <div className="information">
              <img src="img/phone.png" className="icon" alt="" />
              <p>+48 739 659 985</p>
            </div>
          </div>

         
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2339.6647628001524!2d18.7691239!3d54.0974189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd6159fe8f6f53%3A0xc871f39935f3464d!2sDelta%20kebab!5e0!3m2!1sen!2sbd!4v1729356295217!5m2!1sen!2sbd"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Contact