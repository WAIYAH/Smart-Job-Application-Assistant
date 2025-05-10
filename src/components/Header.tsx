import React from 'react';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-8 w-8 text-blue-800" />
          <h1 className="text-xl font-bold text-gray-800">
            Smart Job Application Assistant
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li className="text-blue-700 hover:text-blue-900 transition-colors">
              <a href="#" className="text-sm font-medium">
                Home
              </a>
            </li>
            <li className="text-gray-600 hover:text-blue-700 transition-colors">
              <a href="#" className="text-sm font-medium">
                Templates
              </a>
            </li>
            <li className="text-gray-600 hover:text-blue-700 transition-colors">
              <a href="#" className="text-sm font-medium">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};