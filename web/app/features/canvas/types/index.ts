/**
 * Canvas Visualization Types
 *
 * Type definitions for the canvas visualization feature.
 */

import type { Node, Edge } from "@xyflow/react";

/** Node status indicating execution state */
export type NodeStatus = "active" | "complete" | "error" | "pending";

/** Types of nodes in the visualization */
export type NodeType = "session" | "agent" | "subagent" | "task" | "tool_use" | "tool_result";

/** Custom data attached to canvas nodes */
export interface CanvasNodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  status: NodeStatus;
  messages?: unknown[];
  taskPrompt?: string;
}

/** Canvas node with custom data */
export type CanvasNode = Node<CanvasNodeData, NodeType>;

/** Canvas edge with optional label */
export interface CanvasEdge extends Edge {
  label?: string;
}

/** Store state for canvas visualization */
export interface CanvasState {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
}
