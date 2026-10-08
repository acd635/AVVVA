import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAdmin }) => {
  return (
    <footer className="bg-[#FAF9F5] text-slate-900 border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-1">
            <div className="flex items-center -ml-1 sm:-ml-1.5 lg:-ml-2 -mt-3.5 sm:-mt-5 lg:-mt-6">
              <img
                src="https://i.postimg.cc/Bb5Ty9pX/AVA-BLACK-SVG.png"
                alt="AVA Jewelry"
                className="h-20 sm:h-28 lg:h-32 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs font-inter font-normal text-slate-600 leading-relaxed max-w-sm -mt-4 sm:-mt-6 lg:-mt-7">
              {lang === 'KA'
                ? 'ქართული საიუველირო ბრენდი AVA Jewelry - ნატურალური ძვირფასი ქვები ექსკლუზიური ნაკეთობა "ბუნებრივი სილამაზე შენი ბუნებრივი არჩევანი"'
                : lang === 'RU'
                ? 'Грузинский ювелирный бренд AVA Jewelry — натуральные драгоценные камни, эксклюзивные изделия "Естественная красота — твой естественный выбор"'
                : 'AVA Jewelry — Natural gemstones and exclusive handcrafted jewelry "Natural beauty, your natural choice"'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/ava.com.ge?stkn=MTE3ZHNqc3Q3cm90cA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white hover:bg-sky-50 text-sky-600 border border-slate-200 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594816206505"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white hover:bg-sky-50 text-sky-600 border border-slate-200 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-montserrat font-medium uppercase tracking-[0.1em] text-sky-600">
              {lang === 'KA' ? 'კოლექციები' : lang === 'RU' ? 'Коллекции' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-xs font-inter font-normal text-slate-600">
              <li><a href="#collections" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'ვარდისფერი მინანქარი' : lang === 'RU' ? 'Розовая эмаль' : 'Rose Enamel Pearl'}</a></li>
              <li><a href="#collections" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'მზის კულონები' : lang === 'RU' ? 'Кулоны Солнце' : 'Sunburst Pendants'}</a></li>
              <li><a href="#collections" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'ბრილიანტის ბეჭდები' : lang === 'RU' ? 'Кольца с бриллиантами' : 'Diamond Solitaires'}</a></li>
              <li><a href="#collections" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'საფირონი & ზურმუხტი' : lang === 'RU' ? 'Сапфиры и изумруды' : 'Sapphires & Emeralds'}</a></li>
            </ul>
          </div>

          {/* Boutique Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-montserrat font-medium uppercase tracking-[0.1em] text-sky-600">
              {lang === 'KA' ? 'სერვისები' : lang === 'RU' ? 'Сервисы' : 'Bespoke Services'}
            </h4>
            <ul className="space-y-2 text-xs font-inter font-normal text-slate-600">
              <li><a href="#certificates" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'GIA სერტიფიკაცია' : lang === 'RU' ? 'GIA Сертификация' : 'GIA Certificate Check'}</a></li>
              <li><a href="#certificates" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'სასაჩუქრე შეფუთვა' : lang === 'RU' ? 'Подарочная упаковка' : 'Velvet Gift Packaging'}</a></li>
              <li><a href="#certificates" className="hover:text-slate-900 transition-colors">{lang === 'KA' ? 'უფასო მიწოდება' : lang === 'RU' ? 'Бесплатная доставка' : 'Insured Courier Delivery'}</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-montserrat font-medium uppercase tracking-[0.1em] text-sky-600">
              {lang === 'KA' ? 'კონტაქტი' : lang === 'RU' ? 'Контакты' : 'Boutique Contact'}
            </h4>
            <ul className="space-y-2.5 text-xs font-inter font-normal text-slate-700">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/D3Qms3qSwGZvrRzj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition-colors"
                >
                  {lang === 'KA' ? 'თბილისი | სიონის.ქ 8' : lang === 'RU' ? 'Тбилиси | ул. Сиони 8' : 'Tbilisi | 8 Sioni St.'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <a href="tel:+995505558229" className="hover:text-slate-900">+995 505 558 229</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <a href="mailto:info@avajewelry.ge" className="hover:text-slate-900">info@avajewelry.ge</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-inter font-normal text-slate-500 gap-4">
          <p>© 2026 AVA JEWELRY. {lang === 'KA' ? 'ყველა უფლება დაცულია.' : lang === 'RU' ? 'Все права защищены.' : 'All Rights Reserved.'}</p>
          <div className="flex gap-4 items-center">
            {onOpenAdmin && (
              <a
                href="#admin"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenAdmin();
                }}
                className="text-sky-600 hover:text-sky-700 font-montserrat font-medium cursor-pointer"
              >
                {lang === 'KA' ? 'ადმინ პანელი' : lang === 'RU' ? 'Панель администратора' : 'Admin Panel'}
              </a>
            )}
            <a href="#" className="hover:text-sky-600">{lang === 'KA' ? 'კონფიდენციალურობა' : lang === 'RU' ? 'Конфиденциальность' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-sky-600">{lang === 'KA' ? 'წესები & პირობები' : lang === 'RU' ? 'Условия обслуживания' : 'Terms of Service'}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
