import React from 'react';
import { TextArea } from './ui/TextArea';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const JobDescriptionInput = ({ jobDescription, setJobDescription }: JobDescriptionInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const isJobDescriptionShort = jobDescription.length < 100 && jobDescription.length > 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Enter the job description
      </h3>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              For best results, include the full job description. This helps the assistant generate more targeted documents that match the specific requirements of the position.
            </p>
          </div>
        </div>
      </div>
      
      <TextArea
        label="Job Description"
        name="jobDescription"
        value={jobDescription}
        onChange={handleChange}
        placeholder="Copy and paste the full job description here..."
        required
        rows={10}
      />
      
      {isJobDescriptionShort && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-2 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                The job description seems short. Including more details will help generate better tailored documents.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};