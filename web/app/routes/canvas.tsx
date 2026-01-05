import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ArrowLeft, Workflow } from "lucide-react";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { Canvas, Sidebar } from "~/features/canvas";

export const meta: MetaFunction = () => {
  return [
    { title: "Canvas Visualization - Claude Code Monitor" },
    {
      name: "description",
      content: "Visualize Claude Code agent orchestration in real-time",
    },
  ];
};

export default function CanvasPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center space-x-2">
                <Workflow className="w-5 h-5 text-anthropic-orange" />
                <h1 className="text-lg font-semibold text-gray-900">
                  Canvas Visualization
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Session: -</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Resizable Panels */}
      <main className="flex-1 min-h-0">
        <ResizablePanelGroup orientation="horizontal" className="h-full">
          {/* Canvas Panel */}
          <ResizablePanel defaultSize={70} minSize={50}>
            <div className="h-full bg-anthropic-dark">
              <Canvas />
            </div>
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle withHandle />

          {/* Sidebar Panel */}
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="h-full bg-white border-l border-gray-200 overflow-auto">
              <Sidebar />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
