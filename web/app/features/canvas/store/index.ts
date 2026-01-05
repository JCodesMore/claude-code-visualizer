/**
 * Canvas Visualization Store
 *
 * Zustand store for managing canvas state including nodes, edges, and selection.
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CanvasState, CanvasNode, CanvasEdge } from "../types";

interface CanvasActions {
  setNodes: (nodes: CanvasNode[]) => void;
  setEdges: (edges: CanvasEdge[]) => void;
  selectNode: (nodeId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: CanvasState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isLoading: false,
  error: null,
};

export const useCanvasStore = create<CanvasState & CanvasActions>()(
  immer((set) => ({
    ...initialState,

    setNodes: (nodes) =>
      set((state) => {
        state.nodes = nodes;
      }),

    setEdges: (edges) =>
      set((state) => {
        state.edges = edges;
      }),

    selectNode: (nodeId) =>
      set((state) => {
        state.selectedNodeId = nodeId;
      }),

    setLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    reset: () => set(initialState),
  }))
);
