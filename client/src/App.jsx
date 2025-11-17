import React, { useState, useEffect } from 'react';
import { Volume2, Box, Zap, Shield, Mail, Phone, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import './index.css'

export default function BrailleReadLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields');
      return;
    }

    setFormStatus('Sending...');

    try {
      const response = await fetch('https://project-braille.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('✓ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('✗ ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('✗ Failed to send message. Please try again.');
    }
  };

  const features = [
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Audio Feedback",
      description: "Crystal-clear voice output that reads braille codes instantly, providing immediate audio confirmation."
    },
    {
      icon: <Box className="w-8 h-8" />,
      title: "Modular Design",
      description: "3D printed braille pieces that are easy to handle, durable, and expandable for learning new words."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Recognition",
      description: "Advanced sensing technology reads braille patterns in milliseconds with 99.9% accuracy."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Built to Last",
      description: "Robust construction with tactile buttons designed for daily use and maximum reliability."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg z-50 border-b border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BrailleRead
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition">About</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-blue-400 transition">Features</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-blue-900/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 hover:bg-blue-900/20 rounded">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 hover:bg-blue-900/20 rounded">About</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 hover:bg-blue-900/20 rounded">Features</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 hover:bg-blue-900/20 rounded">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                Revolutionizing Accessibility
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Empowering Independence
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Through Touch & Sound
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              BrailleRead transforms braille learning with an innovative device that instantly converts tactile braille pieces into clear audio, making education accessible and engaging.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
              >
                Discover More
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-400 rounded-lg font-semibold hover:bg-blue-400/10 transition-all"
              >
                Get in Touch
              </button>
            </div>

            <div className="pt-12 animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto text-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">About BrailleRead</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-blue-400">Innovation Meets Accessibility</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  BrailleRead is a groundbreaking assistive device designed to bridge the gap between tactile braille learning and audio feedback. Our 3D-printed device features an intelligent reader space that recognizes braille patterns on modular pieces.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  With three intuitive buttons and instant voice output, users can independently explore and learn new words at their own pace. Each 3D-printed braille piece is carefully crafted to ensure accurate tactile feedback and seamless recognition.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400">99.9%</div>
                    <div className="text-sm text-slate-400">Accuracy Rate</div>
                  </div>
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400">0.5s</div>
                    <div className="text-sm text-slate-400">Response Time</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-4 p-8">
                    <Box className="w-24 h-24 mx-auto text-blue-400" />
                    <p className="text-lg font-semibold">3D Printed Braille Reader</p>
                    <p className="text-sm text-slate-400">Compact design with reader space and tactile buttons</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-animate className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Designed with cutting-edge technology to provide the best learning experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:transform hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="text-3xl font-bold text-blue-400 mb-2">Simple</h4>
                  <p className="text-slate-300">Three-button interface for easy navigation</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-purple-400 mb-2">Expandable</h4>
                  <p className="text-slate-300">Add new braille pieces as you learn</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-pink-400 mb-2">Portable</h4>
                  <p className="text-slate-300">Compact design for learning anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
              <p className="text-xl text-slate-300">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-slate-400">contact@brailleread.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-slate-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-slate-400">Innovation Hub, Tech Valley</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
                  <h4 className="font-semibold mb-2">Open for Collaboration</h4>
                  <p className="text-slate-400">
                    We're always looking for partners, educators, and advocates to help make BrailleRead accessible to everyone who needs it.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="5"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
                      placeholder="Tell us about your inquiry..."
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                  {formStatus && (
                    <p className="text-center text-green-400 text-sm">{formStatus}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-blue-900/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Volume2 className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold">BrailleRead</span>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering independence through innovative assistive technology. Making braille learning accessible, engaging, and effective.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-slate-400 hover:text-blue-400 transition">Home</button>
                <button onClick={() => scrollToSection('about')} className="block text-slate-400 hover:text-blue-400 transition">About</button>
                <button onClick={() => scrollToSection('features')} className="block text-slate-400 hover:text-blue-400 transition">Features</button>
                <button onClick={() => scrollToSection('contact')} className="block text-slate-400 hover:text-blue-400 transition">Contact</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-blue-400 transition">Privacy Policy</a>
                <a href="#" className="block text-slate-400 hover:text-blue-400 transition">Terms of Service</a>
                <a href="#" className="block text-slate-400 hover:text-blue-400 transition">Accessibility</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-900/20 pt-8 text-center text-slate-400">
            <p>&copy; 2025 BrailleRead. All rights reserved. Built with passion for accessibility.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}