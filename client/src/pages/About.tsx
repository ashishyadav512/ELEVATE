import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TeamMember as TeamMemberType } from '@shared/schema';
import TeamMember from '@/components/ui/TeamMember';
import StatsCounter from '@/components/ui/StatsCounter';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const { data: teamMembers } = useQuery<TeamMemberType[]>({
    queryKey: ['/api/team-members'],
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="about" className="pt-24 pb-24 bg-dark-800">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            OUR <span className="text-cyan-400">STORY</span>
          </h2>
          <p className="text-light-300">
            Since 2010, we've been driven by a passion to create footwear that blends cutting-edge technology, premium materials, and exceptional design. Our journey from a small studio to a global brand has been fueled by innovation and an unwavering commitment to quality.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div
            style={{ y }}
            className="overflow-hidden rounded-lg shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900" 
              alt="ELEVATE flagship store interior with luxury shoe displays" 
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-montserrat mb-4">Our Vision</h3>
            <p className="text-light-300 mb-6">
              At ELEVATE, we believe footwear is more than just a necessity—it's an expression of personal style, performance goals, and lifestyle aspirations. Our designs merge athletic functionality with urban aesthetics to create products that perform exceptionally while making a statement.
            </p>
            <p className="text-light-300 mb-8">
              Every pair we create undergoes rigorous testing to ensure durability, comfort, and performance. We source premium materials from sustainable suppliers and employ skilled artisans who bring decades of craftsmanship to each product.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <motion.a 
                  className="px-6 py-3 bg-neon-cyan text-dark-900 font-bold uppercase tracking-wider inline-block rounded-sm hover:bg-white transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Collection
                </motion.a>
              </Link>
              <Link href="/contact">
                <motion.a 
                  className="px-6 py-3 border border-light-100 text-light-100 font-bold uppercase tracking-wider inline-block rounded-sm hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05, borderColor: "#00F0FF", color: "#00F0FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Stats Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <StatsCounter 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"></path>
                <path d="M3 6v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6"></path>
                <path d="M8 4v18"></path>
                <path d="M19 4v18"></path>
                <rect width="5" height="6" x="14" y="4"></rect>
                <rect width="5" height="6" x="14" y="14"></rect>
              </svg>
            } 
            target={42} 
            label="Retail Locations" 
          />
          
          <StatsCounter 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            } 
            target={20} 
            label="Countries Served" 
          />
          
          <StatsCounter 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z"></path>
                <path d="M14 7v11a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z"></path>
                <path d="M21 4v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z"></path>
              </svg>
            } 
            target={150} 
            label="Shoe Designs" 
          />
          
          <StatsCounter 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            } 
            target={500000} 
            label="Happy Customers" 
            suffix="+" 
          />
        </div>
        
        {/* Our History Timeline */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold font-montserrat mb-10 text-center">
            OUR <span className="text-cyan-400">JOURNEY</span>
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-dark-600"></div>
            
            {/* Timeline entries */}
            <div className="space-y-16 relative">
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-cyan-400 w-8 h-8 rounded-full flex items-center justify-center z-10">
                    <span className="text-dark-900 font-bold">1</span>
                  </div>
                </div>
                <div className="bg-dark-700 p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="text-xl font-bold font-montserrat mb-2">2010 - The Beginning</h3>
                  <p className="text-light-300">
                    Founded in a small studio in New York City, ELEVATE started with a vision to revolutionize footwear design. Our first collection, featuring just three models, sold out within weeks.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-cyan-400 w-8 h-8 rounded-full flex items-center justify-center z-10">
                    <span className="text-dark-900 font-bold">2</span>
                  </div>
                </div>
                <div className="bg-dark-700 p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="text-xl font-bold font-montserrat mb-2">2014 - Global Expansion</h3>
                  <p className="text-light-300">
                    After gaining popularity in North America, we expanded to international markets. Our flagship stores in London, Tokyo, and Paris marked our emergence as a global brand.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-cyan-400 w-8 h-8 rounded-full flex items-center justify-center z-10">
                    <span className="text-dark-900 font-bold">3</span>
                  </div>
                </div>
                <div className="bg-dark-700 p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="text-xl font-bold font-montserrat mb-2">2018 - Innovation Hub</h3>
                  <p className="text-light-300">
                    We established our Innovation Hub, a state-of-the-art research and development center dedicated to pushing the boundaries of footwear technology and sustainable design.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-cyan-400 w-8 h-8 rounded-full flex items-center justify-center z-10">
                    <span className="text-dark-900 font-bold">4</span>
                  </div>
                </div>
                <div className="bg-dark-700 p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="text-xl font-bold font-montserrat mb-2">2023 - Present Day</h3>
                  <p className="text-light-300">
                    Today, ELEVATE continues to lead the industry with our commitment to exceptional quality, innovative design, and sustainable practices. Our community of loyal customers spans across 20 countries and continues to grow.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Team Section */}
        <div className="mb-12">
          <motion.h2 
            className="text-3xl font-bold font-montserrat mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            MEET OUR <span className="text-cyan-400">TEAM</span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {teamMembers?.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <TeamMember member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Values Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold font-montserrat mb-10 text-center">
            OUR <span className="text-cyan-400">VALUES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="rounded-full bg-dark-600 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 2 7l10 5 10-5-10-5Z"></path>
                  <path d="M2 17 12 22 22 17"></path>
                  <path d="M2 12 12 17 22 12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-3">INNOVATION</h3>
              <p className="text-light-300">
                We constantly push boundaries to create footwear that redefines performance, comfort, and style. Our design team embraces challenges and turns them into opportunities for innovation.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="rounded-full bg-dark-600 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"></path>
                  <path d="M11 10.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z"></path>
                  <path d="M15 16.6c2.5-1.3 4-2.57 4-5.1 0-3-2.6-5.5-6-5.5s-6 2.5-6 5.5c0 3 2 5 2 7.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-3">SUSTAINABILITY</h3>
              <p className="text-light-300">
                We're committed to minimizing our environmental footprint through sustainable materials, responsible manufacturing practices, and eco-friendly packaging solutions.
              </p>
            </div>
            
            <div className="bg-dark-700 p-6 rounded-lg flex flex-col items-center text-center">
              <div className="rounded-full bg-dark-600 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-3">QUALITY</h3>
              <p className="text-light-300">
                Excellence is our standard. Every shoe undergoes rigorous testing to ensure durability, comfort, and performance that exceeds expectations and stands the test of time.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="bg-dark-700 p-10 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
            JOIN THE <span className="text-cyan-400">ELEVATE</span> MOVEMENT
          </h2>
          <p className="text-light-300 max-w-2xl mx-auto mb-8">
            Be part of a community that values exceptional design, performance, and sustainability. Subscribe to our newsletter for exclusive releases, behind-the-scenes content, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-dark-600 border-0 rounded-sm py-3 px-4 text-light-100 placeholder-light-400 focus:ring-cyan-400 focus:outline-none"
            />
            <motion.button 
              className="px-6 py-3 bg-cyan-400 text-dark-900 font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
