import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Car,
  Train,
  Bike
} from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function Location() {
  const openingHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 7:00 PM' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Coffee Street, Brew City, BC 12345',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@brewhaven.com',
      href: 'mailto:hello@brewhaven.com',
    },
  ];

  const directions = [
    {
      icon: Car,
      title: 'By Car',
      description: 'Free parking available behind the shop. Enter from Main Street.',
    },
    {
      icon: Train,
      title: 'Public Transit',
      description: 'Take Bus 42 to Coffee Street stop, or Metro Line 3 to Brew Station.',
    },
    {
      icon: Bike,
      title: 'By Bike',
      description: 'Bike rack available in front of the shop.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[#C6A75E] font-medium tracking-wide uppercase text-sm">
            Find Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2723] mt-4 mb-4">
            Visit Brew Haven
          </h1>
          <p className="text-[#5D4037] max-w-2xl mx-auto">
            We'd love to see you! Stop by for a freshly brewed coffee and experience our warm, welcoming atmosphere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Google Maps Embed */}
              <div className="relative h-[400px] bg-[#D7B899]/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Brew Haven Location"
                />
              </div>

              {/* Directions Cards */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#3E2723] mb-4">
                  Getting Here
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {directions.map((direction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-4 bg-[#FAF7F2] rounded-xl"
                    >
                      <direction.icon className="w-8 h-8 text-[#C6A75E] mb-3" />
                      <h4 className="font-semibold text-[#3E2723] mb-1">
                        {direction.title}
                      </h4>
                      <p className="text-sm text-[#5D4037]">
                        {direction.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-serif text-xl font-bold text-[#3E2723] mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#C6A75E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#C6A75E]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#5D4037]">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#3E2723] font-medium hover:text-[#C6A75E] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#3E2723] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C6A75E]/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C6A75E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3E2723]">
                  Opening Hours
                </h3>
              </div>
              <div className="space-y-3">
                {openingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-[#D7B899]/20 last:border-b-0"
                  >
                    <span className="text-[#5D4037]">{item.day}</span>
                    <span className="text-[#3E2723] font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://maps.google.com/?q=123+Coffee+Street+Brew+City"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-[#C6A75E] text-[#3E2723] py-4 rounded-xl font-semibold hover:bg-[#3E2723] hover:text-[#F5E6D3] transition-colors flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>
            </a>
          </motion.div>
        </div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
            Our Space
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Brew Haven interior ${index + 1}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  fallbackClassName="w-full h-48"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
