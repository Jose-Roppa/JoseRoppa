import { motion } from "framer-motion";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="
        light:bg-white light:shadow-lg light:border light:border-pink-100 
        dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-pink-900/20 dark:backdrop-blur-lg dark:border dark:border-white/10
        rounded-xl overflow-hidden transition-all duration-300 
        light:hover:border-pink-300 light:hover:shadow-xl light:hover:shadow-pink-100/30
        dark:hover:border-purple-500/50 dark:hover:shadow-xl dark:hover:shadow-purple-500/10 
        h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="animate-pulse flex space-x-4">
              <ImageIcon className="w-12 h-12 text-gray-600" />
            </div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-500 mt-2">Imagem não disponível</p>
            </div>
          </div>
        ) : (
          <img
            src={project.image || "https://via.placeholder.com/600x400?text=Projeto"}
            alt={`Imagem do projeto ${project.title}`}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-3">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ver código do projeto ${project.title} no GitHub`}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ver demonstração do projeto ${project.title}`}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold light:text-gray-800 dark:text-white mb-2">{project.title}</h3>
        <p className="light:text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs 
                light:bg-pink-100 light:text-pink-800 light:border light:border-pink-200
                dark:bg-purple-500/30 dark:text-purple-200 dark:border dark:border-purple-500/20 
                rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
