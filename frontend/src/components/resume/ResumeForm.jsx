import { FiPlus, FiTrash2 } from "react-icons/fi";

const Input = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-black/70 uppercase tracking-wider">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="bg-white border-2 border-black/25 text-[#0A0A0A] text-xs rounded-lg
       px-2.5 py-2 outline-none focus:border-black/60 transition-colors placeholder-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      />
    </div>
  );
};

const TextArea = ({ label, value, onChange, placeholder, rows = 3 }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-black/70 uppercase tracking-wider">
        {label}
      </label>

      <textarea
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        rows={rows}
        className="bg-white border-2 border-black/25 text-[#0A0A0A] text-xs rounded-lg
       px-2.5 py-2 outline-none focus:border-black/60 transition-colors placeholder-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)] resize-none"
      />
    </div>
  );
};

const EntryCard = ({ children, onRemove }) => {
  return (
    <div className="relative overflow-hidden bg-[#F8F9FA] border-2 border-black/15 rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <button
        onClick={onRemove}
        className="absolute top-2.5 right-2.5 z-10 text-black/35 hover:text-red-500 transition-colors cursor-pointer"
      >
        <FiTrash2 size={13} />
      </button>

      <div className="relative flex flex-col gap-2.5 pr-6">{children}</div>
    </div>
  );
};

