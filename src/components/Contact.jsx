import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="sec" id="contact">
      <div className="sec-inner">
        <div className="fi vis cl-reveal" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="sec-label c">Transmit</div>
          <h2 className="sec-title">Contact</h2>
          <p className="sec-body" style={{ margin: '0 auto' }}>
            Contact for Business or Work!
          </p>
        </div>

        {!submitted ? (
          <form className="contact-form cl-reveal cl-stagger-1" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ height: '2px' }} />

            <div className="form-field">
              <label htmlFor="cf-subject">Subject</label>
              <input
                id="cf-subject"
                type="text"
                name="subject"
                placeholder="Inquiry, collaboration, licensing…"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div style={{ height: '2px' }} />

            <div className="form-field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Your transmission…"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="form-bottom">
              <span className="form-note">Required fields must be completed.</span>
              <button type="submit" className="btn">
                <span>Send Transmission</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="form-success show" id="form-success">
            <div className="fs-icon">•</div>
            <div className="fs-title">Transmission Received</div>
            <div className="fs-sub">
              We'll respond to business inquiries, please wait 4-5 business days.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
