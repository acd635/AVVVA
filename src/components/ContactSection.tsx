import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  return (
    <section id="contact" className="scroll-mt-24 py-20 bg-[#FAF9F5] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Content Grid: Left Logo & Right Details directly on section background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Large SVG Logo directly on section background */}
          <div className="lg:col-span-5 flex items-center justify-center p-4 lg:p-8">
            <img
              src="https://i.postimg.cc/hvnyh03n/AVA-BLUE-SVG.png"
              alt="AVA JEWELRY"
              referrerPolicy="no-referrer"
              className="w-full max-w-xs sm:max-w-md h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Column: Contact Info & Socials */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-montserrat font-light text-slate-900 tracking-wide">
                AVA JEWELRY
              </h3>
              <p className="text-xs sm:text-sm font-inter text-slate-600 font-normal leading-relaxed max-w-xl">
                {lang === 'KA'
                  ? 'გვეწვიეთ ჩვენს შოურუმში ინდივიდუალური კონსულტაციისთვის ან დაგვიკავშირდით სოციალური ქსელებისა და ტელეფონის მეშვეობით.'
                  : lang === 'RU'
                  ? 'Посетите наш флагманский шоурум в Тбилиси для индивидуальной консультации или свяжитесь с нами по телефону и в соцсетях.'
                  : 'Visit our flagship Tbilisi showroom for a private consultation or reach out to us via phone, email, and social networks.'}
              </p>
            </div>

            {/* Contact Details List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm font-inter text-slate-700">
              
              {/* Showroom Location */}
              <a
                href="https://maps.app.goo.gl/D3Qms3qSwGZvrRzj8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all group cursor-pointer"
              >
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0 group-hover:bg-sky-100 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-montserrat font-light uppercase tracking-wider text-sky-700 block mb-0.5">
                    {lang === 'KA' ? 'შოურუმი' : lang === 'RU' ? 'Шоурум' : 'Showroom'}
                  </span>
                  <span className="font-normal text-slate-900 group-hover:text-sky-600 transition-colors block">
                    {lang === 'KA' ? 'თბილისი | სიონის.ქ 8' : lang === 'RU' ? 'Тбилиси | ул. Сиони 8' : 'Tbilisi | 8 Sioni St.'}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-montserrat font-light uppercase tracking-wider text-sky-700 block mb-0.5">
                    {lang === 'KA' ? 'ტელეფონის ნომერი' : lang === 'RU' ? 'Телефон' : 'Phone Number'}
                  </span>
                  <a href="tel:+995322000000" className="font-normal text-slate-900 hover:text-sky-600 transition-colors block">
                    +995 32 200 00 00
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-montserrat font-light uppercase tracking-wider text-sky-700 block mb-0.5">
                    {lang === 'KA' ? 'ელ-ფოსტა' : lang === 'RU' ? 'Эл. почта' : 'Email Address'}
                  </span>
                  <a href="mailto:info@avajewelry.ge" className="font-normal text-slate-900 hover:text-sky-600 transition-colors block">
                    info@avajewelry.ge
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-montserrat font-light uppercase tracking-wider text-sky-700 block mb-0.5">
                    {lang === 'KA' ? 'სამუშაო საათები' : lang === 'RU' ? 'Часы работы' : 'Opening Hours'}
                  </span>
                  <span className="font-normal text-slate-900 block">
                    {lang === 'KA' ? 'ორშ - შაბ: 11:00 - 20:00' : lang === 'RU' ? 'Пн - Сб: 11:00 - 20:00' : 'Mon - Sat: 11:00 - 20:00'}
                  </span>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-3">
              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/profile.php?id=61594816206505"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200 rounded-full text-xs font-montserrat font-medium transition-all shadow-sm group"
              >
                <Facebook className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/ava.com.ge?stkn=MTE3ZHNqc3Q3cm90cA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-600 border border-slate-200 rounded-full text-xs font-montserrat font-medium transition-all shadow-sm group"
              >
                <Instagram className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
