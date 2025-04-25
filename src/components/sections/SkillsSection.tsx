import React from "react";
import { Code, Globe2 } from "lucide-react";

const skills = [
  "Python",
  "HTML/CSS",
  "Infraestrutura de Software",
  "SQL",
  "JavaScript",
  "TypeScript"
];

const languages = [
  { name: "Inglês", level: "Proficiente" },
  { name: "Português", level: "Fluente" }
];

const SkillsSection = () => (
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
      Habilidades & Idiomas
    </h2>
    <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center items-start md:items-stretch">
      <div className="flex-1 bg-gradient-to-br from-purple-900/30 to-purple-700/10 rounded-2xl p-8 shadow-lg border border-purple-500/10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-7 h-7 text-purple-400" />
          <h3 className="text-2xl font-semibold text-purple-300">Habilidades Técnicas</h3>
        </div>
        <ul className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <li
              key={skill}
              className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-100 border border-purple-400/30 text-sm font-medium shadow-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-gradient-to-br from-pink-900/30 to-pink-700/10 rounded-2xl p-8 shadow-lg border border-pink-500/10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Globe2 className="w-7 h-7 text-pink-400" />
          <h3 className="text-2xl font-semibold text-pink-300">Idiomas</h3>
        </div>
        <ul className="space-y-3 w-full max-w-xs mx-auto">
          {languages.map((lang) => (
            <li key={lang.name} className="flex items-center justify-between bg-pink-500/10 rounded-lg px-4 py-2">
              <span className="font-medium text-pink-200">{lang.name}</span>
              <span className="text-pink-400 text-sm">{lang.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default SkillsSection; 