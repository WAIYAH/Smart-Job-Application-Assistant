import React from 'react';
import { UserProfile } from '../utils/documentGenerator';
import { InputGroup } from './ui/InputGroup';
import { TextArea } from './ui/TextArea';

interface UserProfileFormProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const UserProfileForm = ({ userProfile, setUserProfile }: UserProfileFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Enter your professional details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="Full Name"
          name="name"
          value={userProfile.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        
        <InputGroup
          label="Current Role"
          name="currentRole"
          value={userProfile.currentRole}
          onChange={handleChange}
          placeholder="Software Engineer"
          required
        />
      </div>
      
      <TextArea
        label="Skills"
        name="skills"
        value={userProfile.skills}
        onChange={handleChange}
        placeholder="JavaScript, React, Node.js, PostgreSQL, etc."
        hint="Enter skills separated by commas"
        required
        rows={3}
      />
      
      <TextArea
        label="Experience"
        name="experience"
        value={userProfile.experience}
        onChange={handleChange}
        placeholder="5+ years in software development with focus on web technologies..."
        hint="Summarize your relevant work experience"
        required
        rows={4}
      />
      
      <TextArea
        label="Education"
        name="education"
        value={userProfile.education}
        onChange={handleChange}
        placeholder="BS in Computer Science, University of Technology (2015-2019)"
        hint="Include degrees, institutions, and years"
        required
        rows={3}
      />
      
      <TextArea
        label="Achievements"
        name="achievements"
        value={userProfile.achievements}
        onChange={handleChange}
        placeholder="Led a team that increased product performance by 40%..."
        hint="List your key professional accomplishments"
        rows={4}
      />
    </div>
  );
};