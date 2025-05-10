export type DocumentType = 'CV' | 'Cover Letter' | 'LinkedIn Bio';

export interface UserProfile {
  name: string;
  currentRole: string;
  skills: string;
  experience: string;
  education: string;
  achievements: string;
}

export const generateDocument = (
  userProfile: UserProfile,
  jobDescription: string,
  documentType: DocumentType
): string => {
  // In a real app, this would connect to an actual AI service
  // For this demo, we'll use template-based generation
  
  switch (documentType) {
    case 'CV':
      return generateCV(userProfile, jobDescription);
    case 'Cover Letter':
      return generateCoverLetter(userProfile, jobDescription);
    case 'LinkedIn Bio':
      return generateLinkedInBio(userProfile, jobDescription);
    default:
      return 'Invalid document type selected.';
  }
};

const generateCV = (userProfile: UserProfile, jobDescription: string): string => {
  const { name, currentRole, skills, experience, education, achievements } = userProfile;
  
  // Extract keywords from job description (simplified version)
  const keywords = extractKeywords(jobDescription);
  
  // Create a CV template with the user's information
  return `
${name}
${currentRole}

PROFESSIONAL SUMMARY
Experienced ${currentRole} with expertise in ${skills}. ${experience.split('.')[0]}.

SKILLS
${formatSkills(skills, keywords)}

PROFESSIONAL EXPERIENCE
${experience}

EDUCATION
${education}

${achievements ? `ACHIEVEMENTS\n${achievements}` : ''}

* This CV was specifically tailored for the job description provided, highlighting relevant skills and experience.
`.trim();
};

const generateCoverLetter = (userProfile: UserProfile, jobDescription: string): string => {
  const { name, currentRole, skills, experience, achievements } = userProfile;
  
  // Extract details from job description
  const companyName = extractCompanyName(jobDescription) || '[Company Name]';
  const jobTitle = extractJobTitle(jobDescription) || currentRole;
  
  // Create a cover letter template
  return `
Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background as a ${currentRole} and expertise in ${skills.split(',').slice(0, 3).join(', ')}, I am confident in my ability to make valuable contributions to your team.

${experience.split('.')[0]}. ${experience.split('.').slice(1, 3).join('.')}

${achievements ? achievements.split('.')[0] + '.' : ''}

I am particularly excited about this opportunity because it aligns perfectly with my career goals and skillset. I am impressed by ${companyName}'s reputation for [specific aspect about the company], and I am eager to bring my unique perspective and abilities to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would benefit ${companyName}.

Sincerely,
${name}
`.trim();
};

const generateLinkedInBio = (userProfile: UserProfile, jobDescription: string): string => {
  const { name, currentRole, skills, experience, achievements } = userProfile;
  
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // Create a LinkedIn bio template
  return `
${currentRole} with expertise in ${skills.split(',').slice(0, 5).join(', ')}. 

${experience.split('.').slice(0, 2).join('.')}

${achievements ? achievements.split('.')[0] + '.' : ''}

Passionate about [industry/field] and committed to [value proposition]. Open to new opportunities that leverage my skills in ${formatSkillsInline(skills, keywords)}.

#${skills.split(',').slice(0, 3).map(skill => skill.trim().replace(/\s+/g, '')).join(' #')}
`.trim();
};

// Helper functions
const extractKeywords = (jobDescription: string): string[] => {
  // This is a simplified keyword extraction
  // In a real app, this would use NLP or AI to extract relevant keywords
  const commonSkills = [
    'javascript', 'typescript', 'react', 'node', 'python',
    'java', 'communication', 'leadership', 'project management',
    'agile', 'scrum', 'analytics', 'data', 'marketing', 'sales',
    'customer', 'design', 'ui', 'ux', 'research', 'development'
  ];
  
  return commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
};

const formatSkills = (skills: string, keywords: string[]): string => {
  // Format skills, highlighting those that match keywords from job description
  return skills.split(',')
    .map(skill => skill.trim())
    .map(skill => {
      const isKeyword = keywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase())
      );
      return isKeyword ? `${skill} (Key Requirement)` : skill;
    })
    .join('\n• ').replace(/^/, '• ');
};

const formatSkillsInline = (skills: string, keywords: string[]): string => {
  // Format skills for inline use, prioritizing those that match keywords
  const allSkills = skills.split(',').map(skill => skill.trim());
  const prioritySkills = allSkills.filter(skill => 
    keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
  );
  const otherSkills = allSkills.filter(skill => 
    !keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
  );
  
  return [...prioritySkills, ...otherSkills].slice(0, 5).join(', ');
};

const extractCompanyName = (jobDescription: string): string | null => {
  // This is a simplified way to extract company name
  // In a real app, this would use more sophisticated NLP
  const companyPatterns = [
    /at\s+([A-Z][A-Za-z0-9\s&]+)(?:,|\.|is|\bis\b)/i,
    /([A-Z][A-Za-z0-9\s&]+)\s+is\s+looking/i,
    /([A-Z][A-Za-z0-9\s&]+)\s+is\s+hiring/i,
    /Join\s+([A-Z][A-Za-z0-9\s&]+)/i,
  ];
  
  for (const pattern of companyPatterns) {
    const match = jobDescription.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
};

const extractJobTitle = (jobDescription: string): string | null => {
  // This is a simplified way to extract job title
  // In a real app, this would use more sophisticated NLP
  const titlePatterns = [
    /position\s+of\s+([A-Za-z0-9\s]+)(?:,|\.|at)/i,
    /hiring\s+a\s+([A-Za-z0-9\s]+)(?:,|\.|to)/i,
    /([A-Za-z0-9\s]+)\s+position/i,
    /role\s+of\s+([A-Za-z0-9\s]+)(?:,|\.|at)/i,
  ];
  
  for (const pattern of titlePatterns) {
    const match = jobDescription.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
};