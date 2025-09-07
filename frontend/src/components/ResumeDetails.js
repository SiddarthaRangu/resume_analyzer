const Section = ({ title, children }) => (
  <div className="bg-neutral-card p-6 rounded-lg shadow-sm border border-neutral-border">
    <h3 className="text-xl font-bold text-primary-dark-blue mb-4">
      {title}
    </h3>
    <div className="space-y-4 text-neutral-text-secondary">
      {children}
    </div>
  </div>
);

const SkillPill = ({ skill }) => (
  <span className="bg-blue-50 text-primary-blue text-sm font-semibold px-3 py-1 rounded-full border border-blue-200">
    {skill}
  </span>
);

const AiAnalysisSection = ({ analysis, name }) => {
  if (!analysis) return null;

  const feedbackItems = [
    { title: "Summary Feedback", content: analysis.summary_feedback },
    { title: "Experience Feedback", content: analysis.experience_feedback },
    { title: "Skills Feedback", content: analysis.skills_feedback },
    { title: "Formatting Feedback", content: analysis.formatting_feedback }
  ];

  return (
    <div className="bg-[#0D1B2A] text-white p-8 rounded-lg shadow-2xl">
      <div className="flex justify-between items-start pb-4 border-b border-white/20">
        <div>
          <h2 className="text-2xl font-bold">AI Analysis Results</h2>
          <p className="text-blue-200 mt-2 max-w-3xl">
            <span className='font-semibold'>{name ? `${name}, you have` : 'You have'} a strong foundation!</span> {analysis.final_verdict}
          </p>
        </div>
        <div className="text-center bg-accent-yellow text-primary-dark-blue font-bold p-3 rounded-md ml-4 flex-shrink-0">
          <span className="text-3xl">{analysis.overall_rating}</span>
          <span className="text-xs block">/10</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {feedbackItems.map(item => (
          <div key={item.title}>
            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
            <p className="text-blue-200 leading-relaxed text-sm">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpskillingRoadmap = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <Section title="Upskilling Roadmap">
      <div className="space-y-4">
        {suggestions.map((item, i) => (
          <div key={i} className="flex items-start space-x-4 p-4 bg-green-50/50 rounded-md border border-green-200">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">{item.skill}</h4>
              <p className="text-sm text-green-800">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ResumeDetails = ({ data }) => {
  if (!data) return null;

  const {
    name, work_experience, education, technical_skills, projects,
    analysis, upskilling_suggestions,
  } = data;

  const isEmptyArray = (arr) => !arr || arr.length === 0;

  return (
    <div className="space-y-6">
      
      <AiAnalysisSection analysis={analysis} name={name} />

      <UpskillingRoadmap suggestions={upskilling_suggestions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {!isEmptyArray(work_experience) && (
            <Section title="Work Experience">
              {work_experience.map((job, i) => (
                <div key={i} className="not-last:border-b not-last:pb-4 border-neutral-border">
                  <h4 className="text-lg font-semibold text-neutral-text-primary">{job.role}</h4>
                  <p className="font-medium text-neutral-text-secondary">{job.company} | {job.duration}</p>
                  <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                    {(job.description || []).map((desc, j) => <li key={j}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {!isEmptyArray(projects) && (
            <Section title="Projects">
              {projects.map((proj, i) => (
                <div key={i} className="not-last:border-b not-last:pb-4 border-neutral-border">
                  <h4 className="font-semibold text-lg text-neutral-text-primary">{proj.name}</h4>
                  <p className="mt-1 text-sm">{proj.description}</p>
                  {!isEmptyArray(proj.tech_stack) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proj.tech_stack.map((tech, j) => <SkillPill key={j} skill={tech} />)}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        <div className="space-y-6">
          {!isEmptyArray(technical_skills) && (
            <Section title="Technical Skills">
              <div className="flex flex-wrap gap-2">
                {technical_skills.map((skill, i) => <SkillPill key={i} skill={skill} />)}
              </div>
            </Section>
          )}

          {!isEmptyArray(education) && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} className="not-last:border-b not-last:pb-4 border-neutral-border">
                  <h4 className="font-semibold text-neutral-text-primary">{edu.degree}</h4>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-neutral-text-secondary">{edu.graduation_year}</p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;