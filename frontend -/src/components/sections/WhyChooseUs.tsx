"use client"
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Clock } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Bank-level security for all transactions'
  },
  {
    icon: TrendingUp,
    title: 'Best Market Rates',
    description: 'Competitive pricing for your licenses'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Get paid within 24 hours'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
            >
              <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 