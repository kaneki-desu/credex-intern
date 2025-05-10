"use client"

import { motion } from 'framer-motion';
import { Shield, Clock, DollarSign, Users, CheckCircle, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'All transactions are protected with enterprise-grade security and encryption.',
  },
  {
    icon: Clock,
    title: 'Fast Process',
    description: 'Get your license valued within 24 hours and receive payment within 2-3 business days.',
  },
  {
    icon: DollarSign,
    title: 'Best Market Rates',
    description: 'We ensure you get the best possible value for your software licenses.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team of experts is available to guide you through the entire process.',
  },
  {
    icon: CheckCircle,
    title: 'Verified Buyers',
    description: 'All buyers are thoroughly vetted to ensure safe and legitimate transactions.',
  },
  {
    icon: Zap,
    title: 'Instant Updates',
    description: 'Stay informed with real-time updates on your license status and valuation.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            <span className="gradient-text">Why Choose Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Experience the most trusted platform for selling your software licenses
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full p-6 bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-xl bg-card text-foreground">
            <span className="text-sm font-medium">Trusted by over</span>
            <span className="ml-2 text-2xl font-bold gradient-text">10,000+</span>
            <span className="ml-2 text-sm font-medium">businesses worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 