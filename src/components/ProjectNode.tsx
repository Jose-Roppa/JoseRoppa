
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData } from '../types/mindmap';
import { Github, ExternalLink } from 'lucide-react';
import { Handle, Position } from '@xyflow/react';

const ProjectNode = ({ data }: { data: ProjectData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`
        min-w-[300px] bg-gradient-to-br from-purple-900/40 to-pink-900/40 
        backdrop-blur-xl rounded-xl p-4 relative
        ${isExpanded ? 'border-2 border-purple-500/50' : 'border border-white/10'}
        shadow-[0_0_15px_rgba(139,92,246,0.1)]
        ${isHovered ? 'shadow-[0_0_30px_rgba(139,92,246,0.2)]' : ''}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        boxShadow: isHovered 
          ? '0 0 30px rgba(139,92,246,0.3)' 
          : '0 0 15px rgba(139,92,246,0.1)'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        duration: 0.3,
        boxShadow: {
          duration: 0.2
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <motion.div 
        className={`
          absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
          rounded-xl opacity-0 pointer-events-none
        `}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      <div 
        className="cursor-pointer flex items-center justify-between relative z-10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.h3 
          className="text-lg font-bold text-white"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {data.label}
        </motion.h3>
        <motion.div
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          className="text-white/70"
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98]
                }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                opacity: { duration: 0.25 },
                height: { duration: 0.4 }
              }
            }}
            className="mt-4 space-y-3 overflow-hidden"
          >
            <motion.p 
              className="text-sm text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {data.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {data.technologies.map((tech: string, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="px-2 py-1 text-xs bg-purple-500/20 rounded-full 
                           text-purple-200 border border-purple-500/20
                           hover:bg-purple-500/30 hover:border-purple-500/30 
                           transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
              className="flex gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href={data.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/80 
                         hover:text-white transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} className="group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href={data.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/80 
                         hover:text-white transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                <span>Live Demo</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectNode;
