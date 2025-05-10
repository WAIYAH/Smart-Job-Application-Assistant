import React from 'react';
import { DocumentType } from '../utils/documentGenerator';
import { FileText, PenTool, Linkedin } from 'lucide-react';

interface DocumentTypeSelectorProps {
  documentType: DocumentType;
  setDocumentType: React.Dispatch<React.SetStateAction<DocumentType>>;
}

export const DocumentTypeSelector = ({ documentType, setDocumentType }: DocumentTypeSelectorProps) => {
  const options: { type: DocumentType; title: string; description: string; icon: React.ReactNode }[] = [
    {
      type: 'CV',
      title: 'Curriculum Vitae (CV)',
      description: 'A detailed overview of your skills, experience and accomplishments.',
      icon: <FileText className="h-8 w-8" />,
    },
    {
      type: 'Cover Letter',
      title: 'Cover Letter',
      description: 'A personalized letter highlighting your qualifications for the specific job.',
      icon: <PenTool className="h-8 w-8" />,
    },
    {
      type: 'LinkedIn Bio',
      title: 'LinkedIn Bio',
      description: 'A professional summary for your LinkedIn profile that attracts recruiters.',
      icon: <Linkedin className="h-8 w-8" />,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Select document type to generate
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.type}
            className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
              documentType === option.type
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-blue-200'
            }`}
            onClick={() => setDocumentType(option.type)}
          >
            <div className={`mb-4 ${
              documentType === option.type ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {option.icon}
            </div>
            <h4 className={`font-semibold text-lg mb-2 ${
              documentType === option.type ? 'text-blue-800' : 'text-gray-800'
            }`}>
              {option.title}
            </h4>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};