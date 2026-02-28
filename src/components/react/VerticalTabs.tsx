import { useState, useMemo } from "react";
import { highlightJac, highlightPython } from "../../lib/highlight";

interface CodeExample {
  filename: string;
  code: string;
}

interface TabData {
  title: string;
  summary: string;
  link: string;
  diagram?: {
    src: string;
    fallback: string;
    title: string;
    description: string;
    type: string;
  };
}

interface VerticalTabsProps {
  jacTabs: CodeExample[];
  pythonTabs: CodeExample[];
  tabs: TabData[];
}

export default function VerticalTabs({
  jacTabs,
  pythonTabs,
  tabs,
}: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeLang, setActiveLang] = useState<"jac" | "python">("jac");

  const currentJac = jacTabs[activeTab];
  const currentPython = pythonTabs[activeTab];
  const currentTab = tabs[activeTab];
  const activeCode = activeLang === "jac" ? currentJac : currentPython;
  const hasDiagram = Boolean(currentTab?.diagram);

  const highlightedCode = useMemo(() => {
    if (!activeCode?.code) return "";
    const code = activeCode.code.trim();
    return activeLang === "jac" ? highlightJac(code) : highlightPython(code);
  }, [activeCode, activeLang]);

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          See the <span className="text-primary-orange">Difference</span>
        </h2>
        <p className="text-[#999] text-center mb-12 max-w-2xl mx-auto">
          Compare Jac with Python side by side. Same functionality, radically
          different expressiveness.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-3">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                  idx === activeTab
                    ? "bg-primary-orange/15 border-primary-orange/50 text-white"
                    : "bg-medium-bg/30 border-light-bg/20 text-[#999] hover:text-white hover:border-light-bg/40"
                }`}
              >
                <h4 className="font-semibold text-sm mb-1">{tab.title}</h4>
                <p className="text-xs opacity-70 leading-relaxed">
                  {tab.summary.slice(0, 80)}...
                </p>
              </button>
            ))}

            {currentTab && (
              <a
                href={currentTab.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-orange hover:underline mt-2 px-4"
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            )}
          </div>

          <div className={hasDiagram ? "lg:col-span-5" : "lg:col-span-9"}>
            <div className="rounded-2xl bg-medium-bg/60 border border-light-bg/30 overflow-hidden h-full flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-medium-bg border-b border-light-bg/30">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/60"></span>
                  </div>
                  <span className="text-xs text-[#999] ml-2">
                    {activeCode?.filename}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveLang("jac")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeLang === "jac"
                        ? "bg-primary-orange/20 text-primary-orange"
                        : "text-[#999] hover:text-white"
                    }`}
                  >
                    Jac
                  </button>
                  <button
                    onClick={() => setActiveLang("python")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeLang === "python"
                        ? "bg-primary-orange/20 text-primary-orange"
                        : "text-[#999] hover:text-white"
                    }`}
                  >
                    Python
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm leading-relaxed overflow-auto flex-1 custom-scrollbar">
                <code
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>
          </div>

          <div className="lg:col-span-4">
            {currentTab?.diagram && (
              <div className="rounded-2xl bg-medium-bg/40 border border-light-bg/20 p-4 h-full flex flex-col items-center justify-center">
                <img
                  src={currentTab.diagram.src}
                  alt={currentTab.diagram.title}
                  className="max-w-full h-auto rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (currentTab.diagram?.fallback) {
                      target.src = currentTab.diagram.fallback;
                    }
                  }}
                />
                <p className="text-xs text-[#999] mt-3 text-center">
                  {currentTab.diagram.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </section>
  );
}
