import React, { useState } from "react";
import { 
  Sliders, 
  Palette, 
  Undo2, 
  Plus, 
  BookOpen,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface VisualAdjusterProps {
  fontSize: number;
  setFontSize: (v: number) => void;
  lineHeight: number;
  setLineHeight: (v: number) => void;
  paragraphSpacing: number;
  setParagraphSpacing: (v: number) => void;
  primaryColor: string;
  setPrimaryColor: (v: string) => void;
  secondaryColor: string;
  setSecondaryColor: (v: string) => void;
  bgColor: string;
  setBgColor: (v: string) => void;
  onInjectSnippet: (name: string, snippet: string) => void;
  onResetToOriginal: () => void;
  activeArticleTitle: string;
  activeThemeId: string;
}

export const VisualAdjuster: React.FC<VisualAdjusterProps> = ({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  paragraphSpacing,
  setParagraphSpacing,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  bgColor,
  setBgColor,
  onInjectSnippet,
  onResetToOriginal,
  activeArticleTitle,
  activeThemeId,
}) => {
  const [isColorPaletteCollapsed, setIsColorPaletteCollapsed] = useState(false);
  const macros = [
    {
      id: "drop-cap",
      name: "华丽大字首起 (Drop Cap)",
      description: "首段第一个字放大两倍，并带有金色左实线环绕，呈现专业学术、华尔街日报(Wall Street Journal)的社论开篇质感。",
      css: `
/* === [MACRO] 首字大字首起 / Drop Cap === */
#wenyan > p:first-of-type::first-letter {
    font-size: 3.2em;
    font-weight: 800;
    float: left;
    line-height: 0.85;
    margin-right: 10px;
    margin-top: 4px;
    color: var(--primary-accent, #bfa15f);
    font-family: Georgia, "Playfair Display", serif;
}`
    },
    {
      id: "table-neon",
      name: "彭博终端绿表 (Bloomberg Terminal Row)",
      description: "给表格的数字列（最后一列）或者正文表格行增加高亮冷光指示器与阳线绿色渐变。",
      css: `
/* === [MACRO] 彭博数据高亮表格 === */
#wenyan table td:last-child {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-weight: 700;
    color: #10b981; /* 阳线绿 */
    background: rgba(16, 185, 129, 0.04);
    border-radius: 4px;
}`
    },
    {
      id: "image-retro",
      name: "金属质感图框 (Metal Image Frame)",
      description: "为所有的研报图表、图片增加 1.5px 的复合香槟金色描边极窄卡线与细腻微幅冷灰阴影。",
      css: `
/* === [MACRO] 金属极窄图框 === */
#wenyan img {
    border: 1.5px solid var(--primary-accent, #bfa15f);
    padding: 6px;
    background: #ffffff;
    box-shadow: 0 12px 40px rgba(0,0,0,0.06);
    transition: transform 0.3s ease;
}
#wenyan img:hover {
    transform: scale(1.015);
}`
    },
    {
      id: "blockquote-bracket",
      name: "书名号式引语 (Editorial Blockquote)",
      description: "修改引用块，为其增加金色双引号点缀与左右极轴边界括号线，突出学者深邃思辨。",
      css: `
/* === [MACRO] 高级书阁式引用 === */
#wenyan blockquote {
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--primary-accent, #bfa15f);
    border-bottom: 1px solid var(--primary-accent, #bfa15f);
    background: rgba(197, 168, 128, 0.02);
    padding: 1.5em 2em;
    position: relative;
}
#wenyan blockquote::before {
    content: "“";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-paper, #fbfaf7);
    padding: 0 15px;
    color: var(--primary-accent, #bfa15f);
    font-size: 38px;
}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Parameter Control Block */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase flex items-center gap-1.5">
          <Sliders id="sliders-icon" className="w-4 h-4 text-[#5b6cff]" />
          排版变量微调 (Live Variables)
        </h3>
        
        <p className="text-xs text-slate-400">
          通过下方滑块微调 CSS 核心排版引擎参数。这些参数变量将实时注入到渲染层中：
        </p>

        {/* Font size */}
        <div className="space-y-2 bg-[#0a0a0f] p-3 rounded-lg border border-white/10">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">基准字号 (Font Size)</span>
            <span className="text-[#5b6cff] font-mono font-semibold">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#5b6cff]"
          />
        </div>

        {/* Line height */}
        <div className="space-y-2 bg-[#0a0a0f] p-3 rounded-lg border border-white/10">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">行高比例 (Line Height)</span>
            <span className="text-[#5b6cff] font-mono font-semibold">{lineHeight}</span>
          </div>
          <input
            type="range"
            min="1.4"
            max="2.5"
            step="0.05"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#5b6cff]"
          />
        </div>

        {/* Paragraph spacing */}
        <div className="space-y-2 bg-[#0a0a0f] p-3 rounded-lg border border-white/10">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">段间距 (Paragraph Spacing)</span>
            <span className="text-[#5b6cff] font-mono font-semibold">{paragraphSpacing}em</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.05"
            value={paragraphSpacing}
            onChange={(e) => setParagraphSpacing(Number(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#5b6cff]"
          />
        </div>

        {/* Color Palette Micro Adjuster */}
        <div className="space-y-3 bg-[#0a0a0f] p-3.5 rounded-lg border border-white/10">
          <button 
            type="button"
            onClick={() => setIsColorPaletteCollapsed(!isColorPaletteCollapsed)}
            className="w-full flex items-center justify-between text-xs text-slate-350 font-medium cursor-pointer focus:outline-none"
          >
            <span className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#5b6cff]" /> 
              快速色彩覆盖 (Color Override)
            </span>
            <div className="flex items-center gap-1.5">
              {isColorPaletteCollapsed ? (
                <>
                  <span className="text-[10px] text-slate-500">已折叠</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </>
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
            </div>
          </button>

          {!isColorPaletteCollapsed && (
            <div className="grid grid-cols-3 gap-2.5 pt-1 animate-none">
              {/* Primary Accent */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 tracking-wider uppercase block">主色 / Accent</label>
                <div className="flex items-center gap-1 bg-[#0d0f17] p-1 rounded-md border border-white/10">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-5 h-5 border-0 p-0 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-[9px] font-mono text-slate-300">{primaryColor.toUpperCase()}</span>
                </div>
              </div>

              {/* BG color */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 tracking-wider uppercase block">背景 / Canvas</label>
                <div className="flex items-center gap-1 bg-[#0d0f17] p-1 rounded-md border border-white/10">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-5 h-5 border-0 p-0 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-[9px] font-mono text-slate-300">{bgColor.toUpperCase()}</span>
                </div>
              </div>

              {/* Secondary / Text Color */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-slate-400 tracking-wider uppercase block">文字 / Text</label>
                <div className="flex items-center gap-1 bg-[#0d0f17] p-1 rounded-md border border-white/10">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-5 h-5 border-0 p-0 rounded cursor-pointer bg-transparent"
                  />
                  <span className="text-[9px] font-mono text-slate-300">{secondaryColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic CSS Snippets */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase flex items-center gap-1.5">
          <BookOpen id="book-icon" className="w-4 h-4 text-[#5b6cff]" />
          金融高端排版宏指令 (CSS Macros)
        </h3>
        <p className="text-xs text-slate-400">
          点击下方宏按钮，系统将自动在当前的 CSS 编辑器尾部追加特质动画或排版片段：
        </p>

        <div className="space-y-2.5">
          {macros.map((m) => (
            <div 
              key={m.id}
              className="flex items-start justify-between p-3 rounded-lg border border-white/5 bg-[#0a0a0f] hover:border-white/10 transition-colors"
            >
              <div className="space-y-1 pr-4">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5b6cff]"></span>
                  {m.name}
                </span>
                <p className="text-[10.5px] text-slate-450 leading-relaxed">
                  {m.description}
                </p>
              </div>
              <button
                onClick={() => onInjectSnippet(m.name, m.css)}
                className="p-1 px-2.5 bg-[#0d0f17] hover:bg-white/[0.02] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white rounded text-[10px] font-medium font-mono shrink-0 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[#5b6cff]" /> 注入 (Inject)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reset block */}
      <div className="pt-2">
        <button
          onClick={onResetToOriginal}
          className="w-full py-2.5 border border-dashed border-red-500/20 text-red-400/90 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
          重置 CSS 为该主题初始状态
        </button>
      </div>
    </div>
  );
};
