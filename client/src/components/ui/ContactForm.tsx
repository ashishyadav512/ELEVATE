import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      privacy: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would normally send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! We'll get back to you shortly.",
        duration: 5000,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      className="bg-dark-700 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full bg-dark-600 border-0 rounded-sm py-3 px-4 text-light-100 placeholder-light-400 focus:ring-neon-cyan focus:outline-none"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full bg-dark-600 border-0 rounded-sm py-3 px-4 text-light-100 placeholder-light-400 focus:ring-neon-cyan focus:outline-none"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
        <input 
          type="text" 
          id="subject" 
          {...register('subject')}
          className="w-full bg-dark-600 border-0 rounded-sm py-3 px-4 text-light-100 placeholder-light-400 focus:ring-neon-cyan focus:outline-none"
          placeholder="How can we help you?"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea 
          id="message" 
          rows={6} 
          {...register('message')}
          className="w-full bg-dark-600 border-0 rounded-sm py-3 px-4 text-light-100 placeholder-light-400 focus:ring-neon-cyan focus:outline-none"
          placeholder="Tell us more about your inquiry..."
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <div className="flex items-center mb-6">
        <input 
          type="checkbox" 
          id="privacy" 
          {...register('privacy')}
          className="form-checkbox bg-dark-600 border-dark-500 text-neon-cyan rounded focus:ring-0 focus:ring-offset-0 mr-2"
        />
        <label htmlFor="privacy" className="text-light-300 text-sm">
          I agree to the <a href="#" className="text-neon-cyan hover:underline">Privacy Policy</a>
        </label>
        {errors.privacy && (
          <p className="text-red-500 text-sm ml-2">{errors.privacy.message}</p>
        )}
      </div>
      
      <motion.button 
        type="submit" 
        className="w-full py-3 bg-neon-cyan text-dark-900 font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
