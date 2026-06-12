import { useState, useEffect, useRef } from "react";
import { 
  MOCK_ARTICLES, 
  PRESET_THEMES, 
  ORIGINAL_CSS, 
  PresetTheme, 
  MockArticle 
} from "./data";
import { ThemeSelector } from "./components/ThemeSelector";
import { VisualAdjuster } from "./components/VisualAdjuster";
import { 
  Sliders, 
  Palette, 
  CodeXml, 
  FileText, 
  Smartphone, 
  Monitor, 
  Layout, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  ExternalLink,
  Laptop,
  Flame,
  AlertCircle,
  Sparkles,
  Info,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { marked } from "marked";

function convertHtmlToMarkdown(html: string): string {
  let md = html;
  
  // Strip outer spacing
  md = md.trim();

  // Replace h1 with special span inside
  md = md.replace(/<h1>([\s\S]*?)<\/h1>/gi, (_, inner) => {
    // extract text inside any span
    const clean = inner.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1');
    return `# ${clean}\n\n`;
  });

  // Headers
  md = md.replace(/<h2>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3>([\s\S]*?)<\/h3>/gi, '### $1\n\n');

  // Blockquotes
  md = md.replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
    const lines = inner.trim().split('\n').map((l: string) => `> ${l.trim()}`).join('\n');
    return `${lines}\n\n`;
  });

  // Bold
  md = md.replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**');

  // Footnote inline links or span citations if exist
  md = md.replace(/<span class="footnote-num">([^<]+)<\/span>/gi, ' $1 ');

  // Code blocks (pre code) - do this before inline codes
  md = md.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (_, inner) => {
    const unescaped = inner
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    return `\`\`\`\n${unescaped.trim()}\n\`\`\`\n\n`;
  });

  // Inline Code - avoid picking up formatted blocks
  md = md.replace(/<code>([^<]+)<\/code>/gi, '`$1`');

  // Emphasis / Italics
  md = md.replace(/<em>([^<]+)<\/em>/gi, '*$1*');

  // Links
  md = md.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Unordered list items if any
  md = md.replace(/<li>([\s\S]*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<ul>([\s\S]*?)<\/ul>/gi, '$1\n');

  // Tables
  md = md.replace(/<table>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
    const theadMatch = tableContent.match(/<thead>([\s\S]*?)<\/thead>/i);
    const tbodyMatch = tableContent.match(/<tbody>([\s\S]*?)<\/tbody>/i);
    
    let headers: string[] = [];
    if (theadMatch) {
      const thMatches = theadMatch[1].match(/<th>([\s\S]*?)<\/th>/gi) || [];
      headers = thMatches.map((th: string) => th.replace(/<\/?th>/gi, '').trim());
    }
    
    let bodyRows: string[][] = [];
    if (tbodyMatch) {
      const trMatches = tbodyMatch[1].match(/<tr>([\s\S]*?)<\/tr>/gi) || [];
      bodyRows = trMatches.map((tr: string) => {
        const tdMatches = tr.match(/<td>([\s\S]*?)<\/td>/gi) || [];
        return tdMatches.map((td: string) => td.replace(/<\/?td>/gi, '').trim());
      });
    }
    
    if (headers.length === 0 && bodyRows.length > 0) {
      headers = bodyRows[0];
      bodyRows = bodyRows.slice(1);
    }
    
    if (headers.length === 0) return '';
    
    let tableMd = `| ${headers.join(' | ')} |\n`;
    tableMd += `| ${headers.map(() => '---').join(' | ')} |\n`;
    bodyRows.forEach((row: string[]) => {
      tableMd += `| ${row.join(' | ')} |\n`;
    });
    
    return `${tableMd}\n\n`;
  });

  // Footnotes block
  md = md.replace(/<div id="footnotes">([\s\S]*?)<\/div>/gi, (_, footnotesContent) => {
    let fnStr = '\n---\n';
    const pMatches = footnotesContent.match(/<p>([\s\S]*?)<\/p>/gi) || [];
    pMatches.forEach((p: string) => {
      const numMatch = p.match(/<span class="footnote-num">([\s\S]*?)<\/span>/i);
      const txtMatch = p.match(/<span class="footnote-txt">([\s\S]*?)<\/span>/i);
      if (numMatch && txtMatch) {
        fnStr += `[^${numMatch[1].replace(/[\[\]]/g, '').trim()}]: ${txtMatch[1].trim()}\n`;
      } else {
        const cleanP = p.replace(/<\/?p>/gi, '').trim();
        fnStr += `${cleanP}\n`;
      }
    });
    return fnStr + '\n';
  });

  // Standard paragraphs
  md = md.replace(/<p>([\s\S]*?)<\/p>/gi, (_, content) => {
    if (content.includes('<span class="footnote-num"')) return '';
    return `${content.trim()}\n\n`;
  });

  // Clean trailing spaces and excessive newlines
  md = md.replace(/\n{3,}/g, '\n\n');
  
  return md.trim();
}