const ResumeForm = ({ step, data, setData }) => {
  if (step === 1) {
    return (
      <div className="flex flex-col gap-3">
        <Input
          label="Full Name"
          value={data.name}
          placeholder="Sarfaraz Akram"
          onChange={(v) => setData({ ...data, name: v })}
        />
        <Input
          label="Email"
          value={data.email}
          placeholder="sarfaraz@email.com"
          onChange={(v) => setData({ ...data, email: v })}
        />
        <Input
          label="Phone"
          value={data.phone}
          placeholder="+880 1952365412"
          onChange={(v) => setData({ ...data, phone: v })}
        />
        <Input
          label="Location"
          value={data.location}
          placeholder="Saidpur, Nilphamari"
          onChange={(v) => setData({ ...data, location: v })}
        />
        <Input
          label="LinkedIn URL"
          value={data.linkedin}
          placeholder="linkedin.com/in/sarfaraz"
          onChange={(v) => setData({ ...data, linkedin: v })}
        />
        <Input
          label="Github URL"
          value={data.github}
          placeholder="github.com/sarfaraz"
          onChange={(v) => setData({ ...data, github: v })}
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-3">
        {" "}
        <TextArea
          label="Professional Summary"
          value={data.summary}
          placeholder="Backend Developer with 2+ years of experience building scalable Node.js and MongoDB applications..."
          onChange={(v) => setData({ ...data, summary: v })}
          rows={5}
        />
        <p className="text-[10px] text-black/40">
          Leave expty to skip this section.
        </p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col gap-3">
        <TextArea
          label="Skills (comma separated)"
          value={data.skills}
          rows={4}
          placeholder="JavaScript, TypeScript, React, Node.js, Express, MongoDB, Redis, Docker, AWS, Git"
          onChange={(v) => setData({ ...data, skills: v })}
        />
        <p className="text-[10px] text-black/40">
          Separate each skill with a comma.
        </p>
      </div>
    );
  }

  if (step === 4) {
    const addExp = () => {
      setData({
        ...data,
        experience: [
          ...data.experience,
          { company: "", role: "", duration: "", description: "" },
        ],
      });
    };

    const removeExp = (index) => {
      setData({
        ...data,
        experience: data.experience.filter((_, i) => i !== index),
      });
    };

    const updateExp = (index, field, value) => {
      const updated = data.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      );
      setData({
        ...data,
        experience: updated,
      });
    };

    return (
      <div className="flex flex-col gap-3">
        {data.experience.length === 0 && (
          <p className="text-xs text-black/40 text-center py-3">
            No experience added yet. Click below to add.
          </p>
        )}

        {data.experience.map((exp, i) => (
          <EntryCard key={i} onRemove={() => removeExp(i)}>
            <Input
              label="Company"
              value={exp.company}
              placeholder="ABC Technologies"
              onChange={(v) => updateExp(i, "company", v)}
            />
            <Input
              label="Role"
              value={exp.role}
              placeholder="Backend Developer"
              onChange={(v) => updateExp(i, "role", v)}
            />
            <Input
              label="Duration"
              value={exp.duration}
              placeholder="Jan 2023 - Dec 2024"
              onChange={(v) => updateExp(i, "duration", v)}
            />
            <TextArea
              label="Description"
              value={exp.description}
              placeholder={"• Built Rest APIs\n• Improved performance by 40%"}
              onChange={(v) => updateExp(i, "description", v)}
            />
          </EntryCard>
        ))}

        <button
          onClick={addExp}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 rounded-xl text-xs text-black/45 hover:border-black/40 hover:text-[#0A0A0A] transition-all cursor-pointer"
        >
          <FiPlus size={13} />
          Add Experience
        </button>
      </div>
    );
  }

  if (step === 5) {
    const addPro = () => {
      setData({
        ...data,
        projects: [
          ...data.projects,
          {
            name: "",
            tectStack: "",
            github: "",
            live: "",
            description: "",
          },
        ],
      });
    };

    const removePro = (index) => {
      setData({
        ...data,
        projects: data.projects.filter((_, i) => i !== index),
      });
    };

    const updatePro = (index, field, value) => {
      const updated = data.projects.map((pro, i) =>
        i === index ? { ...pro, [field]: value } : pro,
      );
      setData({
        ...data,
        projects: updated,
      });
    };

    return (
      <div className="flex flex-col gap-3">
        {data.projects.length === 0 && (
          <p className="text-xs text-black/40 text-center py-3">
            No project added yet. Click below to add.
          </p>
        )}

        {data.projects.map((pro, i) => (
          <EntryCard key={i} onRemove={() => removePro(i)}>
            <Input
              label="Project Name"
              value={pro.name}
              placeholder="InterviewIQ"
              onChange={(v) => updatePro(i, "name", v)}
            />
            <Input
              label="Tech Stack"
              value={pro.techStack}
              placeholder="React, Node.js, MongoDB"
              onChange={(v) => updatePro(i, "techStack", v)}
            />
            <Input
              label="Github Link"
              value={pro.github}
              placeholder="github.com/sarfaraz/interviewiq"
              onChange={(v) => updatePro(i, "github", v)}
            />
            <Input
              label="Live Link"
              value={pro.live}
              placeholder="interviewiq.com"
              onChange={(v) => updatePro(i, "live", v)}
            />
            <TextArea
              label="Description"
              value={pro.description}
              placeholder="AI-powered interview preparation platform with mock interviews and resume builder."
              onChange={(v) => updatePro(i, "description", v)}
            />
          </EntryCard>
        ))}

        <button
          onClick={addPro}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 rounded-xl text-xs text-black/45 hover:border-black/40 hover:text-[#0A0A0A] transition-all cursor-pointer"
        >
          <FiPlus size={13} />
          Add Project
        </button>
      </div>
    );
  }

  if (step === 6) {
    const addEdu = () => {
      setData({
        ...data,
        education: [
          ...data.education,
          { college: "", degree: "", branch: "", cgpa: "", year: "" },
        ],
      });
    };

    const removeEdu = (index) => {
      setData({
        ...data,
        education: data.education.filter((_, i) => i !== index),
      });
    };

    const updateEdu = (index, field, value) => {
      const updated = data.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      );
      setData({
        ...data,
        education: updated,
      });
    };

    return (
      <div className="flex flex-col gap-3">
        {data.education.length === 0 && (
          <p className="text-xs text-black/40 text-center py-3">
            No education added yet. Click below to add.
          </p>
        )}

        {data.education.map((edu, i) => (
          <EntryCard key={i} onRemove={() => removeEdu(i)}>
            <Input
              label="College / University"
              value={edu.college}
              placeholder="SR Group of Institutions"
              onChange={(v) => updateEdu(i, "college", v)}
            />
            <Input
              label="Degree"
              value={edu.degree}
              placeholder="B.Tech"
              onChange={(v) => updateEdu(i, "degree", v)}
            />
            <Input
              label="Branch"
              value={edu.branch}
              placeholder="Computer Science"
              onChange={(v) => updateEdu(i, "branch", v)}
            />
            <Input
              label="CGPA"
              value={edu.cgpa}
              placeholder="4.5"
              onChange={(v) => updateEdu(i, "cgpa", v)}
            />
            <Input
              label="Year"
              value={edu.year}
              placeholder="2021 - 2025"
              onChange={(v) => updateEdu(i, "year", v)}
            />
          </EntryCard>
        ))}

        <button
          onClick={addEdu}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-black/20 rounded-xl text-xs text-black/45 hover:border-black/40 hover:text-[#0A0A0A] transition-all cursor-pointer"
        >
          <FiPlus size={13} />
          Add Education
        </button>
      </div>
    );
  }
};

export default ResumeForm;
