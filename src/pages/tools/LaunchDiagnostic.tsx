
import React, { useState } from 'react';
import SEO from '@/components/seo/SEO';
import LaunchDiagnosticForm from '@/components/tools/LaunchDiagnosticForm';
import LaunchDiagnosticResults from '@/components/tools/LaunchDiagnosticResults';

const LaunchDiagnostic = () => {
  const [result, setResult] = useState(null);

  return (
    <>
      <SEO 
        title="Will I Ever Launch? Diagnostic Tool"
        description="Get an honest assessment of your launch probability based on your current situation and mindset."
        canonical="/tools/launch-diagnostic"
      />
      <div className="container mx-auto px-4 py-8">
        {!result ? (
          <LaunchDiagnosticForm onComplete={setResult} />
        ) : (
          <LaunchDiagnosticResults result={result} />
        )}
      </div>
    </>
  );
};

export default LaunchDiagnostic;
