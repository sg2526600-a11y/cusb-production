// ─── Contact Page ─────────────────────────────────────────────────────────────
// Layout/UI identical to original — form now submits via Supabase contactService.

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { SITE_CONFIG } from '@/constants/site';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { contactService } from '@/services/contact.service';
import styles from './Contact.module.css';

// ─── Contact form state ───────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  dept: string;
  message: string;
}

const DEPTS = [
  'General Enquiry',
  'Admissions',
  'Examination / Results',
  'Research / Ph.D.',
  'Hostel',
  'Fee / Finance',
  'Scholarship',
  'Placement',
  'Library',
  'Technical Support (IT)',
  'IQAC',
  'Vice-Chancellor Office',
  'Registrar',
];

const OFFICES = [
  {
    icon: '🏛️',
    title: "Vice-Chancellor's Office",
    address: 'Administrative Block, CUSB Campus\nNH-120, Panchanpur, Gaya – 824236',
    phone: '+91-631-2229530',
    email: 'vc@cusb.ac.in',
    hours: 'Mon–Fri: 10:00 AM – 5:30 PM',
  },
  {
    icon: '📋',
    title: "Registrar's Office",
    address: 'Administrative Block, CUSB Campus\nNH-120, Panchanpur, Gaya – 824236',
    phone: '+91-631-2229530',
    email: 'registrar@cusb.ac.in',
    hours: 'Mon–Fri: 10:00 AM – 5:30 PM',
  },
  {
    icon: '🎓',
    title: 'Academic Section',
    address: 'Academic Block, CUSB Campus\nNH-120, Panchanpur, Gaya – 824236',
    phone: '+91-631-2229530',
    email: 'academic@cusb.ac.in',
    hours: 'Mon–Fri: 10:00 AM – 5:30 PM',
  },
  {
    icon: '📝',
    title: 'Examination Section',
    address: 'Examination Building, CUSB Campus\nNH-120, Panchanpur, Gaya – 824236',
    phone: '+91-631-2229530',
    email: 'exam@cusb.ac.in',
    hours: 'Mon–Fri: 10:00 AM – 5:30 PM',
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', subject: '', dept: 'General Enquiry', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const ref1 = useScrollReveal({ stagger: true });
  const ref2 = useScrollReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setServerError('');

    const result = await contactService.submit({
      name:    form.name.trim(),
      email:   form.email.trim().toLowerCase(),
      phone:   form.phone.trim() || undefined,
      subject: form.dept ? `[${form.dept}] ${form.subject.trim()}` : form.subject.trim(),
      message: form.message.trim(),
    });

    setSubmitting(false);
    if (result.error) {
      setServerError('Something went wrong. Please try again or email us directly.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        titleHi="संपर्क करें"
        subtitle="Reach the Central University of South Bihar — admissions, examinations, research, hostel, or general enquiries."
        crumbs={[{ label: 'Contact' }]}
      />

      {/* Office cards */}
      <section className={styles.offices}>
        <div ref={ref1} className={styles.officeGrid}>
          {OFFICES.map(({ icon, title, address, phone, email, hours }) => (
            <div key={title} className={styles.officeCard}>
              <div className={styles.officeHead}>
                <span>{icon}</span>
                <h3>{title}</h3>
              </div>
              <address className={styles.officeAddr}>
                <p>📍 {address.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
                <p>📞 <a href={`tel:${phone}`}>{phone}</a></p>
                <p>✉️ <a href={`mailto:${email}`}>{email}</a></p>
                <p>🕐 {hours}</p>
              </address>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Form */}
      <section className={styles.mapForm}>
        {/* Google Maps embed — CUSB Campus, Gaya */}
        <div className={styles.mapWrap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.8!2d85.0!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32b5b9e7e3b6f%3A0x7c9e5a6c1234abcd!2sCentral%20University%20of%20South%20Bihar!5e0!3m2!1sen!2sin!4v1234567890"
            title="CUSB Campus Location on Google Maps"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className={styles.mapInfo}>
            <h3>How to Reach CUSB</h3>
            <ul>
              <li>🚂 <strong>Gaya Railway Station</strong> — 22 km (45 min by road)</li>
              <li>✈️ <strong>Gaya International Airport</strong> — 18 km (35 min by road)</li>
              <li>🚌 <strong>Gaya Bus Stand</strong> — 20 km (auto/taxi available)</li>
              <li>🛣️ <strong>NH-120</strong>, Panchanpur, Gaya – 824236</li>
            </ul>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Central+University+of+South+Bihar+Gaya"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dirBtn}
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div ref={ref2} className={styles.formWrap}>
          <h2 className={styles.formTitle}>Send a Message</h2>
          <p className={styles.formSub}>Fill the form below and our team will respond within 2 working days.</p>

          {submitted ? (
            <div className={styles.success}>
              <span>✅</span>
              <div>
                <p><strong>Message sent successfully!</strong></p>
                <p>Thank you, {form.name}. We'll respond to {form.email} within 2 working days.</p>
                <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setServerError(''); setForm({ name:'',email:'',phone:'',subject:'',dept:'General Enquiry',message:'' }); }}>
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor="cf-name">Full Name <span>*</span></label>
                  <input id="cf-name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cf-email">Email Address <span>*</span></label>
                  <input id="cf-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label htmlFor="cf-phone">Phone Number</label>
                  <input id="cf-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cf-dept">Department / Section</label>
                  <select id="cf-dept" name="dept" value={form.dept} onChange={handleChange}>
                    {DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="cf-subject">Subject <span>*</span></label>
                <input id="cf-subject" name="subject" type="text" placeholder="Brief subject of your enquiry" value={form.subject} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="cf-message">Message <span>*</span></label>
                <textarea id="cf-message" name="message" rows={5} placeholder="Describe your query in detail…" value={form.message} onChange={handleChange} required />
              </div>
              {serverError && <div className={styles.serverErr}>{serverError}</div>}
              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? '⏳ Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Quick contact strip */}
      <section className={styles.quickContact}>
        <div className={styles.qcGrid}>
          <a href={`tel:${SITE_CONFIG.phone}`} className={styles.qcCard}>
            <span>📞</span>
            <div>
              <p>Call Us</p>
              <strong>{SITE_CONFIG.phone}</strong>
            </div>
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className={styles.qcCard}>
            <span>✉️</span>
            <div>
              <p>Email Us</p>
              <strong>{SITE_CONFIG.email}</strong>
            </div>
          </a>
          <a href={SITE_CONFIG.website} target="_blank" rel="noopener noreferrer" className={styles.qcCard}>
            <span>🌐</span>
            <div>
              <p>Official Website</p>
              <strong>www.cusb.ac.in</strong>
            </div>
          </a>
          <div className={styles.qcCard} style={{ cursor: 'default' }}>
            <span>📍</span>
            <div>
              <p>Campus Address</p>
              <strong>NH-120, Panchanpur, Gaya – 824236</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
