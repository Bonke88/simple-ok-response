
import React from 'react';
import { SEO } from '@/components/seo/SEO';
import ProjectScorerForm from '@/components/tools/ProjectScorerForm';
import ProjectScorerResults from '@/components/tools/ProjectScorerResults';
import { useState } from 'react';

const ProjectScorer = () => {
  const [result, setResult] = useState(null);

  return (
    <>
      <SEO 
        title="Project Viability Scorer - Validate Your Side Project Idea"
        description="Get an objective score for your side project idea. Evaluate market potential, competition risk, and founder fit to make better decisions."
        canonical="/tools/project-scorer"
      />
      <div className="container mx-auto px-4 py-8">
        {!result ? (
          <ProjectScorerForm onComplete={setResult} />
        ) : (
          <ProjectScorerResults result={result} />
        )}
      </div>
    </>
  );
};

export default ProjectScorer;
