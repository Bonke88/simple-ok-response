
import React from 'react';
import SEO from '@/components/seo/SEO';
import ProjectScorerForm from '@/components/tools/ProjectScorerForm';
import ProjectScorerResults from '@/components/tools/ProjectScorerResults';
import { useState } from 'react';

const ProjectScorer = () => {
  const [result, setResult] = useState(null);

  return (
    <>
      <SEO 
        title="Let's See If Anyone Will Actually Pay For This - Project Viability Scorer"
        description="5 minutes of brutal honesty about your side project idea. Could save you 5 months of wasted building."
        url="/tools/project-scorer"
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
