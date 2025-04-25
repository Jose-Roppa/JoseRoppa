import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

// Dados de exemplo para projetos
const projects = [
  {
    id: 1,
    title: "Sistema de Análise de Dados",
    description: "Aplicação para análise e visualização de dados usando Python e bibliotecas de data science.",
    image: "/images/projects/project1.jpg",
    tags: ["Python", "Data Science", "Visualização"],
    link: "https://github.com/username/project1",
  },
  {
    id: 2,
    title: "Chatbot com Inteligência Artificial",
    description: "Chatbot desenvolvido com tecnologias de processamento de linguagem natural.",
    image: "/images/projects/project2.jpg",
    tags: ["IA", "NLP", "Python", "API"],
    link: "https://github.com/username/project2",
  },
  {
    id: 3,
    title: "Aplicação Web React",
    description: "Aplicação web moderna desenvolvida com React, TypeScript e Tailwind CSS.",
    image: "/images/projects/project3.jpg",
    tags: ["React", "TypeScript", "Web"],
    link: "https://github.com/username/project3",
  },
  {
    id: 4,
    title: "API RESTful",
    description: "API RESTful desenvolvida com FastAPI para integração de serviços.",
    image: "/images/projects/project4.jpg",
    tags: ["API", "Python", "Backend"],
    link: "https://github.com/username/project4",
  },
];

// Extrair todas as tags únicas
const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

const ProjectsSection = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
        >
          Meus Projetos
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Conheça alguns dos projetos que desenvolvi utilizando diversas tecnologias
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            Todos
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12"
          >
            Nenhum projeto encontrado com a tag selecionada.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

