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
                  <a href="tel:+995505558229" className="font-normal text-slate-900 hover:text-sky-600 transition-colors block">
                    +995 505 558 229
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
            <div className="pt-3 border-t border-slate-200/80 space-y-3">
              <div className="grid grid-cols-2 gap-3">
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

              {/* WhatsApp Link Centered Below Facebook and Instagram */}
              <div className="flex justify-center">
                <a
                  href="https://wa.me/995505558229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-full text-xs font-montserrat font-medium transition-all shadow-sm group"
                >
                  <svg
                    className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
