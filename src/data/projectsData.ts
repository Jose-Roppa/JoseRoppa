
import { Edge, Position } from '@xyflow/react';
import { CustomNode } from '../types/mindmap';

export const initialNodes: CustomNode[] = [
  {
    id: '1',
    type: 'projectNode',
    data: { 
      label: "VPJ Alimentos - Análise de Conversas",
      description: "Desenvolvimento em Python para análise de conversas do WhatsApp usando IA, com integração da API Gemini. Implementação de sistemas de monitoramento de logs e documentação técnica.",
      technologies: ['Python', 'IA', 'API Integration', 'Documentation'],
      links: {
        github: '#',
        demo: '#'
      }
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '2',
    type: 'projectNode',
    data: { 
      label: "Educação Internacional",
      description: "Formação acadêmica iniciada no Valencia College (EUA), atualmente cursando Engenharia de Software na PUC Campinas.",
      technologies: ['Software Engineering', 'Computer Science', 'English'],
      links: {
        github: '#',
        demo: '#'
      }
    },
    position: { x: -300, y: 200 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '3',
    type: 'projectNode',
    data: { 
      label: "Desenvolvimento de Software",
      description: "Experiência com infraestrutura de software, desenvolvimento Python e integração de APIs.",
      technologies: ['Python', 'Infrastructure', 'API Integration'],
      links: {
        github: '#',
        demo: '#'
      }
    },
    position: { x: 300, y: 200 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '4',
    type: 'projectNode',
    data: { 
      label: "LLM Development",
      description: "Desenvolvimento e implementação de soluções utilizando Large Language Models para análise e processamento de dados.",
      technologies: ['LLM', 'IA', 'Python'],
      links: {
        github: '#',
        demo: '#'
      }
    },
    position: { x: 0, y: 400 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  }
];

const createTechnologyEdges = (nodes: CustomNode[]): Edge[] => {
  const edges: Edge[] = [];
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const commonTechs = nodes[i].data.technologies.filter(tech => 
        nodes[j].data.technologies.includes(tech)
      );
      
      if (commonTechs.length > 0) {
        edges.push({
          id: `e${nodes[i].id}-${nodes[j].id}`,
          source: nodes[i].id,
          target: nodes[j].id,
          animated: true,
          style: { 
            stroke: '#9b87f5',
            strokeWidth: Math.min(commonTechs.length * 1.5, 4),
            opacity: 0.6
          },
          label: commonTechs.join(', '),
          labelStyle: { fill: '#9b87f5', fontSize: 10 },
          labelBgStyle: { 
            fill: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 4
          }
        });
      }
    }
  }
  
  return edges;
};

export const initialEdges: Edge[] = createTechnologyEdges(initialNodes);
