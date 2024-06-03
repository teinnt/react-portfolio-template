import React from 'react'

const Footer: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3926.143594884138!2d106.0203670750345!3d10.250000689868518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snz!4v1717392279811!5m2!1sen!2snz"
        width="600"
        height="450"
        style={{ border: 0, width: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default Footer
