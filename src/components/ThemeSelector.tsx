import React, { useState } from "react";
import { PRESET_THEMES, PresetTheme } from "../data";
import { Sparkles, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface ThemeSelectorProps {
  activeThemeId: string;
  onSelectTheme: (theme: PresetTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  activeThemeId,
  onSelectTheme,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="space-y-4 bg-[#0a0a0f]/30 p-4 rounded-xl border border-white/5">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between focus:outline-none cursor-pointer text-left"
        type="button"
      >
        <div className="flex items-center gap-1.5">
          <Sparkles id="sparkle-icon" className="w-4 h-4 text-[#5b6cff]" />
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            精选学术与金融预设
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <span className="text-[10px] bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded font-medium">展开 (Expand)</span>
          ) : (
            <span className="text-[10px] bg-[#5b6cff]/10 text-[#5b6cff] border border-[#5b6cff]/20 px-2 py-0.5 rounded font-mono">
              PRESETS ACTIVE
            </span>
          )}
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </div>
      </button>
      
      {!isCollapsed && (
        <>
          <p className="text-xs text-slate-400 leading-relaxed">
            金融主题排版极其考究。以下是针对微信公众号、研报输出、移动端深度阅读优化的专业级样式。点击切换即可即时应用。
          </p>

          <div className="grid grid-cols-1 gap-3">
            {PRESET_THEMES.map((theme) => {
              const isActive = theme.id === activeThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme)}
                  className={`group flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-[#0d0f17] border-[#5b6cff]/40 shadow-lg shadow-[#5b6cff]/5 ring-1 ring-[#5b6cff]/20"
                      : "bg-[#0f111a] border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Highlight gradient background */}
                  {isActive && (
                    <div id={`active-grad-${theme.id}`} className="absolute top-0 right-0 w-32 h-32 bg-[#5b6cff]/5 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none transition-opacity" />
                  )}
                  
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className={`text-sm font-bold transition-colors ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-slate-100"
                    }`}>
                      {theme.name}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-[#5b6cff]/10 text-[#5b6cff] px-2 py-0.5 rounded border border-[#5b6cff]/20 font-semibold uppercase">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3 group-hover:text-slate-300 transition-colors">
                    {theme.description}
                  </p>

                  {/* Color Swatch Previews */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5 w-full text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <span className="text-slate-400">主色</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm"
                        style={{ backgroundColor: theme.bgColor }}
                      />
                      <span className="text-slate-400">背景纸色</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[10px] max-w-[100px] truncate">
                        {theme.fontFamily}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
