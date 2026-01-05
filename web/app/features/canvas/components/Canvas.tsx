/**
 * Canvas Component
 *
 * React Flow wrapper for the agent visualization canvas.
 * This is a placeholder component that will be implemented in Epic 1, Story 1.2.
 */

import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCanvasStore } from "../store";

export function Canvas() {
  const { nodes, edges, selectNode } = useCanvasStore();

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
