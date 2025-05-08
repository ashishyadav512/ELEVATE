import { motion } from 'framer-motion';
import ContactForm from '@/components/ui/ContactForm';

const Contact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="pt-24 pb-24 bg-dark-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            GET IN <span className="text-neon-cyan">TOUCH</span>
          </h2>
          <p className="text-light-300">
            Have questions about our products or services? Our team is here to help. Get in touch with us and we'll respond as soon as possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-1"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark-700 rounded-lg p-6 h-full">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-light-300 mb-6">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1 w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-neon-cyan">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Our Location</h4>
                      <p className="text-light-300 text-sm">123 Luxury Lane, Fashion District, New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1 w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-neon-cyan">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <p className="text-light-300 text-sm">+1 (800) 555-SHOE</p>
                      <p className="text-light-300 text-sm">Mon-Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1 w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-neon-cyan">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <p className="text-light-300 text-sm">support@elevate.com</p>
                      <p className="text-light-300 text-sm">sales@elevate.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-light-300 hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-light-300 hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-light-300 hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-light-300 hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-light-300 hover:text-neon-cyan transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
        
        {/* Map Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-dark-700 rounded-lg overflow-hidden h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095785414!2d-74.0059418845961!3d40.74127404371834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sFashion%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1635187124959!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="ELEVATE Store Location"
            ></iframe>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-8 text-center">
            FREQUENTLY ASKED <span className="text-neon-cyan">QUESTIONS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-light-300">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are securely processed.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">How long does shipping take?</h3>
              <p className="text-light-300">
                Standard shipping takes 5-7 business days within the continental US. Expedited shipping options are available at checkout for 2-3 business day delivery.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">What is your return policy?</h3>
              <p className="text-light-300">
                We offer a 30-day return policy on unworn items in their original condition with all tags attached. Returns are free for customers in the United States.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">How do I find the right size?</h3>
              <p className="text-light-300">
                Our detailed size guide can be found on each product page. If you're between sizes, we generally recommend sizing up for a more comfortable fit.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Do you ship internationally?</h3>
              <p className="text-light-300">
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees may apply and are the responsibility of the customer.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">How can I track my order?</h3>
              <p className="text-light-300">
                Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account dashboard.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Store Hours */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-bold font-montserrat mb-6">
              STORE <span className="text-neon-cyan">HOURS</span>
            </h2>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-dark-600">
                  <span>Monday - Friday</span>
                  <span className="text-light-100">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-600">
                  <span>Saturday</span>
                  <span className="text-light-100">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-600">
                  <span>Sunday</span>
                  <span className="text-light-100">11:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Online Support</span>
                  <span className="text-light-100">24/7</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold font-montserrat mb-6">
              CUSTOMER <span className="text-neon-cyan">SUPPORT</span>
            </h2>
            
            <div className="bg-dark-700 p-6 rounded-lg">
              <p className="text-light-300 mb-6">
                Our customer support team is available to assist you with any questions or concerns you may have about our products or services.
              </p>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-cyan mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4l2.8 3.4a2 2 0 0 0 1.4.6H20a2 2 0 0 1 1.2.4z"></path>
                    <path d="M8 12h8"></path>
                    <path d="M8 16h4"></path>
                  </svg>
                  <span>support@elevate.com</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-cyan mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (800) 555-SHOE</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-cyan mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="8" cy="10" r="1"></circle>
                    <circle cx="12" cy="10" r="1"></circle>
                    <circle cx="16" cy="10" r="1"></circle>
                  </svg>
                  <span>Live Chat (Available 9AM - 8PM EST)</span>
                </div>
              </div>
              
              <div className="mt-6">
                <motion.button 
                  className="w-full py-3 bg-neon-cyan text-dark-900 font-bold uppercase rounded-sm hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Live Chat
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