function inlineStylesUsingComputed(htmlContent: string, cssBlock: string): string {
  // Create a hidden container and a temporary style tag
  const tempStyle = document.createElement("style");
  tempStyle.textContent = cssBlock;
  document.head.appendChild(tempStyle);
  
  const container = document.createElement("section");
  container.id = "wenyan";
  container.setAttribute("data-role", "outer");
  container.innerHTML = htmlContent;
  
  // Render offscreen to compute exact layouts & styles correctly
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.visibility = "hidden";
  document.body.appendChild(container);

  const PROPERTIES_TO_COPY = [
    "color",
    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",
    "border-top-style",
    "border-top-width",
    "border-top-color",
    "border-right-style",
    "border-right-width",
    "border-right-color",
    "border-bottom-style",
    "border-bottom-width",
    "border-bottom-color",
    "border-left-style",
    "border-left-width",
    "border-left-color",
    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "box-shadow",
    "text-shadow",
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "line-height",
    "letter-spacing",
    "margin-top",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "padding-top",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "display",
    "text-align",
    "border-collapse",
    "border-spacing",
    "opacity",
    "box-sizing",
    "vertical-align",
    "-webkit-background-clip",
    "background-clip",
    "-webkit-text-fill-color"
  ];

  try {
    // 1. Convert pseudo elements ::before and ::after to actual inline tags first
    const descendants = Array.from(container.getElementsByTagName("*"));
    descendants.forEach((el) => {
      // ::before
      const beforeStyle = window.getComputedStyle(el, "::before");
      let beforeContent = beforeStyle.getPropertyValue("content");
      if (beforeContent && beforeContent !== "none" && beforeContent !== "normal" && beforeContent !== '""' && beforeContent !== "''") {
        beforeContent = beforeContent.replace(/^['"]|['"]$/g, "");
        const span = document.createElement("span");
        span.className = "pseudo-before-inlined";
        span.textContent = beforeContent;
        
        PROPERTIES_TO_COPY.forEach((prop) => {
          const val = beforeStyle.getPropertyValue(prop);
          if (val) {
            span.style.setProperty(prop, val);
          }
        });
        el.prepend(span);
      }
      
      // ::after
      const afterStyle = window.getComputedStyle(el, "::after");
      let afterContent = afterStyle.getPropertyValue("content");
      if (afterContent && afterContent !== "none" && afterContent !== "normal" && afterContent !== '""' && afterContent !== "''") {
        afterContent = afterContent.replace(/^['"]|['"]$/g, "");
        const span = document.createElement("span");
        span.className = "pseudo-after-inlined";
        span.textContent = afterContent;
        
        PROPERTIES_TO_COPY.forEach((prop) => {
          const val = afterStyle.getPropertyValue(prop);
          if (val) {
            span.style.setProperty(prop, val);
          }
        });
        el.appendChild(span);
      }
    });

    // 2. Compute style metrics for all elements including newly created ones
    const allElements = [container, ...Array.from(container.getElementsByTagName("*"))];
    const stylesCache = allElements.map((el) => {
      const computed = window.getComputedStyle(el);
      const styles: Record<string, string> = {};
      PROPERTIES_TO_COPY.forEach((prop) => {
        styles[prop] = computed.getPropertyValue(prop);
      });
      return { el, styles };
    });

    // 3. Inject computed style attributes inline back into the physical elements
    stylesCache.forEach(({ el, styles }) => {
      const htmlEl = el as HTMLElement;
      Object.entries(styles).forEach(([prop, val]) => {
        if (val) {
          htmlEl.style.setProperty(prop, val);
        }
      });
    });

  } catch (err) {
    console.error("Computed style inline translation failed:", err);
  } finally {
    // 4. Safely detach and remove temporary DOM hooks
    if (tempStyle.parentNode) {
      tempStyle.parentNode.removeChild(tempStyle);
    }
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  // Ensure high-compatibility padding and border style properties on the outer section itself
  // WeChat strips background from container if it has zero values, but works flawlessly when padded explicitly.
  const style = container.style;
  style.removeProperty("position");
  style.removeProperty("left");
  style.removeProperty("top");
  style.removeProperty("visibility");
  style.display = "block";
  style.padding = "28px 22px";
  style.borderRadius = "12px";
  style.margin = "12px 0";
  style.boxSizing = "border-box";
  style.width = "100%";

  // Return full enclosing self-contained node block
  return container.outerHTML;
}

function isLightColor(color: string): boolean {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return true;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

export default function App() {
  // Preset Theme State
  const [activeTheme, setActiveTheme] = useState<PresetTheme>(PRESET_THEMES[0]);
  
  // Custom Live CSS State (User can type inside this)
  const [cssCode, setCssCode] = useState<string>(PRESET_THEMES[0].css);
  
  // Rich Text Copier Background settings
  const [copyBgMode, setCopyBgMode] = useState<"theme" | "white" | "custom">("theme");
  const [copyBgCustomColor, setCopyBgCustomColor] = useState<string>("#1e293b");
  
  // Format Type: "markdown" or "html"
  const [inputFormat, setInputFormat] = useState<"markdown" | "html">("markdown");
  
  // Custom Editable Article State
  const [activeArticleId, setActiveArticleId] = useState<string>(MOCK_ARTICLES[0].id);
  const [editedArticleHtml, setEditedArticleHtml] = useState<string>(MOCK_ARTICLES[0].htmlContent);
  const [editedArticleMarkdown, setEditedArticleMarkdown] = useState<string>(() => convertHtmlToMarkdown(MOCK_ARTICLES[0].htmlContent));
  const activeArticle = MOCK_ARTICLES.find(a => a.id === activeArticleId) || MOCK_ARTICLES[0];

  // Visual Overrides state (Bound to Sliders)
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineHeight, setLineHeight] = useState<number>(1.95);
  const [paragraphSpacing, setParagraphSpacing] = useState<number>(1.05);
  const [primaryColor, setPrimaryColor] = useState<string>("#bfa15f");
  const [secondaryColor, setSecondaryColor] = useState<string>("#1a1d24");
  const [bgColor, setBgColor] = useState<string>("#fbfaf7");

  // App Tabs
  const [activeTab, setActiveTab] = useState<"visual" | "css" | "article" | "help">("visual");

  // Left Panel fold state - default to collapsed on screens < lg (1024px)
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Bottom export action footer fold state - collapsed by default for maximum screen workspace
  const [isExportFooterCollapsed, setIsExportFooterCollapsed] = useState<boolean>(true);
  
  // Preview Controls
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "mobile" | "fluid">("desktop");
  const [previewThemeMode, setPreviewThemeMode] = useState<"light" | "dark" | "default">("default");
  
  // Feedback Toasts
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedHTML, setCopiedHTML] = useState<boolean>(false);
  const [copiedRichText, setCopiedRichText] = useState<boolean>(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Sync variables when preset theme changes
  const handleSelectTheme = (theme: PresetTheme) => {
    setActiveTheme(theme);
    setCssCode(theme.css);
    setPrimaryColor(theme.primaryColor);
    setBgColor(theme.bgColor);
    
    // Customize sliders per preset
    if (theme.id === "neural-pulse") {
      setFontSize(16);
      setLineHeight(1.9);
      setParagraphSpacing(1.1);
      setSecondaryColor("#cbd5e1");
    } else if (theme.id === "tactical-command") {
      setFontSize(15);
      setLineHeight(1.85);
      setParagraphSpacing(1.1);
      setSecondaryColor("#a3b8cc");
    } else if (theme.id === "cyber-mind") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.2);
      setSecondaryColor("#cbd5e1");
    } else if (theme.id === "quantum-quant") {
      setFontSize(15);
      setLineHeight(1.8);
      setParagraphSpacing(1.0);
      setSecondaryColor("#cbd5e1");
    } else if (theme.id === "elegant-dark") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.05);
      setSecondaryColor("#ccd5e0");
    } else if (theme.id === "golden-capital") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.05);
      setSecondaryColor("#1a1d24");
    } else if (theme.id === "crystal-cyan") {
      setFontSize(15);
      setLineHeight(1.9);
      setParagraphSpacing(1.1);
      setSecondaryColor("#cbd5e1");
    } else {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(0.9);
      setSecondaryColor("#111111");
    }

    triggerNotice(`已载入预设：${theme.name}`);
  };

  // Sync edited article when user switches active draft
  const handleSelectArticle = (id: string) => {
    setActiveArticleId(id);
    const target = MOCK_ARTICLES.find(a => a.id === id);
    if (target) {
      setEditedArticleHtml(target.htmlContent);
      setEditedArticleMarkdown(convertHtmlToMarkdown(target.htmlContent));
    }
  };

  // Helper compiler that wraps marked.parse cleanly
  const compileMarkdownToHtml = (markdown: string): string => {
    try {
      const rawHtml = marked.parse(markdown);
      if (typeof rawHtml === "string") {
        return rawHtml;
      }
      if (typeof (marked as any).parseSync === "function") {
        return (marked as any).parseSync(markdown);
      }
      return String(rawHtml);
    } catch (err) {
      console.error("Markdown parsing error:", err);
      return `<p>${markdown}</p>`;
    }
  };

  const handleMarkdownChange = (markdown: string) => {
    setEditedArticleMarkdown(markdown);
    const compiled = compileMarkdownToHtml(markdown);
    setEditedArticleHtml(compiled);
  };

  const toggleInputFormat = (format: "html" | "markdown") => {
    setInputFormat(format);
    if (format === "markdown") {
      setEditedArticleMarkdown(convertHtmlToMarkdown(editedArticleHtml));
    }
  };

  // Inject a custom CSS macro snippet directly at the bottom of current user edits
  const handleInjectSnippet = (name: string, snippet: string) => {
    // Avoid double injection
    if (cssCode.includes(snippet.trim())) {
      triggerNotice(`[${name}] 宏样式已注入，请勿重复添加。`);
      return;
    }
    setCssCode(prev => prev + "\n" + snippet);
    triggerNotice(`成功注入: ${name} 宏模块！已在CSS底部追加。`);
    // Removed automatic switching to CSS panel per user request
  };

  const [notice, setNotice] = useState<string | null>(null);
  const triggerNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Reset current CSS back to the default code of active preset theme
  const handleResetToOriginal = () => {
    setCssCode(activeTheme.css);
    setPrimaryColor(activeTheme.primaryColor);
    setBgColor(activeTheme.bgColor);
    
    if (activeTheme.id === "neural-pulse") {
      setFontSize(16);
      setLineHeight(1.9);
      setParagraphSpacing(1.1);
      setSecondaryColor("#cbd5e1");
    } else if (activeTheme.id === "tactical-command") {
      setFontSize(15);
      setLineHeight(1.85);
      setParagraphSpacing(1.1);
      setSecondaryColor("#a3b8cc");
    } else if (activeTheme.id === "cyber-mind") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.2);
      setSecondaryColor("#cbd5e1");
    } else if (activeTheme.id === "quantum-quant") {
      setFontSize(15);
      setLineHeight(1.8);
      setParagraphSpacing(1.0);
      setSecondaryColor("#cbd5e1");
    } else if (activeTheme.id === "elegant-dark") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.05);
      setSecondaryColor("#ccd5e0");
    } else if (activeTheme.id === "golden-capital") {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(1.05);
      setSecondaryColor("#1a1d24");
    } else if (activeTheme.id === "crystal-cyan") {
      setFontSize(15);
      setLineHeight(1.9);
      setParagraphSpacing(1.1);
      setSecondaryColor("#cbd5e1");
    } else {
      setFontSize(16);
      setLineHeight(1.95);
      setParagraphSpacing(0.9);
      setSecondaryColor("#111111");
    }
    
    triggerNotice("已重置 CSS 与色彩变量为主题出厂值。");
  };

  // Format the consolidated output CSS
  const getCompiledCSS = (): string => {
    // Inject visual overridden variables at the top of `#wenyan` declaration block
    const variableHeader = `/* 
 * =========================================================================
 * Prism Signal | Financial Style Custom Compilation
 * Generated on: ${new Date().toLocaleDateString()}
 * Live Sandbox Adjustment Variables:
 * =========================================================================
 */
#wenyan {
    --primary-accent: ${primaryColor} !important;
    --bg-paper: ${bgColor} !important;
    --text-body: ${secondaryColor} !important;
    font-size: ${fontSize}px !important;
    line-height: ${lineHeight} !important;
}

#wenyan p + p {
    margin-top: ${paragraphSpacing}em !important;
}

#wenyan table {
    display: block !important;
    overflow-x: auto !important;
    max-width: 100% !important;
    width: 100% !important;
    -webkit-overflow-scrolling: touch;
}

`;
    return variableHeader + cssCode;
  };

  // Copy CSS to clipboard
  const handleCopyCSS = () => {
    navigator.clipboard.writeText(getCompiledCSS());
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // Copy raw edited HTML content
  const handleCopyHTML = () => {
    navigator.clipboard.writeText(editedArticleHtml);
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2000);
  };

  // Helper to compile the rich HTML structure with replaced scopes so it works when pasted
  const makeRichTextHtml = (): string => {
    let bgOverride: string | undefined;
    let textOverride: string | undefined;

    if (copyBgMode === "white") {
      bgOverride = "#ffffff";
      textOverride = "#1a1d24";
    } else if (copyBgMode === "custom") {
      bgOverride = copyBgCustomColor;
      textOverride = isLightColor(copyBgCustomColor) ? "#1a1d24" : "#f8fafc";
    }

    const css = getInjectedStyleBlock(bgOverride, textOverride);
    return inlineStylesUsingComputed(editedArticleHtml, css);
  };

  // Copy fully styled rich text (pasted directly into WeChat, Word, Notion, etc.)
  const handleCopyRichText = async () => {
    try {
      const richHtml = makeRichTextHtml();
      
      // Plain text backup
      const parser = new DOMParser();
      const doc = parser.parseFromString(editedArticleHtml, "text/html");
      const plainText = doc.body.textContent || doc.body.innerText || editedArticleHtml;
      
      const htmlBlob = new Blob([richHtml], { type: "text/html" });
      const textBlob = new Blob([plainText], { type: "text/plain" });
      
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        })
      ]);
      
      setCopiedRichText(true);
      triggerNotice("✨ 样式化排版富文本已复制！可直接 Command+V / Ctrl+V 在微信公众号、Word、Notion 中粘贴。");
      setTimeout(() => setCopiedRichText(false), 2000);
    } catch (err) {
      console.error("Failed to copy rich text:", err);
      // Fallback
      navigator.clipboard.writeText(editedArticleHtml);
      setCopiedHTML(true);
      triggerNotice("⚠️ 浏览器安全限制阻止写入富文本对象，已为您回退复制 raw HTML 源码到剪贴板。");
      setTimeout(() => setCopiedHTML(false), 2000);
    }
  };

  // Export full HTML template file for download
  const handleDownloadFullHTML = () => {
    const fullPageContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${activeArticle.title} ｜ Prism Signal Custom Export</title>
    <!-- Combined Embedded CSS Stylesheet -->
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 40px auto;
            background: ${bgColor};
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            overflow: hidden;
        }
        ${getCompiledCSS()}
    </style>
