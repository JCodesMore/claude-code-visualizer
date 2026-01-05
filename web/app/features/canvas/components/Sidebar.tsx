/**
 * Sidebar Component
 *
 * Resizable detail panel showing information about the selected node.
 * This is a placeholder component that will be implemented in Epic 4.
 */

import { useCanvasStore } from "../store";

export function Sidebar() {
  const { selectedNodeId, nodes } = useCanvasStore();

  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a node to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">
        {selectedNode.data.label}
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Type: <span className="font-medium">{selectedNode.data.type}</span>
        </p>
        <p className="text-sm text-gray-600">
          Status: <span className="font-medium">{selectedNode.data.status}</span>
        </p>
      </div>
    </div>
  );
}
