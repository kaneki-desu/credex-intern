"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'IT Director',
    company: 'TechCorp Inc.',
    image: '/testimonials/sarah.jpg',
    content: 'SoftSell made selling our unused Microsoft licenses incredibly easy. The process was smooth, and we received payment within 48 hours. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Manager',
    company: 'InnovateSoft',
    image: '/testimonials/michael.jpg',
    content: 'As a software company, we often have excess licenses. SoftSell has been our go-to platform for monetizing them. Their valuation is always fair and competitive.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'CFO',
    company: 'Global Solutions',
    image: '/testimonials/emily.jpg',
    content: 'The team at SoftSell is professional and responsive. They helped us sell our Adobe licenses at a great price, and the entire process was transparent.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            <span className="gradient-text">What Our Clients Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Don't just take our word for it - hear from our satisfied customers
          </motion.p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-between z-10">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-card shadow-card hover:shadow-hover transition-all duration-300 -ml-4"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-card shadow-card hover:shadow-hover transition-all duration-300 -mr-4"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl shadow-card p-8 md:p-12"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-muted-foreground mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 