</head>
<body>
    <div class="container">
        <div id="wenyan">
            ${editedArticleHtml}
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([fullPageContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `prism-editorial-${activeArticleId}.html`;
    link.click();
    URL.revokeObjectURL(url);
    triggerNotice("已成功生成并下载独立完整的网页文件！");
  };

  // Build the compiled CSS block specifically for physical live injection in iframe/preview
  // The variables will override the hardcoded colors in some definitions like #wenyan p em { color: #5b6cff }
  // We can dynamically declare these parameters globally
  const getInjectedStyleBlock = (bgOverride?: string, textOverride?: string) => {
    const activeBg = bgOverride || bgColor;
    const activeText = textOverride || secondaryColor;
    return `
      ${cssCode}
      
      /* Global Parameter Overrides Live Injection */
      #wenyan {
        --primary-accent: ${primaryColor};
        --bg-paper: ${activeBg};
        --text-body: ${activeText};
        font-size: ${fontSize}px !important;
        line-height: ${lineHeight} !important;
        background-color: ${activeBg} !important;
        color: ${activeText} !important;
      }
      
      #wenyan p + p {
        margin-top: ${paragraphSpacing}em !important;
      }
      
      /* Let user override hardcoded variable hooks with the live state values */
      #wenyan a,
      #wenyan .footnote,
      #wenyan p em {
        color: var(--primary-accent) !important;
        border-color: var(--primary-accent) !important;
      }
      
      #wenyan p strong::after {
        background: rgba(${hexToRgb(primaryColor)}, 0.16) !important;
      }
      
      #wenyan h1::before {
        background: linear-gradient(to right, var(--primary-accent), #3b82f6) !important;
      }
      
      #wenyan h2::before,
      #wenyan h3::before,
      #wenyan blockquote {
        border-color: var(--primary-accent) !important;
      }
      
      #wenyan blockquote::before {
        color: var(--primary-accent) !important;
      }
      
      #wenyan table {
        display: block !important;
        overflow-x: auto !important;
        max-width: 100% !important;
        width: 100% !important;
        -webkit-overflow-scrolling: touch;
      }
      
      #wenyan table th {
        background: rgba(${hexToRgb(primaryColor)}, 0.05) !important;
      }
    `;
  };

  // Helper utility to parse hex to comma RGB for alpha backing
  function hexToRgb(hex: string) {
    let raw = hex.replace("#", "");
    if (raw.length === 3) {
      raw = raw[0]+raw[0]+raw[1]+raw[1]+raw[2]+raw[2];
    }
    const num = parseInt(raw, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }

  // Pre-load default configurations based on Golden Capital Theme as bootstrap
  useEffect(() => {
    handleSelectTheme(PRESET_THEMES[0]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 flex flex-col font-sans overflow-hidden">
      
      {/* 🔴 LIVE EMBEDDED STYLESHEET */}
      <style>{getInjectedStyleBlock()}</style>

      {/* HEADER SECTION (Elegant Dark Premium Style Navbar) */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-8 bg-[#0f111a] shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="w-8 h-8 bg-[#5b6cff] rounded-lg flex items-center justify-center font-bold text-white italic shrink-0">P</div>
          <span className="font-semibold tracking-[0.1em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase text-slate-200 hidden xs:inline sm:block">
            Prism Signal <span className="text-xs opacity-50 ml-1 hidden md:inline">v2.0</span>
          </span>
          
          <button
            onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
            className="ml-1 sm:ml-4 px-2 sm:px-3 py-1.5 bg-[#0a0a0f] hover:bg-[#161925] border border-white/10 hover:border-[#5b6cff]/40 text-slate-350 hover:text-white rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1 sm:gap-1.5 transition-all outline-none shrink-0"
            title={isLeftPanelCollapsed ? "展开左侧编辑面板" : "收起左侧编辑面板"}
            type="button"
          >
            {isLeftPanelCollapsed ? (
              <>
                <PanelLeftOpen className="w-3.5 h-3.5 text-[#5b6cff] animate-pulse" />
                <span className="hidden sm:inline text-[#8fa0ff]">展开编辑 (Expand)</span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-slate-400">收起编辑 (Collapse)</span>
              </>
            )}
          </button>
        </div>

        {/* Central/Right navbar switchers */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs text-slate-400 font-medium hidden md:inline-block">预览选稿:</span>
          
          {/* Mobile dropdown selector */}
          <div className="md:hidden relative shrink-0">
            <select
              value={activeArticleId}
              onChange={(e) => handleSelectArticle(e.target.value)}
              className="bg-black/60 border border-white/10 hover:border-white/20 rounded-lg text-slate-200 text-xs py-1.5 pl-2.5 pr-8 appearance-none focus:outline-none focus:border-[#5b6cff]/50 transition-all font-semibold cursor-pointer"
            >
              {MOCK_ARTICLES.map((art) => (
                <option key={art.id} value={art.id} className="bg-[#0f111a] text-slate-200">
                  {art.title.length > 8 ? art.title.slice(0, 8) + "..." : art.title}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Desktop tab buttons selector */}
          <div className="hidden md:flex bg-black/40 p-1 rounded-lg border border-white/10 gap-1">
            {MOCK_ARTICLES.map((art) => (
              <button
                key={art.id}
                onClick={() => handleSelectArticle(art.id)}
                className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                  activeArticleId === art.id
                    ? "bg-[#5b6cff] text-white shadow-lg shadow-[#5b6cff]/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {art.title.length > 8 ? art.title.slice(0, 8) + "..." : art.title}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex gap-4 text-[10px] md:text-xs font-medium uppercase tracking-widest text-[#5b6cff] pl-4 border-l border-white/10 opacity-70">
            <span>Market Intelligence</span>
            <span>Deep Reading</span>
            <span>Global Data</span>
          </div>
        </div>
      </nav>

      {/* WORKSPACE CONTAINER */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden relative">
        
        {/* Backdrop overlay for drawer on mobile & iPad (< lg) */}
        {!isLeftPanelCollapsed && (
          <div 
            onClick={() => setIsLeftPanelCollapsed(true)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
            id="drawer-backdrop"
          />
        )}
        
        {/* LEFT COLUMN: CONTROL & CODE PANELS (Drawer overlay on < lg, grid column on lg+) */}
        <section 
          id="editor-drawer"
          className={`
            ${isLeftPanelCollapsed 
              ? "hidden lg:hidden" 
              : "fixed inset-y-0 left-0 w-[85vw] sm:w-[420px] z-50 shadow-2xl flex lg:relative lg:translate-x-0 lg:z-10 lg:w-auto lg:shadow-none lg:col-span-5"
            } 
            border-r border-white/10 bg-[#0d0f17] flex flex-col h-full lg:h-[calc(100vh-104px)] overflow-hidden transition-all duration-200
          `}
        >
          
          {/* Decorative Configuration bar from Design HTML */}
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/20 shrink-0">
            <span className="text-[10px] uppercase tracking-tighter font-bold text-[#5b6cff]">CSS Configuration</span>
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              {/* Close Button for mobile drawer */}
              <button
                type="button"
                onClick={() => setIsLeftPanelCollapsed(true)}
                className="lg:hidden text-slate-400 hover:text-white p-0.5 hover:bg-white/10 rounded-md cursor-pointer transition-colors flex items-center justify-center font-bold text-base w-5 h-5"
                title="关闭编辑面板"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-white/10 bg-[#0f111a] font-medium text-xs sticky top-0 z-10 shrink-0">
            <button
              onClick={() => setActiveTab("visual")}
              className={`flex-1 py-3 text-center border-b-2 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "visual"
                  ? "border-[#5b6cff] text-white font-semibold bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              排版微调与宏
            </button>
            <button
              onClick={() => setActiveTab("css")}
              className={`flex-1 py-3 text-center border-b-2 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "css"
                  ? "border-[#5b6cff] text-white font-semibold bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              <CodeXml className="w-3.5 h-3.5" />
              CSS 代码编辑
              <span className="bg-[#5b6cff]/10 text-[#5b6cff] text-[9px] px-1.5 py-0.5 rounded-full border border-[#5b6cff]/20">
                LIVE
              </span>
            </button>
            <button
              onClick={() => setActiveTab("article")}
              className={`flex-1 py-3 text-center border-b-2 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "article"
                  ? "border-[#5b6cff] text-white font-semibold bg-white/[0.03]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              编辑文章
            </button>
            <button
              onClick={() => setActiveTab("help")}
              className={`py-3 px-3 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-1 ${
                activeTab === "help"
                  ? "text-white bg-white/[0.03] border-b-2 border-[#5b6cff]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tab panels inner scroll */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6">
            
            {activeTab === "visual" && (
              <div className="space-y-6">
                {/* Section A: Presets list */}
                <ThemeSelector
                  activeThemeId={activeTheme.id}
                  onSelectTheme={handleSelectTheme}
                />
                
                <hr className="border-white/5" />

                {/* Section B: Adjustable Sliders & Colors */}
                <VisualAdjuster
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  lineHeight={lineHeight}
                  setLineHeight={setLineHeight}
                  paragraphSpacing={paragraphSpacing}
                  setParagraphSpacing={setParagraphSpacing}
                  primaryColor={primaryColor}
                  setPrimaryColor={setPrimaryColor}
                  secondaryColor={secondaryColor}
                  setSecondaryColor={setSecondaryColor}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  onInjectSnippet={handleInjectSnippet}
                  onResetToOriginal={handleResetToOriginal}
                  activeArticleTitle={activeArticle.title}
                  activeThemeId={activeTheme.id}
                />
              </div>
            )}

            {activeTab === "css" && (
              <div className="space-y-3 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                    当前活动 CSS 模块 (Scoped: #wenyan)
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <span>长数: {cssCode.length} 字符</span>
                  </div>
                </div>
                
                <p className="text-[11px] text-slate-400">
                  我们在渲染中自动封装了 <code>#wenyan</code> 作为总容器 ID。您在此处编辑的代码将通过虚拟通道即时更新。
                </p>

                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  placeholder="/* 输入您的自定义 CSS */"
                  className="flex-1 w-full min-h-[300px] bg-[#0a0a0f] text-slate-200 font-mono text-[11.5px] p-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#5b6cff]/50 resize-y leading-relaxed"
                  style={{ tabSize: 4 }}
                />
                
                <div className="space-y-1.5 pt-1.5 bg-[#0a0a0f] p-2.5 rounded-lg border border-white/10">
                  <span className="text-[10px] text-[#5b6cff] font-semibold uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-[#5b6cff] shrink-0" />
                    在线热更提示
                  </span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    本编辑器为双向流，修改将即时呈现在右侧的学术研报/移动端框体中。如因错误样式导致崩溃，可返回“排版微调”选项页点击“重置”一键复原。
                  </p>
                </div>
              </div>
            )}

            {activeTab === "article" && (
              <div className="space-y-3 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                    文章正文编辑器
                  </span>
                  <button 
                    onClick={() => {
                      const tgt = MOCK_ARTICLES.find(a => a.id === activeArticleId);
                      if (tgt) {
                        setEditedArticleHtml(tgt.htmlContent);
                        setEditedArticleMarkdown(convertHtmlToMarkdown(tgt.htmlContent));
                      }
                      triggerNotice("已还原文章原始内容。");
                    }} 
                    className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    还原当前篇目初始
                  </button>
                </div>

                {/* Format Segment Switcher */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-black/40 border border-white/10 rounded-xl relative">
                  <button
                    onClick={() => toggleInputFormat("markdown")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      inputFormat === "markdown"
                        ? "bg-[#5b6cff] text-white shadow-lg shadow-[#5b6cff]/20 animate-none"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    📝 Markdown 模式
                  </button>
                  <button
                    onClick={() => toggleInputFormat("html")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      inputFormat === "html"
                        ? "bg-[#5b6cff] text-white shadow-lg shadow-[#5b6cff]/20 animate-none"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    🌐 HTML 源码模式
                  </button>
                </div>

                {inputFormat === "markdown" ? (
                  <>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      直接在此编辑/黏贴 <strong>Markdown</strong> 格式文章。我们将即时在右侧应用您定制的主题样式，并支持使用底部的“复制样式化富文本”直接粘贴至公众号等媒介。
                    </p>
                    <textarea
                      value={editedArticleMarkdown}
                      onChange={(e) => handleMarkdownChange(e.target.value)}
                      placeholder="# 在这里输入您的 Markdown 文本...&#10;&#10;支持 H1/H2, 引用, 表格, 代码以及脚注"
                      className="flex-1 w-full min-h-[320px] bg-[#0a0a0f] text-slate-200 font-mono text-[11.5px] p-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#5b6cff]/50 resize-y leading-relaxed"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      可在此直接编辑 <strong>HTML</strong> 源码。修改将实时应用。完成排版后，随时可通过下方按钮快速输出或直接复制富文本。
                    </p>
                    <textarea
                      value={editedArticleHtml}
                      onChange={(e) => setEditedArticleHtml(e.target.value)}
                      placeholder="/* 输入您要测试的文章 HTML 内容 */"
                      className="flex-1 w-full min-h-[320px] bg-[#0a0a0f] text-slate-200 font-mono text-[11.5px] p-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#5b6cff]/50 resize-y leading-relaxed"
                    />
                  </>
                )}
              </div>
            )}

            {activeTab === "help" && (
              <div className="space-y-4 text-slate-300">
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  关于微信 / 传统研报排版引擎 (#wenyan)
                </h3>
                
                <div className="space-y-3 text-xs leading-relaxed">
                  <p>
                    <strong>#wenyan是什么？</strong>
                    <br />
                    在中文深度排版领域（尤其是如 <em>mdnice</em>, <em>Md2All</em> 等 Markdown 排版转换器中），<code>#wenyan</code> 是最为经典的中式渲染挂载点容器之一。它的样式结构常被创作者作为顶级微信公众号、博客推文的主题母片。
                  </p>
                  
                  <p>
                    <strong>核心设计细节：</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>为了模拟真实的高端财经分析质感，我们建议优先将论文/周报主体文字设置为带有轻微质感的 <strong>衬线字族</strong> (例如 Georgia / Merriweather )，而让表格保持无衬线或等宽数字对齐。</li>
                    <li>所有斜体文本 (<code>em</code>) 均根据主权资本感重新格式化。</li>
                    <li>为了保证表格中大量的资产指标和业绩回报易于比较，我们的精修 CSS 特别开启了 <code>tabular-nums</code> 特性，并配置末尾数值自动右对齐。</li>
                  </ul>
                  
                  <p className="p-3 bg-slate-950/80 rounded-lg text-[11px] text-slate-400 border border-slate-800 leading-normal">
                    💡 <strong>小锦囊</strong>: 点击“复制最终合并 CSS 样式”，可以直接粘贴到您喜欢的 Markdown 排版平台的自定义主题中，实现 100% 同款渲染哦！
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Quick Notice Toast */}
          {notice && (
            <div className="mx-5 mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span>{notice}</span>
            </div>
          )}

        </section>

        {/* RIGHT COLUMN: INTERACTIVE PREVIEW & SIMULATORS (7 cols) */}
        <section className={`col-span-12 ${isLeftPanelCollapsed ? "lg:col-span-12" : "lg:col-span-7"} bg-[#0f111a] p-4 md:p-6 flex flex-col h-[calc(100vh-104px)] overflow-hidden relative`}>
          
          {/* Top simulators toolbar */}
          <div className="bg-[#0d0f17] border border-white/10 p-2 sm:p-3 rounded-xl mb-4 flex flex-wrap gap-2 items-center justify-between shrink-0">
            {isLeftPanelCollapsed && (
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsLeftPanelCollapsed(false)}
                  className="px-2 py-1 bg-[#5b6cff]/10 hover:bg-[#5b6cff]/20 border border-[#5b6cff]/30 hover:border-[#5b6cff]/50 text-[#8fa0ff] hover:text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  title="展开编辑面板"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">编辑区</span>
                  <span className="xs:hidden">编辑</span>
                </button>
                <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
              </div>
            )}
            
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 font-sans">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">画布视图:</span>
              <div className="bg-black/40 p-1 rounded-lg border border-white/10 flex gap-0.5">
                <button
                  onClick={() => setPreviewWidth("desktop")}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer transition-all ${
                    previewWidth === "desktop"
                      ? "bg-[#5b6cff] text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="模拟桌面电脑/大屏网页"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">研报纸面</span>
                  <span className="sm:hidden">研报</span>
                </button>
                <button
                  onClick={() => setPreviewWidth("mobile")}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer transition-all ${
                    previewWidth === "mobile"
                      ? "bg-[#5b6cff] text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="模拟微信公众号手机竖屏"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">手机浏览</span>
                  <span className="sm:hidden">手机</span>
                </button>
                <button
                  onClick={() => setPreviewWidth("fluid")}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer transition-all ${
                    previewWidth === "fluid"
                      ? "bg-[#5b6cff] text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="自适应全宽"
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">自适应全宽</span>
                  <span className="sm:hidden">自适应</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 font-sans">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">预览环境:</span>
              <div className="bg-black/40 p-1 rounded-lg border border-white/10 flex gap-0.5 text-xs font-medium">
                <button
                  onClick={() => setPreviewThemeMode("default")}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    previewThemeMode === "default" ? "bg-[#5b6cff] text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  温纸
                </button>
                <button
                  onClick={() => setPreviewThemeMode("light")}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    previewThemeMode === "light" ? "bg-[#5b6cff] text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  高白
                </button>
                <button
                  onClick={() => setPreviewThemeMode("dark")}
                  className={`px-2 py-1 rounded cursor-pointer transition-all ${
                    previewThemeMode === "dark" ? "bg-[#5b6cff] text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  暗夜
                </button>
              </div>
            </div>
          </div>

          {/* PHYSICAL DRAWING PAPER BOX */}
          <div className="flex-1 bg-[#0a0a0f] rounded-2xl border border-white/10 p-4 pb-32 sm:pb-40 lg:pb-48 overflow-y-auto flex justify-center items-start scrollbar-thin relative group">
            
            {/* Real scale frame wraps */}
            <div
              className={`transition-all duration-500 shadow-2xl relative ${
                previewWidth === "mobile"
                  ? "w-[375px] my-6 rounded-[36px] overflow-hidden border-[12px] border-[#0a0a0f] min-h-[660px]"
                  : previewWidth === "desktop"
                  ? "w-full max-w-[760px] my-4 rounded-xl overflow-hidden border border-white/10"
                  : "w-full rounded-xl overflow-hidden"
              }`}
              style={{
                backgroundColor: 
                previewThemeMode === "dark" 
                  ? "#0f111a" 
                  : previewThemeMode === "light"
                  ? "#ffffff"
                  : bgColor
              }}
            >
              
              {/* Mobile device status bars indicators */}
              {previewWidth === "mobile" && (
                <div className="bg-[#0a0a0f] text-slate-400 text-[10px] py-1 px-5 flex justify-between items-center select-none font-mono tracking-tighter shrink-0 border-b border-white/5">
                  <span>PRISM BROADCAST</span>
                  <div className="w-16 h-3.5 bg-black/40 rounded-full mx-auto hidden sm:block border border-white/5" />
                  <span>5G 100%</span>
                </div>
              )}

              {/* THE ACTIVE DOCUMENT INNER CONTAINER */}
              <div 
                id="wenyan"
                className="p-6 sm:p-12 transition-all duration-300"
                style={{
                  fontFamily: activeTheme.fontFamily ? `${activeTheme.fontFamily}, Georgia, serif` : undefined,
                  backgroundColor: 
                    previewThemeMode === "dark" 
                      ? "#0c1017" 
                      : previewThemeMode === "light"
                      ? "#ffffff"
                      : bgColor,
                  color: previewThemeMode === "dark" ? "#e2e8f0" : secondaryColor
                }}
                dangerouslySetInnerHTML={{ __html: editedArticleHtml }}
              />

              {/* Mobile back Home Line indicator */}
              {previewWidth === "mobile" && (
                <div className="bg-[#0a0a0f] py-3 flex justify-center select-none shrink-0">
                  <div className="w-24 h-1 bg-white/10 rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* EXPORT ACTION FOOTER BAR */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-[#00020ae0] backdrop-blur-md border border-white/15 p-3.5 rounded-xl flex flex-col gap-3.5 z-30 shadow-2xl shadow-black/90 transition-all duration-300">
            {/* Header/Toggle Control Row */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsExportFooterCollapsed(!isExportFooterCollapsed)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors group"
                title={isExportFooterCollapsed ? "点击展开排版导出与背景色配置" : "点击收起排版导出与背景色配置"}
              >
                <Sparkles id="footer-sparkle" className="w-3.5 h-3.5 text-[#5b6cff] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="flex items-center gap-1.5">
                  微信与多端排版输出控制台 (WeChat & Multi-Platform Output)
                </span>
                {isExportFooterCollapsed ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors" />
                )}
              </button>

              {/* Quick Copy Action displayed when collapsed */}
              {isExportFooterCollapsed && (
                <button
                  type="button"
                  onClick={handleCopyRichText}
                  className={`py-1 px-3 text-[10px] font-semibold rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all ${
                    copiedRichText
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-[#5b6cff]/20 text-[#8fa0ff] border border-[#5b6cff]/30 hover:bg-[#5b6cff]/30"
                  }`}
                  title="一键复制微信样式化富文本"
                >
                  {copiedRichText ? (
                    <>
                      <Check className="w-3 h-3 animate-pulse" />
                      已复制富文本！
                    </>
                  ) : (
                    <>
                      <Palette className="w-3 h-3" />
                      快速微信复制
                    </>
                  )}
                </button>
              )}
            </div>

            {!isExportFooterCollapsed && (
              <div className="flex flex-col gap-4 pt-3 border-t border-white/5 animate-none">
                {/* Row 1: Copy Background Selection Options */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#5b6cff] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">
                        微信粘贴背景配置 (WeChat Paste Background)
                      </span>
                      <p className="text-[10px] text-slate-400">
                        微信编辑器默认是纯白画布，请配置复制样式时所附加包裹的底色：
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Theme BG Option */}
                    <button
                      onClick={() => setCopyBgMode("theme")}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        copyBgMode === "theme"
                          ? "bg-[#5b6cff]/20 text-[#8fa0ff] border border-[#5b6cff]/40"
                          : "bg-[#0a0a0f] text-slate-400 border border-white/5 hover:text-slate-200"
                      }`}
                      title="保留您自定义当前的画布底色（建议在拷贝深底色样式至微信时保持选中）。"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bgColor }} />
                      使用当前主题底色 ({bgColor.toUpperCase()})
                    </button>

                    {/* Forced White BG Option */}
                    <button
                      onClick={() => setCopyBgMode("white")}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        copyBgMode === "white"
                          ? "bg-[#5b6cff]/20 text-[#8fa0ff] border border-[#5b6cff]/40"
                          : "bg-[#0a0a0f] text-slate-400 border border-white/5 hover:text-slate-200"
                      }`}
                      title="强制复制的文本底色为白/透明，并且自动将文字颜色翻转为深灰，完美适应微信官方的白底编辑区。"
                    >
                      <span className="w-2 h-2 rounded-full bg-white border border-slate-500/30" />
                      强制纯白底色 (自动纠偏文字)
                    </button>

                    {/* Custom Copy BG Option */}
                    <button
                      onClick={() => setCopyBgMode("custom")}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        copyBgMode === "custom"
                          ? "bg-[#5b6cff]/20 text-[#8fa0ff] border border-[#5b6cff]/40"
                          : "bg-[#0a0a0f] text-slate-400 border border-white/5 hover:text-slate-200"
                      }`}
                      title="自定义粘贴至微信后富文本卡片的特定底色。"
                    >
                      <span className="w-2 h-2 rounded-full font-sans text-xs" style={{ backgroundColor: copyBgCustomColor }} />
                      自定义拷贝背景色
                    </button>

                    {/* Custom input color picker */}
                    {copyBgMode === "custom" && (
                      <div className="flex items-center gap-1 bg-[#161925] p-1 rounded-md border border-white/15 ml-1 animate-none">
                        <input
                          type="color"
                          value={copyBgCustomColor}
                          onChange={(e) => setCopyBgCustomColor(e.target.value)}
                          className="w-5 h-5 border-0 p-0 rounded cursor-pointer bg-transparent shrink-0"
                        />
                        <span className="text-[10px] font-mono text-slate-300 mr-1">{copyBgCustomColor.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: Default Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5b6cff] shrink-0" />
                      棱镜微信排版 ｜ 样式资产输出
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      我们使用专业的 <code>&lt;section&gt;</code> 容器导出。可直接 Command+V 在公众号后台原汁原味进行粘贴。
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Copy Styled Rich Text (Hot Copy for WeChat/Word/Notion) */}
                    <button
                      onClick={handleCopyRichText}
                      className={`py-2 px-3.5 text-xs font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto ${
                        copiedRichText
                          ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                          : "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white hover:brightness-110 shadow-lg shadow-indigo-600/20"
                      }`}
                      title="复制带有完整样式的排版。您可以在微信文章编辑器、Word、Notion 或各类博客写手平台中直接 粘贴 (Ctrl+V) 渲染后的成品，无需任何代码！"
                    >
                      {copiedRichText ? (
                        <>
                          <Check className="w-3.5 h-3.5 animate-pulse" />
                          已复制样式化富文本！
                        </>
                      ) : (
                        <>
                          <Palette className="w-3.5 h-3.5 text-violet-200" />
                          复制样式化富文本 (一键复制到微信/Word)
                        </>
                      )}
                    </button>

                    {/* Copy Customized CSS */}
                    <button
                      onClick={handleCopyCSS}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto ${
                        copiedCSS
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-[#0a0a0f] hover:bg-white/[0.02] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white"
                      }`}
                    >
                      {copiedCSS ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          已复制 CSS 代码！
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          复制 CSS Style
                        </>
                      )}
                    </button>

                    {/* Copy Sample HTML Code */}
                    <button
                      onClick={handleCopyHTML}
                      className="py-2 px-3 text-xs font-semibold bg-[#0a0a0f] hover:bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-slate-200 hover:text-white transition-all w-full sm:w-auto"
                    >
                      {copiedHTML ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          已复制 HTML 代码！
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          复制 HTML 源码
                        </>
                      )}
                    </button>

                    {/* Export as Complete static document */}
                    <button
                      onClick={handleDownloadFullHTML}
                      className="p-2 bg-[#0a0a0f] hover:bg-white/[0.02] rounded-xl border border-white/10 hover:border-white/20 text-slate-350 hover:text-white transition-colors cursor-pointer"
                      title="导出完整的独立单页网页 (HTML 文件，内含此 CSS)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="h-10 border-t border-white/5 bg-[#0a0a0f] px-8 flex items-center justify-between text-[10px] tracking-widest opacity-40 font-mono shrink-0">
        <div>SYS:PRISM_SIGNAL_CORE_R3</div>
        <div>NODE:HK_CENTRAL_042</div>
        <div>2026 // DEEP READING PROTOCOL</div>
      </footer>
    </div>
  );
}
