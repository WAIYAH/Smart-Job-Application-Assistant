import React, { useState } from 'react';
import { UserProfileForm } from './UserProfileForm';
import { JobDescriptionInput } from './JobDescriptionInput';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { DocumentPreview } from './DocumentPreview';
import { Button } from './ui/Button';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { UserProfile, DocumentType, generateDocument } from '../utils/documentGenerator';

export const JobAssistant = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    currentRole: '',
    skills: '',
    experience: '',
    education: '',
    achievements: '',
  });
  const [jobDescription, setJobDescription] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('CV');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const content = generateDocument(userProfile, jobDescription, documentType);
      setGeneratedContent(content);
      setIsGenerating(false);
      setStep(4); // Move to preview step
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress bar */}
      <div className="flex w-full bg-gray-100">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 ${
              step >= s ? 'bg-blue-800' : 'bg-gray-200'
            } transition-all duration-300`}
          />
        ))}
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex items-center mb-6">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-800 text-white font-semibold text-sm">
            {step}
          </span>
          <h2 className="ml-3 text-xl font-semibold text-gray-800">
            {step === 1 && 'Your Profile'}
            {step === 2 && 'Job Description'}
            {step === 3 && 'Document Type'}
            {step === 4 && 'Generated Document'}
          </h2>
        </div>

        <div className="mt-6">
          {step === 1 && (
            <UserProfileForm 
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            />
          )}
          
          {step === 2 && (
            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
          )}
          
          {step === 3 && (
            <DocumentTypeSelector
              documentType={documentType}
              setDocumentType={setDocumentType}
            />
          )}
          
          {step === 4 && (
            <DocumentPreview content={generatedContent} documentType={documentType} />
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          {step < 3 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : step === 3 ? (
            <Button 
              variant="primary" 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Document
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setStep(1)}>
              Create New Document
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};