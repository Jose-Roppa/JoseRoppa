
import { Node, Edge } from '@xyflow/react';

export interface ProjectData {
  label: string;
  description: string;
  technologies: string[];
  links: {
    github: string;
    demo: string;
  };
  [key: string]: unknown;
}

export type CustomNode = Node<ProjectData>;
