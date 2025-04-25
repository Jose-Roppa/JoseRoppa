
import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomNode } from '../types/mindmap';
import ProjectNode from './ProjectNode';
import { initialNodes, initialEdges } from '../data/projectsData';
import ParticlesBackground from './ParticlesBackground';

const nodeTypes = {
  projectNode: ProjectNode,
};

const MindMapContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const allTechnologies = useMemo(() => [...new Set(
    nodes.flatMap((node: CustomNode) => node.data.technologies)
  )], [nodes]);

  const filterByTechnology = useCallback((technology: string | null) => {
    setSelectedTechnology(technology);
    
    if (!technology) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      return;
    }

    const filteredNodes = initialNodes.filter(node =>
      node.data.technologies.includes(technology)
    );
    
    const filteredNodeIds = new Set(filteredNodes.map(node => node.id));
    
    const filteredEdges = initialEdges.filter(edge =>
      filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
    );

    setNodes(filteredNodes);
    setEdges(filteredEdges);
  }, [setNodes, setEdges]);

  const technologyButtons = useMemo(() => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-white/80 mb-3">
        Filter by Technology
      </h3>
      <button
        className={`block w-full px-3 py-1.5 rounded-lg text-sm 
                  transition-all duration-200 ${
          !selectedTechnology 
            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
        onClick={() => filterByTechnology(null)}
      >
        All Projects
      </button>
      {allTechnologies.map((tech) => (
        <button
          key={tech}
          className={`block w-full px-3 py-1.5 rounded-lg text-sm 
                    transition-all duration-200 ${
            selectedTechnology === tech 
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => filterByTechnology(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  ), [allTechnologies, selectedTechnology, filterByTechnology]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
      minZoom={0.5}
      maxZoom={2}
      className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-black relative"
      fitView
    >
      <ParticlesBackground />
      <Background 
        color="#ffffff"
        className="bg-opacity-5"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 0
        }}
        variant={BackgroundVariant.Dots}
        gap={20}
        size={1}
      />

      <Panel 
        position="bottom-right" 
        className="flex flex-col gap-2 mr-2 mb-2"
      >
        <button
          onClick={() => zoomIn()}
          className="w-10 h-10 bg-gray-900/50 backdrop-blur-sm 
                   border border-white/10 rounded-xl text-white/80 
                   hover:text-white hover:bg-gray-800/50 hover:border-purple-500/50 
                   transition-all duration-200 flex items-center justify-center 
                   shadow-lg hover:shadow-purple-500/20"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => fitView()}
          className="w-10 h-10 bg-gray-900/50 backdrop-blur-sm 
                   border border-white/10 rounded-xl text-white/80 
                   hover:text-white hover:bg-gray-800/50 hover:border-purple-500/50 
                   transition-all duration-200 flex items-center justify-center 
                   shadow-lg hover:shadow-purple-500/20"
          title="Center View"
        >
          ⟲
        </button>
        <button
          onClick={() => zoomOut()}
          className="w-10 h-10 bg-gray-900/50 backdrop-blur-sm 
                   border border-white/10 rounded-xl text-white/80 
                   hover:text-white hover:bg-gray-800/50 hover:border-purple-500/50 
                   transition-all duration-200 flex items-center justify-center 
                   shadow-lg hover:shadow-purple-500/20"
          title="Zoom Out"
        >
          -
        </button>
      </Panel>

      <MiniMap 
        nodeColor={(node) => {
          return node.selected ? '#f5a623' : '#9b87f5';
        }}
        maskColor="rgba(0, 0, 0, 0.2)"
        className="!bottom-4 !right-16 bg-gray-900/50 backdrop-blur-sm 
                  border border-white/10 rounded-xl overflow-hidden"
        style={{
          width: 150,
          height: 100,
        }}
      />

      <Panel 
        position="top-left" 
        className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl 
                  border border-white/10 shadow-lg"
      >
        {technologyButtons}
      </Panel>
    </ReactFlow>
  );
};

const MindMap = () => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 relative">
      <ReactFlowProvider>
        <MindMapContent />
      </ReactFlowProvider>
    </div>
  );
};

export default MindMap;
