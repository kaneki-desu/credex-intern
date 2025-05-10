"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const exampleQuestions = [
  "How do I sell my license?",
  "What types of licenses do you accept?",
  "How long does the process take?",
  "What are your fees?",
];

const mockResponses: { [key: string]: string } = {
  "How do I sell my license?": "To sell your license, simply fill out our contact form with your license details. Our team will review it and provide you with a valuation within 24 hours.",
  "What types of licenses do you accept?": "We accept various software licenses including Microsoft, Adobe, Autodesk, and other major software providers. Contact us to check if your specific license is eligible.",
  "How long does the process take?": "The entire process typically takes 2-3 business days from submission to payment. This includes license verification, valuation, and payment processing.",
  "What are your fees?": "Our service fee is 10% of the final sale price. This covers all processing, verification, and secure transfer costs. No hidden fees!",
};

const API_URL = "https://credex-intern-1.onrender.com/api";

const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const messageVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      controls.start("visible");
    }
  }, [isOpen, controls]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      console.log('Sending message to AI advisor:', inputValue);
      const botResponse = await axios.post(`${API_URL}/chat`, {
        message: inputValue
      });
      console.log('Message Content:', botResponse.data.message);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse.data.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch(error) {
      console.error('Error sending message to AI advisor:', error);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-card flex flex-col z-50 overflow-hidden border border-border"
          >
            <div className="p-4 border-b border-border flex justify-between items-center bg-primary text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4  bg-background/20 rounded-xl shadow-lg backdrop-blur-lg border border-background/30 p-6 max-w-md mx-auto">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    How can I help you today?
                  </p>
                  <div className="space-y-2">
                    {exampleQuestions.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          const userMessage: Message = {
                            id: Date.now(),
                            text: question,
                            sender: 'user',
                            timestamp: new Date(),
                          };
                          setMessages(prev => [...prev, userMessage]);
                          
                          const botMessage: Message = {
                            id: Date.now() + 1,
                            text: mockResponses[question],
                            sender: 'bot',
                            timestamp: new Date(),
                          };
                          setMessages(prev => [...prev, botMessage]);
                        }}
                        className="w-full text-left p-3 text-sm bg-card rounded-xl hover:bg-hover-bg transition-all duration-300 shadow-sm hover:shadow-md border border-border text-foreground"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-start gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md"
                      >
                        <Bot className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-card border border-border text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </motion.div>
                    {message.sender === 'user' && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md"
                      >
                        <User className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border bg-card 
            bg-background/20 rounded-xl shadow-lg backdrop-blur-xxl border border-background/30 p-6 max-w-md mx-auto
            ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="p-2 bg-primary text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 