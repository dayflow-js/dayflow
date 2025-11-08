'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const locales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Detect current locale from pathname (e.g., /en/docs -> en)
  const getCurrentLocale = () => {
    const path = pathname || '';
    const match = path.match(/^\/([^\/]+)/);
    if (match && locales.some(l => l.code === match[1])) {
      return match[1];
    }
    return 'en';
  };

  const currentLocale = getCurrentLocale();
  const currentLang = locales.find(l => l.code === currentLocale) || locales[0];

  const switchLanguage = (newLocale: string) => {
    // Replace the locale in the path (e.g., /en/docs -> /zh/docs)
    const path = pathname || '/';
    const newPath = path.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => {
                    switchLanguage(locale.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${currentLocale === locale.code ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                  role="menuitem"
                >
                  <span>{locale.flag}</span>
                  <span>{locale.name}</span>
                  {currentLocale === locale.code && (
                    <svg className="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
