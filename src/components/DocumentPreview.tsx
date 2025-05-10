import React, { useState } from 'react';
import { Button } from './ui/Button';
import { DocumentType } from '../utils/documentGenerator';
import { Check, Copy, Download, CheckCircle } from 'lucide-react';

interface DocumentPreviewProps {
  content: string;
  documentType: DocumentType;
}

export const DocumentPreview = ({ content, documentType }: DocumentPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    
    let filename = '';
    switch (documentType) {
      case 'CV':
        filename = 'my_cv.txt';
        break;
      case 'Cover Letter':
        filename = 'cover_letter.txt';
        break;
      case 'LinkedIn Bio':
        filename = 'linkedin_bio.txt';
        break;
    }
    
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">
          Your Generated {documentType}
        </h3>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            {downloadSuccess ? <CheckCircle size={16} /> : <Download size={16} />}
            {downloadSuccess ? 'Downloaded!' : 'Download'}
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-[500px] overflow-auto whitespace-pre-wrap">
        {content ? (
          <div className="prose max-w-none">
            {content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No content generated yet
          </div>
        )}
      </div>
      
      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-blue-800 text-sm font-semibold mb-2 flex items-center">
          <CheckCircle size={16} className="mr-2" />
          Success Tips
        </h4>
        <p className="text-sm text-blue-700">
          {documentType === 'CV' && 
            'Review your CV for any gaps or inconsistencies. Tailor it further by emphasizing achievements with quantifiable results.'}
          {documentType === 'Cover Letter' && 
            'Personalize your cover letter by addressing the hiring manager by name if possible. Add company-specific details to show your research.'}
          {documentType === 'LinkedIn Bio' && 
            'Add keywords relevant to your industry to optimize your LinkedIn profile for search. Connect your bio to your career achievements.'}
        </p>
      </div>
    </div>
  );
};