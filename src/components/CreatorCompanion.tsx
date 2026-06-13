import { useState } from "react";
import { SitemapNode } from "../types";
import { 
  SITEMAP_DATA, 
  WIREFRAMES, 
  SEO_STRATEGY, 
  BRAND_STYLE_GUIDE, 
  TECH_STACK, 
  CONVERSIONS, 
  MOBILE_DESIGN_SPECS, 
  LAUNCH_CHECKLIST 
} from "../data";
import { 
  Map, 
  Layout, 
  Search, 
  Palette, 
  Terminal, 
  TrendingUp, 
  Smartphone, 
  CheckSquare, 
  Building 
} from "lucide-react";

export default function CreatorCompanion() {
  const [activeTab, setActiveTab] = useState<
    "sitemap" | "wireframes" | "seo" | "styleguide" | "tech" | "conversions" | "mobile" | "launch"
  >("sitemap");

  // Recursive Sitemap Node Renderer
  const renderSitemapNode = (node: SitemapNode, index: number) => {
    return (
      <div key={index} className="pl-4 border-l-2 border-indigo-500/20 my-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <span className="w-2.5 h-2.5 bg-orange-400 rounded-lg shadow-sm"></span>
          <span className="text-indigo-950 font-bold font-sans text-xs sm:text-sm">{node.title}</span>
          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            {node.path}
          </span>
        </div>
        <p className="text-xs text-gray-550 text-gray-600 max-w-2xl ml-4">{node.description}</p>
        {node.children && node.children.length > 0 && (
          <div className="ml-4 pl-2 mt-1">
            {node.children.map((child, i) => renderSitemapNode(child, i))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-indigo-100 p-6 md:p-8 shadow-xl shadow-indigo-100/20">
      {/* Title */}
      <div className="mb-6 text-left">
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-indigo-600 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-black font-sans text-indigo-950 tracking-tight">
            StayGlassy Strategy & Blueprint Suite
          </h2>
        </div>
        <p className="text-gray-650 text-gray-600 text-xs sm:text-sm mt-2 max-w-3xl">
          Crafted by <span className="text-indigo-600 font-bold">iWebNext</span>, this interactive control center delivers all architectural maps, style standards, SEO indexes, wireframe elements, and deployment matrices formulated for StayGlassy.ca.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4 mb-6">
        <button
          onClick={() => setActiveTab("sitemap")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "sitemap"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Map className="w-4 h-4" />
          Sitemap
        </button>
        <button
          onClick={() => setActiveTab("wireframes")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "wireframes"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Layout className="w-4 h-4" />
          Wireframes
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "seo"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Search className="w-4 h-4" />
          SEO Strategy
        </button>
        <button
          onClick={() => setActiveTab("styleguide")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "styleguide"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Palette className="w-4 h-4" />
          Style Guide
        </button>
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "tech"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Terminal className="w-4 h-4" />
          Tech Stack
        </button>
        <button
          onClick={() => setActiveTab("conversions")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "conversions"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          UX Optimization
        </button>
        <button
          onClick={() => setActiveTab("mobile")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "mobile"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Mobile Specs
        </button>
        <button
          onClick={() => setActiveTab("launch")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === "launch"
              ? "bg-indigo-600 text-white"
              : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:bg-slate-100"
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          Launch Board
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-slate-50/50 rounded-2xl p-5 border border-indigo-50 shadow-inner">
        {/* TAB 1: SITEMAP */}
        {activeTab === "sitemap" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-indigo-950 font-sans flex items-center gap-2">
              Sitemap Architecture
            </h3>
            <p className="text-xs text-gray-550 text-gray-600 leading-normal mb-2">
              Our information architecture maps simple single-page navigation flow, combined with downloadable materials to encourage rapid high-value lead acquisition.
            </p>
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm">
              {SITEMAP_DATA.map((node, i) => renderSitemapNode(node, i))}
            </div>
          </div>
        )}

        {/* TAB 2: WIREFRAMES */}
        {activeTab === "wireframes" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-indigo-950 font-sans">
              Structural Wireframe Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIREFRAMES.map((wire, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-indigo-100 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded font-bold">
                      Structure {index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-indigo-950 mt-2 font-sans">{wire.sectionName}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{wire.description}</p>
                    <ul className="mt-3.5 space-y-1.5">
                      {wire.priorityElements.map((elem, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-orange-500 font-black">•</span>
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SEO STRATEGY */}
        {activeTab === "seo" && (
          <div className="space-y-5 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Keywords Card */}
              <div className="lg:col-span-2 space-y-3 bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm animate-in fade-in">
                <h4 className="text-sm font-bold text-indigo-950 font-sans">Targeted SEO Keywords</h4>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left text-gray-700 border-collapse">
                    <thead>
                      <tr className="border-b border-indigo-50 text-indigo-900 text-[10px] uppercase font-mono">
                        <th className="pb-2">Keyword Phrase</th>
                        <th className="pb-2">Search Vol</th>
                        <th className="pb-2">Competition</th>
                        <th className="pb-2">Role/Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SEO_STRATEGY.targetedKeywords.map((kw, i) => (
                        <tr key={i} className="border-b border-indigo-50/50 py-2">
                          <td className="py-2.5 font-sans font-bold text-indigo-950">{kw.keyword}</td>
                          <td className="py-2.5 text-orange-600 font-bold">{kw.volume}</td>
                          <td className="py-2.5 text-gray-500">{kw.competition}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {kw.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tags & Meta Column */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2 text-left">
                  <h4 className="text-sm font-bold text-indigo-950 font-sans">Google Meta Config</h4>
                  <p className="text-xs text-gray-600 leading-normal">
                    <strong className="text-indigo-950">Title:</strong> {SEO_STRATEGY.metaTags.title}
                  </p>
                  <p className="text-xs text-gray-650 text-gray-600 leading-normal">
                    <strong className="text-indigo-950">Description:</strong> {SEO_STRATEGY.metaTags.description}
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm text-left">
                  <h4 className="text-sm font-bold text-indigo-950 font-sans mb-1.5">JSON-LD Structured Schema</h4>
                  <pre className="text-[10px] text-indigo-900 p-2.5 rounded bg-indigo-50/40 border border-indigo-100 overflow-x-auto font-mono">
                    {SEO_STRATEGY.structuredDataJSON}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}        {/* TAB 4: STYLE GUIDE */}
        {activeTab === "styleguide" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-indigo-950 font-sans">Brand Style Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Palette */}
              <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-indigo-950 font-sans">Educational Vibrant Palette</h4>
                <div className="space-y-2.5">
                  {BRAND_STYLE_GUIDE.colors.map((col, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 animate-in fade-in">
                        <div 
                          className="w-8 h-8 rounded-lg shadow-inner border border-slate-200" 
                          style={{ backgroundColor: col.hex }}
                        />
                        <div>
                          <p className="text-xs font-bold text-indigo-950">{col.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{col.hex}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 italic max-w-[150px] text-right">
                        {col.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography specs */}
              <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-indigo-950 font-sans mb-3.5">Typography Pairing</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded font-bold uppercase mr-2">Display</span>
                      <p className="text-xs text-gray-700 font-serif mt-1">
                        {BRAND_STYLE_GUIDE.typography.display}
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded font-bold uppercase mr-2">Body Text</span>
                      <p className="text-xs text-gray-700 mt-1">
                        {BRAND_STYLE_GUIDE.typography.body}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <span className="text-[10px] font-mono text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded font-bold uppercase mr-2">Monospace</span>
                      <p className="text-xs text-gray-700 font-mono mt-1">
                        {BRAND_STYLE_GUIDE.typography.monospace}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-left">
                  <h4 className="text-xs font-bold text-indigo-950 font-sans mb-1.5">UX Padding Rules</h4>
                  <p className="text-xs text-gray-650">
                    Hero Section Gap: {BRAND_STYLE_GUIDE.spacingSpecs.heroSection}
                  </p>
                  <p className="text-xs text-gray-650">
                    Card Gap Sizes: {BRAND_STYLE_GUIDE.spacingSpecs.cardGaps}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TECH STACK */}
        {activeTab === "tech" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-indigo-950 font-sans">
              Recommended Premium Tech Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm text-left">
                <span className="text-xs font-mono text-orange-600 font-bold bg-orange-50 px-2 rounded-md uppercase">React Front-End</span>
                <ul className="mt-3 text-xs text-gray-650 space-y-2.5 text-left">
                  <li><strong className="text-indigo-950">Core Library:</strong> {TECH_STACK.frontEnd.library}</li>
                  <li><strong className="text-indigo-950">CSS Rules:</strong> {TECH_STACK.frontEnd.styling}</li>
                  <li><strong className="text-indigo-950">Animation:</strong> {TECH_STACK.frontEnd.animations}</li>
                  <li><strong className="text-indigo-950">3D Engine:</strong> {TECH_STACK.frontEnd.rendering3D}</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm text-left">
                <span className="text-xs font-mono text-orange-600 font-bold bg-orange-50 px-2 rounded-md uppercase">Node Back-End</span>
                <ul className="mt-3 text-xs text-gray-650 space-y-2.5 text-left">
                  <li><strong className="text-indigo-950">Framework:</strong> {TECH_STACK.backEnd.server}</li>
                  <li><strong className="text-indigo-950">Build Utility:</strong> {TECH_STACK.backEnd.compiler}</li>
                  <li><strong className="text-indigo-950">AI Engine:</strong> {TECH_STACK.backEnd.integration}</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm text-left">
                <span className="text-xs font-mono text-orange-600 font-bold bg-orange-50 px-2 rounded-md uppercase">Target Hosting</span>
                <ul className="mt-3 text-xs text-gray-650 space-y-2.5 text-left">
                  <li><strong className="text-indigo-950">Platform:</strong> {TECH_STACK.hosting.environment}</li>
                  <li><strong className="text-indigo-950">Proxy Rules:</strong> {TECH_STACK.hosting.ingressRules}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CONVERSIONS */}
        {activeTab === "conversions" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-black text-indigo-950 font-sans">
              Strategic Conversion Optimizations
            </h3>
            <div className="space-y-3">
              {CONVERSIONS.map((con, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-indigo-100/70 flex items-start gap-3 shadow-xs text-left">
                  <span className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-mono text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-indigo-950">{con.topic}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{con.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MOBILE DESIGN */}
        {activeTab === "mobile" && (
          <div className="space-y-4 text-left animate-in fade-in">
            <h3 className="text-lg font-black text-indigo-950 font-sans">Mobile Design Specifications</h3>
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-3 text-xs sm:text-sm text-gray-600 text-left">
              <p>
                <strong className="text-indigo-950">Adaptive Layout:</strong> {MOBILE_DESIGN_SPECS.adaptiveLayout}
              </p>
              <p>
                <strong className="text-indigo-950">Touch Feedback:</strong> {MOBILE_DESIGN_SPECS.touchFeedback}
              </p>
              <p>
                <strong className="text-indigo-950">Viewport Constraints:</strong> {MOBILE_DESIGN_SPECS.viewportRestrictions}
              </p>
              <p>
                <strong className="text-indigo-950">Thumbtip Navigation:</strong> {MOBILE_DESIGN_SPECS.navigationHandling}
              </p>
            </div>
          </div>
        )}

        {/* TAB 8: LAUNCH BOARD */}
        {activeTab === "launch" && (
          <div className="space-y-4 text-left animate-in fade-in">
            <h3 className="text-lg font-black text-indigo-950 font-sans">Rigorous Launch Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LAUNCH_CHECKLIST.map((chk, index) => (
                <div key={index} className="bg-white p-3.5 rounded-xl border border-indigo-100 flex items-center gap-3 shadow-xs">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border font-serif text-xs ${
                    chk.completed 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  }`}>
                    {chk.completed ? "✓" : "○"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-indigo-950">{chk.item}</p>
                    <span className="text-[9px] font-mono uppercase text-gray-400">
                      {chk.completed ? "Verified" : "Pending Production Access"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
