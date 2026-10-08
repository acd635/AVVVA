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
                className="p-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-500 border border-slate-200 transition-colors shadow-sm"
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
              <a
                href="https://wa.me/995505558229"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#25D366] border border-slate-200 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
