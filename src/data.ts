export interface PresetTheme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  fontFamily: string;
  css: string;
}

export interface MockArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  htmlContent: string;
}

export const ORIGINAL_CSS = `/**
 * Prism Signal ｜ 棱镜信号
 * Version 1.0
 * Deep Reading Theme
 */

/* =======================
   全局
======================= */

#wenyan {
    font-size: 16px;
    line-height: 1.95;
    color: inherit;
    letter-spacing: 0.03em;
    font-family:
        "PingFang SC",
        "SF Pro Display",
        "Microsoft YaHei",
        sans-serif;
}

/* =======================
   通用间距
======================= */

#wenyan h1,
#wenyan h2,
#wenyan h3,
#wenyan h4,
#wenyan h5,
#wenyan h6,
#wenyan p {
    margin: 1.2em 0;
}

/* =======================
   正文
======================= */

#wenyan p {
    color: inherit;
    text-align: justify;
    word-break: break-word;
}

/* 加粗 */

#wenyan p strong {
    font-weight: 700;
    color: inherit;
    position: relative;
}

#wenyan p strong::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 6px;
    background: rgba(91,108,255,.15);
    z-index: -1;
    border-radius: 4px;
}

/* 斜体 */

#wenyan p em {
    font-style: normal;
    color: #5b6cff;
}

/* =======================
   一级标题
======================= */

#wenyan h1 {
    text-align: center;
    font-size: 1.9em;
    font-weight: 800;
    line-height: 1.45;
    margin: 2.5em 0 2em;
    color: inherit;
}

#wenyan h1 span {
    color: inherit;
}

#wenyan h1::before {
    content: "";
    display: block;
    width: 42px;
    height: 4px;
    border-radius: 4px;
    background: #5b6cff;
    margin: 0 auto 18px;
}

#wenyan h1::after {
    content: "PRISM SIGNAL";
    display: block;
    margin-top: 16px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    color: #999;
}

/* =======================
   二级标题
======================= */

#wenyan h2 {
    border: none;
    text-align: left;
    font-size: 1.35em;
    font-weight: 700;
    line-height: 1.6;
    margin-top: 2.4em;
    margin-bottom: 1em;
    color: inherit;
}

#wenyan h2::before {
    content: "▍";
    color: #5b6cff;
    margin-right: 6px;
}

/* =======================
   三级标题
======================= */

#wenyan h3 {
    font-size: 1.12em;
    font-weight: 700;
    color: inherit;
    margin-top: 1.8em;
}

#wenyan h3::before {
    content: "●";
    color: #5b6cff;
    margin-right: 8px;
    font-size: 12px;
}

/* =======================
   四级标题
======================= */

#wenyan h4,
#wenyan h5,
#wenyan h6 {
    font-size: 1em;
    font-weight: 700;
    color: inherit;
}

/* =======================
   列表
======================= */

#wenyan > ul,
#wenyan > ol {
    padding-left: 1.2rem;
}

#wenyan ul,
#wenyan ol {
    margin-left: 1rem;
}

#wenyan li {
    margin: .5em 0;
    line-height: 1.9;
}

/* =======================
   图片
======================= */

#wenyan img {
    max-width: 100%;
    display: block;
    margin: 2em auto;
    border-radius: 12px;
}

/* =======================
   表格
======================= */

#wenyan table {
    border-collapse: collapse;
    margin: 2em auto;
    width: 100%;
    display: table;
    overflow-x: auto;
}

#wenyan table td,
#wenyan table th {
    border: 1px solid rgba(127,127,127,.15);
    padding: 10px 12px;
    font-size: 0.85em;
    line-height: 1.7;
}

#wenyan table th {
    font-weight: 700;
    background: rgba(127,127,127,.08);
}

#wenyan table tr:nth-child(even) {
    background: rgba(127,127,127,.03);
}

#wenyan table tr:nth-child(odd) {
    background: transparent;
}

/* =======================
   引用块
======================= */

#wenyan blockquote {
    margin: 2em 0;
    padding: 1em 1.2em;
    border-left: 3px solid #5b6cff;
    background: transparent;
    color: #888;
    font-size: 0.95em;
    line-height: 1.9;
    font-style: normal;
}

#wenyan blockquote::before {
    content: "❝";
    display: block;
    color: #5b6cff;
    font-size: 22px;
    margin-bottom: 6px;
}

#wenyan blockquote::after {
    content: "";
}

/* =======================
   行内代码
======================= */

#wenyan p code {
    background: rgba(127,127,127,.08);
    padding: 2px 6px;
    border-radius: 6px;
    color: #5b6cff;
    font-size: .85em;
}

/* =======================
   代码块
======================= */

#wenyan pre {
    margin: 1.5em 0;
    padding: 1em;
    border-radius: 12px;
    background: #1f2330;
    color: #f5f5f5;
    box-shadow: none;
    overflow-x: auto;
}

#wenyan pre code {
    margin: 0;
    padding: 0;
    color: inherit;
}

/* =======================
   分割线
======================= */

#wenyan hr {
    border: none;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(127,127,127,.3),
        transparent
    );
    margin: 3em 0;
}

/* =======================
   链接
======================= */

#wenyan a {
    color: #5b6cff;
    text-decoration: none;
    border-bottom: 1px dashed #5b6cff;
}

#wenyan .footnote {
    color: #5b6cff;
}

/* =======================
   脚注
======================= */

#wenyan #footnotes {
    margin-top: 2em;
    padding-top: 1em;
    border-top: 1px solid rgba(127,127,127,.15);
}

#wenyan #footnotes p {
    display: flex;
    margin: .4em 0;
    font-size: .85em;
    color: #888;
}

#wenyan .footnote-num {
    width: 8%;
}

#wenyan .footnote-txt {
    width: 92%;
}

/* =======================
   阅读节奏优化
======================= */

#wenyan h2 + p,
#wenyan h3 + p {
    margin-top: .6em;
}

#wenyan p + p {
    margin-top: .9em;
}
`;

export const GOLDEN_CAPITAL_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (金融深度定制版)
 * Version 2.0 - Premium Financial Editorial Theme
 * Designed for High-Net-Worth Markets & Research
 */

#wenyan {
    font-size: 16px;
    line-height: 1.95;
    color: #1a1d24;
    letter-spacing: 0.035em;
    font-family: "Georgia", "Merriweather", "PingFang SC", "Microsoft YaHei", sans-serif;
    background-color: #fbfaf7; /* 优质微黄轻涂纸质感底色 */
}

/* =======================
   通用间距
======================= */

#wenyan h1,
#wenyan h2,
#wenyan h3,
#wenyan h4,
#wenyan h5,
#wenyan h6,
#wenyan p {
    margin: 1.3em 0;
}

/* =======================
   正文
======================= */

#wenyan p {
    color: #2c323f;
    text-align: justify;
    word-break: break-word;
}

/* 加粗 - 精英金黄描边下划 */

#wenyan p strong {
    font-weight: 700;
    color: #0b0f19;
    position: relative;
    padding: 0 1px;
}

#wenyan p strong::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 5px;
    background: rgba(197, 168, 128, 0.22); /* 尊显金融沙金 */
    z-index: -1;
    border-radius: 2px;
}

/* 斜体 - 数据变动或重要提纯 (耀金高亮) */

#wenyan p em {
    font-style: normal;
    font-weight: 600;
    color: #bfa15f; /* 沙黄贵金 */
    border-bottom: 1px dotted #bfa15f;
    padding-bottom: 1px;
}

/* =======================
   一级标题 (主标题：高阶报章刊头)
======================= */

#wenyan h1 {
    text-align: center;
    font-size: 2.15em;
    font-weight: 800;
    line-height: 1.4;
    margin: 2.2em 0 1.6em;
    color: #0b0f19;
    letter-spacing: -0.01em;
}

#wenyan h1 span {
    color: inherit;
}

#wenyan h1::before {
    content: "";
    display: block;
    width: 45px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(to right, #bfa15f, #0f172a);
    margin: 0 auto 20px;
}

#wenyan h1::after {
    content: "PRISM MACRO & STRATEGY LAB";
    display: block;
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 5px;
    color: #8e95a5;
}

/* =======================
   二级标题 (路透与华尔街流线卡槽)
======================= */

#wenyan h2 {
    border: none;
    text-align: left;
    font-size: 1.42em;
    font-weight: 800;
    line-height: 1.5;
    margin-top: 2.4em;
    margin-bottom: 1.1em;
    color: #0b0f19;
}

#wenyan h2::before {
    content: "▍";
    color: #bfa15f; /* 纯正沙金 */
    margin-right: 8px;
    font-weight: bold;
}

/* =======================
   三级标题
======================= */

#wenyan h3 {
    font-size: 1.18em;
    font-weight: 700;
    color: #1e293b;
    margin-top: 1.9em;
}

#wenyan h3::before {
    content: "◈";
    color: #bfa15f;
    margin-right: 8px;
    font-size: 13px;
}

/* =======================
   四级标题
======================= */

#wenyan h4,
#wenyan h5,
#wenyan h6 {
    font-size: 1.05em;
    font-weight: 700;
    color: #0b0f19;
}

/* =======================
   列表
======================= */

#wenyan > ul,
#wenyan > ol {
    padding-left: 1.3rem;
}

#wenyan ul,
#wenyan ol {
    margin-left: 1.1rem;
}

#wenyan li {
    margin: .6em 0;
    line-height: 1.85;
    color: #4b5563;
}

/* =======================
   图片 (附带黄金时代经典边沿框线)
======================= */

#wenyan img {
    max-width: 100%;
    display: block;
    margin: 2.5em auto;
    border-radius: 8px;
    border: 1px solid rgba(197, 168, 128, 0.25);
    box-shadow: 0 10px 30px rgba(197, 168, 128, 0.08);
}

/* =======================
   表格 (FT/金融时报高透精简栏线表)
======================= */

#wenyan table {
    border-collapse: collapse;
    margin: 2.5em auto;
    width: 100%;
    display: table;
    overflow-x: auto;
    border-top: 2px solid #0b0f19;
    border-bottom: 2px solid #0b0f19;
}

#wenyan table td,
#wenyan table th {
    border: none;
    border-bottom: 1.5px solid rgba(197, 168, 128, 0.15);
    padding: 12px 14px;
    font-size: 0.88em;
    line-height: 1.6;
    text-align: left;
}

#wenyan table th {
    font-weight: 700;
    color: #0b0f19;
    background: rgba(197, 168, 128, 0.05); /* 轻沙金底色 */
    text-transform: uppercase;
    font-size: 0.82em;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #0b0f19;
}

#wenyan table tr:nth-child(even) {
    background: rgba(197, 168, 128, 0.02);
}

#wenyan table tr:nth-child(odd) {
    background: transparent;
}

/* =======================
   引用块 (投资先哲语录与核心结论)
======================= */

#wenyan blockquote {
    margin: 2.4em 0;
    padding: 1.3em 1.6em;
    border-left: 3.5px solid #bfa15f;
    background: rgba(197, 168, 128, 0.03);
    color: #475569;
    font-size: 0.98em;
    line-height: 1.85;
    font-style: italic;
    border-radius: 0 8px 8px 0;
}

#wenyan blockquote::before {
    content: "“";
    display: block;
    color: #bfa15f;
    font-size: 32px;
    line-height: 1;
    margin-bottom: -6px;
    font-family: "Georgia", serif;
}

#wenyan blockquote::after {
    content: "";
}

/* =======================
   行内代码
======================= */

#wenyan p code {
    background: rgba(197, 168, 128, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    color: #bfa15f;
    font-size: .88em;
    font-family: inherit;
    font-weight: bold;
}

/* =======================
   代码块 (彭博量化终端与数据流盒)
======================= */

#wenyan pre {
    margin: 2em 0;
    padding: 1.2em;
    border-radius: 10px;
    background: #0f141c; /* 极客炭黑 */
    color: #e2e8f0;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
    border: 1px solid rgba(197, 168, 128, 0.15);
    overflow-x: auto;
}

#wenyan pre code {
    margin: 0;
    padding: 0;
    color: #00ff66; /* 蓬勃牛市绿 */
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 0.88em;
}

/* =======================
   分割线 (金星闪烁渐变条)
======================= */

#wenyan hr {
    border: none;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(197, 168, 128, 0.4),
        transparent
    );
    margin: 3.5em 0;
}

/* =======================
   链接 (经典彭博高亮超链)
======================= */

#wenyan a {
    color: #0a84ff;
    text-decoration: none;
    border-bottom: 1.5px dashed rgba(10, 132, 255, 0.4);
}

#wenyan a:hover {
    color: #0055d4;
    border-bottom: 1.5px solid #0055d4;
}

#wenyan .footnote {
    color: #bfa15f;
    font-weight: 700;
}

/* =======================
   脚注
======================= */

#wenyan #footnotes {
    margin-top: 3.2em;
    padding-top: 1.2em;
    border-top: 1px solid rgba(197, 168, 128, 0.25);
}

#wenyan #footnotes p {
    display: flex;
    margin: .5em 0;
    font-size: .82em;
    color: #64748b;
    line-height: 1.7;
}

#wenyan .footnote-num {
    width: 6%;
    font-weight: 700;
    color: #bfa15f;
}

#wenyan .footnote-txt {
    width: 94%;
}

/* =======================
   阅读节奏优化
======================= */

#wenyan h2 + p,
#wenyan h3 + p {
    margin-top: .7em;
}

#wenyan p + p {
    margin-top: 1.05em;
}
`;

export const CRYSTAL_CYAN_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (Nasdaq 科技蓝版)
 * Version 2.0 - Silicon Valley Venture & Tech-Fin Theme
 * Designed for High-Growth Tech Stock Analysis
 */

#wenyan {
    font-size: 16px;
    line-height: 1.95;
    color: #ccd6f6; /* 炫酷深色底银灰字 */
    letter-spacing: 0.035em;
    font-family: "PingFang SC", "-apple-system", "Fira Code", "Space Grotesk", sans-serif;
    background-color: #0b111e; /* 极简太空极夜暗蓝 */
}

/* =======================
   通用间距
======================= */

#wenyan h1,
#wenyan h2,
#wenyan h3,
#wenyan h4,
#wenyan h5,
#wenyan h6,
#wenyan p {
    margin: 1.25em 0;
}

/* =======================
   正文
======================= */

#wenyan p {
    color: #a8b2d1;
    text-align: justify;
    word-break: break-word;
}

/* 加粗 - 闪耀青蓝下划轨 */

#wenyan p strong {
    font-weight: 700;
    color: #64ffda; /* 高频青兰 */
    position: relative;
    padding: 0 2px;
}

#wenyan p strong::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 5px;
    background: rgba(100, 255, 218, 0.15);
    z-index: -1;
    border-radius: 2px;
}

/* 斜体 (耀目深紫色突显) */

#wenyan p em {
    font-style: normal;
    color: #f43f5e; /* 激昂玫瑰色 */
    font-weight: 600;
}

/* =======================
   一级标题
======================= */

#wenyan h1 {
    text-align: center;
    font-size: 2.1em;
    font-weight: 800;
    line-height: 1.35;
    margin: 2.2em 0 1.8em;
    color: #f3f4f6;
}

#wenyan h1 span {
    color: inherit;
}

#wenyan h1::before {
    content: "";
    display: block;
    width: 50px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #64ffda, #00b4d8);
    margin: 0 auto 18px;
}

#wenyan h1::after {
    content: "PRISM VENTURE CAPITAL REPORT";
    display: block;
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #64748b;
}

/* =======================
   二级标题 (硅谷前沿光轨)
======================= */

#wenyan h2 {
    border: none;
    text-align: left;
    font-size: 1.4em;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 2.4em;
    margin-bottom: 1em;
    color: #f3f4f6;
}

#wenyan h2::before {
    content: "▍";
    color: #64ffda; /* 科技荧光青 */
    margin-right: 8px;
    text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
}

/* =======================
   三级标题
======================= */

#wenyan h3 {
    font-size: 1.15em;
    font-weight: 700;
    color: #e2e8f0;
    margin-top: 1.8em;
}

#wenyan h3::before {
    content: "◈";
    color: #00b4d8;
    margin-right: 8px;
    font-size: 12px;
}

/* =======================
   表格
======================= */

#wenyan table {
    border-collapse: collapse;
    margin: 2.5em auto;
    width: 100%;
    display: table;
    overflow-x: auto;
    border-top: 2px solid #1e293b;
    border-bottom: 2px solid #1e293b;
}

#wenyan table td,
#wenyan table th {
    border: none;
    border-bottom: 1px solid #1e293b;
    padding: 12px 14px;
    font-size: 0.88em;
    line-height: 1.6;
    color: #cbd5e1;
}

#wenyan table th {
    font-weight: 700;
    color: #64ffda;
    background: rgba(100, 255, 218, 0.03);
    text-transform: uppercase;
    font-size: 0.82em;
    letter-spacing: 0.05em;
}

#wenyan table tr:nth-child(even) {
    background: rgba(30, 41, 59, 0.3);
}

#wenyan table tr:nth-child(odd) {
    background: transparent;
}

/* =======================
   引用块
======================= */

#wenyan blockquote {
    margin: 2.2em 0;
    padding: 1.2em 1.5em;
    border-left: 3px solid #64ffda;
    background: rgba(100, 255, 218, 0.02);
    color: #94a3b8;
    font-size: 0.96em;
    line-height: 1.85;
    border-radius: 0 6px 6px 0;
}

#wenyan blockquote::before {
    content: "“";
    display: block;
    color: #64ffda;
    font-size: 32px;
    margin-bottom: -6px;
    font-family: serif;
}

/* =======================
   代码块
======================= */

#wenyan pre {
    margin: 2em 0;
    padding: 1.2em;
    border-radius: 10px;
    background: #020617;
    color: #8892b0;
    box-shadow: 0 10px 30px -10px rgba(2, 6, 23, 0.7);
    border: 1px solid #1e293b;
    overflow-x: auto;
}

#wenyan pre code {
    margin: 0;
    padding: 0;
    color: #64ffda;
    font-family: "Fira Code", "Space Grotesk", monospace;
    font-size: 0.86em;
}

/* =======================
   分割线
======================= */

#wenyan hr {
    border: none;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(100, 255, 218, 0.25),
        transparent
    );
    margin: 3.5em 0;
}

/* =======================
   链接
======================= */

#wenyan a {
    color: #64ffda;
    text-decoration: none;
    border-bottom: 1px dashed #64ffda;
}

#wenyan a:hover {
    color: #00ffc4;
    border-bottom: 1.5px solid #00ffc4;
}

/* =======================
   脚注
======================= */

#wenyan #footnotes {
    margin-top: 3.2em;
    padding-top: 1.2em;
    border-top: 1px solid #1e293b;
}

#wenyan #footnotes p {
    display: flex;
    margin: .5em 0;
    font-size: .82em;
    color: #64748b;
}

#wenyan .footnote-num {
    width: 6%;
    font-weight: 700;
    color: #64ffda;
}

#wenyan .footnote-txt {
    width: 94%;
}
`;

export const ELEGANT_DARK_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (雅致极夜版)
 * Version 2.0 - Elegant Dark Edition
 * Specialized for Dark Interface Deep Reading
 */

#wenyan {
    font-size: 16px;
    line-height: 1.95;
    color: #ccd5e0; /* 优雅板岩灰 */
    letter-spacing: 0.035em;
    font-family: "PingFang SC", "SF Pro Display", "Microsoft YaHei", sans-serif;
    background-color: #0f111a; /* 雅致极暗背景 */
}

/* =======================
   通用间距
======================= */

#wenyan h1,
#wenyan h2,
#wenyan h3,
#wenyan h4,
#wenyan h5,
#wenyan h6,
#wenyan p {
    margin: 1.25em 0;
}

/* =======================
   正文
======================= */

#wenyan p {
    color: #a8b2d1;
    text-align: justify;
    word-break: break-word;
}

/* 加粗 - 雅致冷光下划 */

#wenyan p strong {
    font-weight: 700;
    color: #ffffff;
    position: relative;
    padding: 0 1px;
}

#wenyan p strong::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 5px;
    background: rgba(91, 108, 255, 0.2); /* 皇家邃蓝 */
    z-index: -1;
    border-radius: 2px;
}

/* 斜体 */

#wenyan p em {
    font-style: normal;
    color: #5b6cff; /* 皇家邃蓝 */
    font-weight: 600;
}

/* =======================
   一级标题
======================= */

#wenyan h1 {
    text-align: center;
    font-size: 2.1em;
    font-weight: 800;
    line-height: 1.35;
    margin: 2.2em 0 1.8em;
    color: #ffffff;
}

#wenyan h1 span {
    color: inherit;
}

#wenyan h1::before {
    content: "";
    display: block;
    width: 50px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #5b6cff, #a855f7);
    margin: 0 auto 18px;
}

#wenyan h1::after {
    content: "PRISM GLOBAL DATA INTELLIGENCE";
    display: block;
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #64748b;
}

/* =======================
   二级标题 (极夜光轨)
 ======================= */

#wenyan h2 {
    border: none;
    text-align: left;
    font-size: 1.4em;
    font-weight: 700;
    line-height: 1.5;
    margin-top: 2.4em;
    margin-bottom: 1em;
    color: #ffffff;
}

#wenyan h2::before {
    content: "▍";
    color: #5b6cff; /* 蓝色信号 */
    margin-right: 8px;
    text-shadow: 0 0 8px rgba(91, 108, 255, 0.6);
}

/* =======================
   三级标题
 ======================= */

#wenyan h3 {
    font-size: 1.15em;
    font-weight: 700;
    color: #e2e8f0;
    margin-top: 1.8em;
}

#wenyan h3::before {
    content: "◈";
    color: #8b5cf6; /* 紫色闪烁 */
    margin-right: 8px;
    font-size: 12px;
}

/* =======================
   表格
 ======================= */

#wenyan table {
    border-collapse: collapse;
    margin: 2.5em auto;
    width: 100%;
    display: table;
    overflow-x: auto;
    border-top: 2px solid rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

#wenyan table td,
#wenyan table th {
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 12px 14px;
    font-size: 0.88em;
    line-height: 1.6;
    color: #cbd5e1;
}

#wenyan table th {
    font-weight: 700;
    color: #ffffff;
    background: rgba(91, 108, 255, 0.05);
    text-transform: uppercase;
    font-size: 0.82em;
    letter-spacing: 0.05em;
}

#wenyan table tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.02);
}

#wenyan table tr:nth-child(odd) {
    background: transparent;
}

/* =======================
   引用块
 ======================= */

#wenyan blockquote {
    margin: 2.2em 0;
    padding: 1.2em 1.5em;
    border-left: 3px solid #5b6cff;
    background: rgba(91, 108, 255, 0.03);
    color: #94a3b8;
    font-size: 0.96em;
    line-height: 1.85;
    border-radius: 0 6px 6px 0;
}

#wenyan blockquote::before {
    content: "“";
    display: block;
    color: #5b6cff;
    font-size: 32px;
    margin-bottom: -6px;
    font-family: serif;
}

/* =======================
   代码块
 ======================= */

#wenyan pre {
    margin: 2em 0;
    padding: 1.2em;
    border-radius: 10px;
    background: #0d0f17;
    color: #cbd5e1;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow-x: auto;
}

#wenyan pre code {
    margin: 0;
    padding: 0;
    color: #5b6cff;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.86em;
}

/* =======================
   分割线
 ======================= */

#wenyan hr {
    border: none;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.15),
        transparent
    );
    margin: 3.5em 0;
}

/* =======================
   链接
 ======================= */

#wenyan a {
    color: #5b6cff;
    text-decoration: none;
    border-bottom: 1px dashed #5b6cff;
}

#wenyan a:hover {
    color: #8b5cf6;
    border-bottom: 1.5px solid #8b5cf6;
}

/* =======================
   脚注
 ======================= */

#wenyan #footnotes {
    margin-top: 3.2em;
    padding-top: 1.2em;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

#wenyan #footnotes p {
    display: flex;
    margin: .5em 0;
    font-size: .82em;
    color: #64748b;
}

#wenyan .footnote-num {
    width: 6%;
    font-weight: 700;
    color: #5b6cff;
}

#wenyan .footnote-txt {
    width: 94%;
}
`;

export const TACTICAL_COMMAND_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (战术指令版)
 * Version 2.0 - Tactical Command Edition
 * Specialized for Defense, Aerodynamics, and Geopolitics
 */

#wenyan {
    font-size: 15.5px;
    line-height: 1.85;
    color: #a3b8cc; /* 战术钢灰 */
    letter-spacing: 0.05em;
    font-family: inherit;
    background-color: #0c0f16; /* 深海潜艇黑 */
    position: relative;
    border-radius: 4px;
    padding: 30px;
    border: 1px solid rgba(16, 185, 129, 0.15);
}

/* Base Military Grid Overlays and Lines */
#wenyan::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: 
        linear-gradient(rgba(16, 185, 129, 0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16, 185, 129, 0.015) 1px, transparent 1px);
    background-size: 25px 25px;
    z-index: 1;
}

#wenyan h1, #wenyan h2, #wenyan h3, #wenyan h4, #wenyan p, #wenyan blockquote, #wenyan table, #wenyan hr, #wenyan #footnotes {
    position: relative;
    z-index: 5;
}

/* Headlines as Tactical Broadcast Alerts */
#wenyan h1 {
    font-size: 1.8em;
    font-weight: 900;
    color: #10b981; /* 指令雷达绿 */
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: 1px solid rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.04);
    padding: 18px 24px;
    border-left: 6px solid #10b981;
    display: block;
    margin-bottom: 1.6em;
    box-shadow: 0 4px 24px rgba(16, 185, 129, 0.08);
}

#wenyan h1 span {
    color: #ef4444; /* 核心预警红 */
    text-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
    background: rgba(239, 68, 68, 0.12);
    padding: 2px 8px;
    border-radius: 2px;
}

#wenyan h2 {
    font-size: 1.35em;
    font-weight: 850;
    color: #38bdf8; /* 天空突击蓝 */
    letter-spacing: 0.08em;
    border-bottom: 2px dashed rgba(56, 189, 248, 0.3);
    padding-bottom: 8px;
    margin-top: 2em;
}

#wenyan h2::before {
    content: "■ SYS_ALERT // ";
    font-size: 0.75em;
    color: #10b981;
    opacity: 0.9;
    font-family: monospace;
}

#wenyan h3 {
    font-size: 1.1em;
    font-weight: 750;
    color: #e2e8f0;
    letter-spacing: 0.05em;
    margin-top: 1.6em;
}

#wenyan h3::before {
    content: "◢ ";
    color: #f59e0b;
}

/* Bold values highlight under military goggles */
#wenyan p strong {
    font-family: "JetBrains Mono", monospace;
    font-weight: 700;
    color: #ffffff;
    background: rgba(16, 185, 129, 0.18);
    border-bottom: 2px solid #10b981;
    padding: 1px 4px;
    border-radius: 2px;
}

#wenyan p em {
    font-style: normal;
    color: #f59e0b; /* 战区预警橙 */
    font-weight: 650;
}

/* Codes as Tactical Terminal Lines */
#wenyan code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.88em;
    background: #06080d;
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 500;
}

#wenyan pre {
    background: #06080d;
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-left: 3px solid #10b981;
    padding: 14px;
    border-radius: 4px;
    margin: 1.5em 0;
    overflow-x: auto;
}

#wenyan pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #a7f3d0;
}

/* Critical Action Quotes (Blockquotes) */
#wenyan blockquote {
    background: rgba(239, 68, 68, 0.04);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-left: 5px solid #ef4444; /* 战地戒备 */
    padding: 1.5em 1.8em;
    border-radius: 4px;
    color: #f87171;
    font-size: 0.95em;
    font-family: inherit;
    margin: 1.8em 0;
}

#wenyan blockquote::before {
    content: "⚠️ [SECURE CHANNELS // COMMAND BRIEFING]";
    display: block;
    font-size: 10px;
    color: #ef4444;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-bottom: 0.6em;
}

/* Table as Tactical Grid Monitor Matrix */
#wenyan table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    margin: 2em 0;
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 6px;
    overflow: hidden;
    background: rgba(12, 15, 22, 0.7);
}

#wenyan table th {
    background: rgba(56, 189, 248, 0.12);
    color: #38bdf8;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.08em;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(56, 189, 248, 0.22);
    border-right: 1px solid rgba(56, 189, 248, 0.1);
}

#wenyan table td {
    padding: 11px 14px;
    font-size: 12.5px;
    border-bottom: 1px solid rgba(56, 189, 248, 0.1);
    border-right: 1px solid rgba(56, 189, 248, 0.1);
    color: #cbd5e1;
}

#wenyan table tr:last-child td {
    border-bottom: none;
}

#wenyan table tr:hover td {
    background: rgba(16, 185, 129, 0.05);
    color: #10b981;
}

/* Footnotes with strict telemetry tags */
#wenyan #footnotes {
    margin-top: 3.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed rgba(16, 185, 129, 0.25);
}

#wenyan .footnote-num {
    color: #10b981;
    font-weight: 800;
}

#wenyan .footnote-txt {
    color: #64748b;
    font-size: 11px;
}
`;

export const CYBER_MIND_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (灵脑觉醒版)
 * Version 2.0 - Cyber Mind & Deep Neural Network Edition
 * Immersive AI Cybernetic UI Style
 */

#wenyan {
    font-size: 16px;
    line-height: 1.95;
    color: #cbd5e1; /* Neural glow white */
    letter-spacing: 0.04em;
    font-family: inherit;
    background-color: #050212; /* Neural Deep Cosmic Violet */
    position: relative;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid rgba(168, 85, 247, 0.2);
}

/* Hologram Scanning Lines and Light Orbs */
#wenyan::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(217, 70, 239, 0.008) 50%,
        rgba(168, 85, 247, 0.008) 50%
    );
    background-size: 100% 4px;
    z-index: 1;
}

#wenyan h1, #wenyan h2, #wenyan h3, #wenyan h4, #wenyan p, #wenyan blockquote, #wenyan table, #wenyan pre, #wenyan #footnotes {
    position: relative;
    z-index: 5;
}

/* Cybernetic Neon Glow Headlines */
#wenyan h1 {
    font-size: 2.0em;
    font-weight: 900;
    color: #ffffff;
    background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    letter-spacing: 0.08em;
    padding: 24px 0;
    border-bottom: 2px solid;
    border-image: linear-gradient(to right, transparent, #ec4899, #3b82f6, transparent) 1;
    margin-bottom: 1.8em;
    text-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
}

#wenyan h1 span {
    background: linear-gradient(95deg, #f472b6, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
    text-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
    padding: 0 4px;
}

#wenyan h2 {
    font-size: 1.45em;
    font-weight: 800;
    color: #d946ef; /* Cyber Pink */
    text-shadow: 0 0 10px rgba(217, 70, 239, 0.15);
    border-bottom: 1px solid rgba(217, 70, 239, 0.25);
    padding-bottom: 8px;
    margin-top: 2em;
    display: flex;
    align-items: center;
    gap: 8px;
}

#wenyan h2::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(217, 70, 239, 0.25), transparent);
}

#wenyan h3 {
    font-size: 1.15em;
    font-weight: 700;
    color: #38bdf8; /* Digital Cyan */
}

/* Artificial synaptic links in bold nodes */
#wenyan p strong {
    color: #ffffff;
    font-weight: 800;
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
    padding: 1px 6px;
    border-radius: 4px;
    border-left: 2px solid #ec4899;
}

#wenyan p em {
    font-style: normal;
    color: #f43f5e;
    font-weight: 600;
    border-bottom: 1px dotted #f43f5e;
}

/* Holographic code container */
#wenyan code {
    font-family: "Fira Code", "JetBrains Mono", monospace;
    background: #0f0a2e;
    color: #64ffda;
    border: 1px solid rgba(100, 255, 218, 0.25);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.88em;
}

#wenyan pre {
    background: #07031c;
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-left: 3px solid #d946ef;
    padding: 14px;
    border-radius: 6px;
    margin: 1.5em 0;
    overflow-x: auto;
}

#wenyan pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #a78bfa;
}

/* Deep consciousness thinking space (Blockquotes) */
#wenyan blockquote {
    background: rgba(139, 92, 246, 0.04);
    border-radius: 12px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.05);
    padding: 1.8em;
    color: #c084fc;
    font-size: 0.98em;
    font-style: italic;
    position: relative;
    margin: 2em 0;
}

#wenyan blockquote::before {
    content: "“ AI SYNAPSE COGNITION LAYER ”";
    position: absolute;
    top: -10px;
    left: 24px;
    background: #050212;
    padding: 0 10px;
    font-size: 9px;
    color: #d946ef;
    letter-spacing: 0.2em;
    font-family: monospace;
    font-weight: 700;
}

/* Neo-Futuristic Cyber Table List */
#wenyan table {
    width: 100%;
    border-spacing: 0;
    margin: 2em 0;
    background: rgba(15, 10, 46, 0.4);
    border-radius: 10px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    overflow: hidden;
    border-collapse: separate;
}

#wenyan table th {
    background: rgba(139, 92, 246, 0.15);
    border-bottom: 1px solid rgba(139, 92, 246, 0.25);
    color: #a855f7;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.1em;
    padding: 14px;
}

#wenyan table td {
    padding: 12px 14px;
    font-size: 12.5px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(139, 92, 246, 0.08);
}

#wenyan table tr:last-child td {
    border-bottom: none;
}

#wenyan table tr:hover td {
    background: rgba(217, 70, 239, 0.05);
    color: #ffffff;
}

/* Neon synapse footnotes */
#wenyan #footnotes {
    margin-top: 4rem;
    padding-top: 1.8em;
    border-top: 1px solid rgba(217, 70, 239, 0.2);
}

#wenyan .footnote-num {
    color: #d946ef;
    font-weight: 800;
}

#wenyan .footnote-txt {
    color: #8b9bb4;
}
`;

export const QUANTUM_QUANT_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (量子高频版)
 * Version 2.0 - Quantum Quant High-Frequency Trading Edition
 * High-Density Bloomberg & Refinitiv Premium Financial Styling
 */

#wenyan {
    font-size: 15px;
    line-height: 1.8;
    color: #cbd5e1; /* Terminal bright text */
    letter-spacing: 0.025em;
    font-family: inherit;
    background-color: #0a0a0c; /* High Frequency Carbon Black */
    position: relative;
    padding: 30px;
    border-radius: 6px;
    border: 1px solid rgba(234, 179, 8, 0.15);
}

/* Bottom and Top gold/carbon accent line decors */
#wenyan::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #eab308, #10b981, #ef4444);
    z-index: 10;
}

#wenyan h1, #wenyan h2, #wenyan h3, #wenyan h4, #wenyan p, #wenyan blockquote, #wenyan table, #wenyan pre, #wenyan #footnotes {
    position: relative;
    z-index: 5;
}

/* Institutional Terminal Layout Heading */
#wenyan h1 {
    font-size: 1.8em;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 18px 0;
    border-bottom: 3px double #eab308; /* Luxury double line */
    margin-bottom: 1.5em;
}

#wenyan h1 span {
    color: #eab308; /* Carbon gold indicator */
    text-shadow: 0 0 6px rgba(234, 179, 8, 0.3);
    background: rgba(234, 179, 8, 0.08);
    padding: 2px 8px;
    border-radius: 2px;
}

#wenyan h2 {
    font-size: 1.3em;
    font-weight: 800;
    color: #facc15; /* Golden Yellow */
    margin-top: 2em;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(250, 204, 21, 0.25);
    text-transform: uppercase;
}

#wenyan h2::before {
    content: "⚡ COLD_INDEX_ ";
    font-size: 0.8em;
    color: #eab308;
    font-family: monospace;
}

#wenyan h3 {
    font-size: 1.08em;
    font-weight: 750;
    color: #ffffff;
    text-transform: uppercase;
}

/* Monospace Numbers in high-end financial text */
#wenyan p strong {
    font-family: "JetBrains Mono", monospace;
    font-weight: 700;
    color: #ffffff;
    background: rgba(234, 179, 8, 0.15);
    border-left: 2.5px solid #eab308;
    padding: 2px 6px;
    border-radius: 1px;
}

#wenyan p em {
    font-style: normal;
    color: #22d3ee; /* Dynamic light cyan spec */
    font-weight: 500;
}

/* Live indicators in quotes */
#wenyan blockquote {
    background: rgba(234, 179, 8, 0.02);
    border: 1px solid rgba(234, 179, 8, 0.15);
    border-top: 2px solid #eab308;
    border-bottom: 2px solid #eab308;
    padding: 1.35em 1.6em;
    margin: 1.8em 0;
    border-radius: 2px;
}

#wenyan blockquote::before {
    content: "■ TRADING RESEARCH GROUP // INSTITUTIONAL RECOVERY ONLY";
    display: block;
    font-size: 9px;
    color: #eab308;
    font-family: "JetBrains Mono", monospace;
    letter-spacing: 1.2px;
    margin-bottom: 8px;
    font-weight: 700;
}

/* Double lines and precise grids (Table) */
#wenyan table {
    width: 100%;
    margin: 2em 0;
    font-family: "JetBrains Mono", monospace;
    border-collapse: collapse;
}

#wenyan table th {
    background: #121215;
    color: #eab308;
    font-weight: 700;
    border-top: 1px solid rgba(234, 179, 8, 0.3);
    border-bottom: 2px solid #eab308;
    padding: 12px;
    font-size: 11px;
    text-align: left;
    text-transform: uppercase;
}

#wenyan table td {
    padding: 10px 12px;
    font-size: 12px;
    border-bottom: 1px solid #1c1c21;
    color: #cbd5e1;
}

/* Positive signals styled dynamically as high-frequency greens */
#wenyan table td:nth-child(even), #wenyan table td code {
    color: #38bdf8;
}

#wenyan table tr:hover td {
    background: #111114;
}

#wenyan code {
    font-family: "JetBrains Mono", monospace;
    background: #222226;
    color: #22d3ee;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 0.88em;
}

#wenyan pre {
    background: #020203;
    border: 1px solid rgba(234, 179, 8, 0.2);
    border-left: 3px solid #eab308;
    padding: 14px;
    border-radius: 4px;
    margin: 1.5em 0;
    overflow-x: auto;
}

#wenyan pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #facc15;
}

#wenyan #footnotes {
    margin-top: 3.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #27272c;
}

#wenyan .footnote-num {
    color: #eab308;
    font-weight: 800;
}

#wenyan .footnote-txt {
    color: #52525b;
}
`;

export const NEURAL_PULSE_CSS = `/**
 * Prism Signal ｜ 棱镜信号 (星云脉冲版)
 * Version 2.0 - Neural Pulse & AGI Singularity Edition
 * High-End Cybernetic Cognitive AI Future Styling
 */

#wenyan {
    font-size: 16px;
    line-height: 1.9;
    color: #cbd5e1; /* Electropunk Slate White */
    letter-spacing: 0.04em;
    font-family: inherit;
    background-color: #030611; /* Liquid Nitrogen Deep Blue */
    position: relative;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid rgba(0, 255, 204, 0.25);
    box-shadow: 0 0 35px rgba(0, 168, 255, 0.08);
}

/* Futuristic Scanline and Data Margin Overlays */
#wenyan::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: 
        linear-gradient(rgba(0, 255, 204, 0.012) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 204, 0.012) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: 1;
}

#wenyan::after {
    content: "⚡ NEURAL_PULSE_CORRIDOR_V2.0 // NODE_ONLINE";
    position: absolute;
    bottom: 12px;
    right: 20px;
    font-size: 8px;
    font-family: monospace;
    color: #00ffcc;
    opacity: 0.45;
    letter-spacing: 2px;
    z-index: 10;
}

#wenyan h1, #wenyan h2, #wenyan h3, #wenyan h4, #wenyan p, #wenyan blockquote, #wenyan table, #wenyan pre, #wenyan #footnotes {
    position: relative;
    z-index: 5;
}

/* Hologram Title with Dual Accent Synapses */
#wenyan h1 {
    font-size: 1.9em;
    font-weight: 900;
    color: #ffffff;
    text-align: left;
    letter-spacing: 0.1em;
    padding: 20px;
    border: 1px solid rgba(0, 255, 204, 0.25);
    background: linear-gradient(135deg, rgba(3, 6, 17, 0.95), rgba(7, 12, 32, 0.95));
    border-top: 4px solid #00ffcc;
    margin-bottom: 1.8em;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 255, 204, 0.05);
}

#wenyan h1 span {
    background: linear-gradient(90deg, #00ffcc 0%, #ffff00 50%, #ff00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
    text-shadow: 0 0 20px rgba(0, 255, 204, 0.35);
}

#wenyan h2 {
    font-size: 1.35em;
    font-weight: 850;
    color: #00ffcc; /* Glowing neon cyan */
    text-shadow: 0 0 8px rgba(0, 255, 204, 0.25);
    border-bottom: 1px dashed rgba(0, 255, 204, 0.3);
    padding-bottom: 6px;
    margin-top: 2em;
}

#wenyan h2::before {
    content: "⟨ NEURAL_INDEX ⟩ ";
    font-size: 0.75em;
    color: #bd00ff; /* Neuro spectrum violet */
    font-family: monospace;
    font-weight: 700;
}

#wenyan h3 {
    font-size: 1.1em;
    font-weight: 750;
    color: #ffff00; /* Warm warning yellow */
    letter-spacing: 0.02em;
}

/* Hyperlink styled as a neural port gateway */
#wenyan p strong {
    font-family: "JetBrains Mono", monospace;
    font-weight: 750;
    color: #ffffff;
    background: rgba(189, 0, 255, 0.2);
    border: 1px solid rgba(189, 0, 255, 0.4);
    padding: 1px 5px;
    border-radius: 3px;
}

#wenyan p em {
    font-style: normal;
    color: #00ffcc;
    font-weight: 600;
}

/* Custom Synaptic Link Gateways */
#wenyan code {
    font-family: "Fira Code", "JetBrains Mono", monospace;
    background: #090e1f;
    color: #ffff00;
    border: 1px solid rgba(255, 255, 0, 0.25);
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 0.88em;
}

#wenyan pre {
    background: #010206;
    border: 1px solid rgba(0, 255, 204, 0.2);
    border-left: 3px solid #00ffcc;
    padding: 14px;
    border-radius: 8px;
    margin: 1.5em 0;
    overflow-x: auto;
}

#wenyan pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #00e5ff;
}

/* Neural Cognitive Quote Frame (Blockquote) */
#wenyan blockquote {
    background: rgba(189, 0, 255, 0.03);
    border: 1px solid rgba(189, 0, 255, 0.2);
    border-left: 4px solid #bd00ff;
    padding: 1.6em;
    border-radius: 6px;
    color: #e9d5ff;
    font-size: 0.95em;
    margin: 1.8em 0;
    position: relative;
}

#wenyan blockquote::before {
    content: "■ QUANTUM THOUGHT PROCESSOR ACTIVE";
    display: block;
    font-size: 8px;
    color: #bd00ff;
    font-family: monospace;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

/* Neo-Graph Matrix Lists (Table) */
#wenyan table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    margin: 2em 0;
    background: rgba(3, 6, 17, 0.85);
    border: 1px solid rgba(0, 255, 204, 0.2);
    border-radius: 8px;
    overflow: hidden;
}

#wenyan table th {
    background: rgba(0, 255, 204, 0.08);
    color: #00ffcc;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 14px;
    border-bottom: 1px solid rgba(0, 255, 204, 0.2);
}

#wenyan table td {
    padding: 12px 14px;
    font-size: 12.5px;
    color: #e2e8f0;
    border-bottom: 1px solid rgba(0, 255, 204, 0.06);
}

#wenyan table tr:last-child td {
    border-bottom: none;
}

#wenyan table tr:hover td {
    background: rgba(189, 0, 255, 0.08);
    color: #ffffff;
}

/* Neon synapse footnotes */
#wenyan #footnotes {
    margin-top: 4rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 255, 204, 0.2);
}

#wenyan .footnote-num {
    color: #00ffcc;
    font-weight: 800;
}

#wenyan .footnote-txt {
    color: #718096;
}
`;

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: "neural-pulse",
    name: "Neural Pulse ｜ 硅晶脉冲版",
    description: "自主智识与量子级联AI未来风格。液氮深蓝防静电极板衬底，荧光青、霓虹紫极光矩阵跑马灯极薄饰线，字里行间高光流淌，科技未来感满溢。",
    primaryColor: "#00ffcc",
    secondaryColor: "#cbd5e1",
    accentColor: "#bd00ff",
    bgColor: "#030611",
    fontFamily: "JetBrains Mono",
    css: NEURAL_PULSE_CSS
  },
  {
    id: "tactical-command",
    name: "Tactical Command ｜ 战术要塞版",
    description: "多维战略防备与电磁雷达对抗风格。深海潜艇网格衬底，荧光指令绿和警报红超高对比，营造绝对戒备高科技质感。",
    primaryColor: "#10b981",
    secondaryColor: "#a3b8cc",
    accentColor: "#ef4444",
    bgColor: "#0c0f16",
    fontFamily: "JetBrains Mono",
    css: TACTICAL_COMMAND_CSS
  },
  {
    id: "cyber-mind",
    name: "Cyber Mind ｜ 灵脑觉醒版",
    description: "AI人工智能核心与脑机意识风格。科幻荧蓝紫星空画卷，伴随电光品红渐变和炫光 synapses，文字如全息投影般亮丽饱满。",
    primaryColor: "#d946ef",
    secondaryColor: "#cbd5e1",
    accentColor: "#38bdf8",
    bgColor: "#050212",
    fontFamily: "Inter",
    css: CYBER_MIND_CSS
  },
  {
    id: "quantum-quant",
    name: "Quantum Quant ｜ 量子高频版",
    description: "华尔街与量化做市商终端。彭博碳黑背景，标志性金色大卡线，以及高反差阳线绿与高频精细数据段落。",
    primaryColor: "#eab308",
    secondaryColor: "#cbd5e1",
    accentColor: "#10b981",
    bgColor: "#0a0a0c",
    fontFamily: "JetBrains Mono",
    css: QUANTUM_QUANT_CSS
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark ｜ 雅致极夜版",
    description: "雅致的高级极暗阅读面镜，专为夜间深度阅读调配的冷蓝及深靛背景、高贵纯白和亮蓝标题，极为护眼与尊贵。",
    primaryColor: "#5b6cff",
    secondaryColor: "#ccd5e0",
    accentColor: "#8b5cf6",
    bgColor: "#0f111a",
    fontFamily: "PingFang SC",
    css: ELEGANT_DARK_CSS
  },
  {
    id: "golden-capital",
    name: "Golden Capital ｜ 沙金御研版",
    description: "经典华尔街与FT顶级研报感尊显，富有沙金底衬和庄严深沉的黑色、金黄色搭配。适合权威宏观解析。",
    primaryColor: "#bfa15f",
    secondaryColor: "#0b0f19",
    accentColor: "#c5a880",
    bgColor: "#fbfaf7",
    fontFamily: "Georgia",
    css: GOLDEN_CAPITAL_CSS
  },
  {
    id: "crystal-cyan",
    name: "Silicon Cyan ｜ 硅谷极光版",
    description: "纳斯达克科技股评级或创投备忘录风格，深色星空极夜蓝背景搭配科技荧光青、高频青兰。富有黑客极客美学。",
    primaryColor: "#64ffda",
    secondaryColor: "#f43f5e",
    accentColor: "#00b4d8",
    bgColor: "#0b111e",
    fontFamily: "Fira Code",
    css: CRYSTAL_CYAN_CSS
  },
  {
    id: "original",
    name: "Original ｜ 棱镜信号原版",
    description: "用户提供的 Prism Signal 1.0 版本原滋原味，采用优雅的钴蓝色调与干净的现代无衬线中文字型。",
    primaryColor: "#5b6cff",
    secondaryColor: "#111111",
    accentColor: "#5b6cff",
    bgColor: "#ffffff",
    fontFamily: "PingFang SC",
    css: ORIGINAL_CSS
  }
];

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: "macro-report",
    category: "Macro Outlook ｜ 宏观瞭望",
    author: "Prism Signal Quantitative Team",
    date: "2026-06-06",
    title: "芯片霸权与主权杠杆的奇点时刻",
    htmlContent: `<h1>芯片霸权与全球主权杠杆的<span>奇点时刻</span></h1>

<p>在2026年宏观周期的深水区，我们正在见证一场由 <strong>计算基建霸权</strong>(Compute Hegemony) 与 <strong>全球主权债务地平线</strong>(Sovereign Debt Horizon) 交织而成的范式裂变。当下的资本价格已不单单反映央行利率曲线，而是反映着该主权体获取顶尖制程数字算力的物理安全边际。</p>

<blockquote>
    全球宏观共识正在迅速重组。历史表明，每一次生产力媒介的重定义都会催生全新的债务清算范式。本次芯片战国时代本质上是主权信用对物理智能层面的加速套利。
</blockquote>

<p>根据彭博宏观研究部以及亚太经济研究实验室的最新数据显示，在过去的三十六个月内，<em>算力资本开支 (CAPEX ON AI COMPUTE)</em> 与 <em>外汇储备韧性 (FX Reserve Resiliency)</em> 呈现出了显著的正相关，相关系数高达 <code>0.865</code>。各大主权体正在全力以赴进行算力资产阶级化。</p>

<h2>▍ 硅基算力作为第二外汇储备的可能性</h2>

<p>在这一局势下，部分领先经济体甚至提出了将“物理高性能GPU集成模块”作为主权储备多元化的一环。逻辑非常简明：在去美元化(De-dollarization)浪潮的下半场，物理通胀资产优于传统的国债信用资产。顶尖AI计算芯片和高带宽显存 <code>HBM4</code> 展现出了极高的“硬商品代付性”。</p>

<h3>● 国别算力储备占外汇比重 (2024-2026)</h3>

<p>我们梳理了主要经济体储备构成中的“隐形算力本位资产”估值：</p>

<table>
    <thead>
        <tr>
            <th>经济体 / Sovereign</th>
            <th>物理H100/B200当量储备</th>
            <th>占GDP年开支比/GDP Ratio</th>
            <th>同比增幅/YoY Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>亚太特区经济圈 / APAC Tier-1</td>
            <td>1.45 Million Equivalent</td>
            <td>1.82%</td>
            <td>+145%</td>
        </tr>
        <tr>
            <td>波斯湾自留合作组织 / MENA Wealth</td>
            <td>0.98 Million Equivalent</td>
            <td>3.12%</td>
            <td>+210%</td>
        </tr>
        <tr>
            <td>数字欧罗巴信托 / Eurozone Tech Block</td>
            <td>0.42 Million Equivalent</td>
            <td>0.54%</td>
            <td>+38%</td>
        </tr>
    </tbody>
</table>

<p>根据这一指标，数字亚太特区显然已经在前瞻储备策略中领跑，其高带宽半导体存货占GDP百分比遥遥领先其他对手。而在海湾石油主权资本中，这一增幅由于高流动性原油美元的即时套现而录得最快的同比暴增，达到了前所未有的 <em>+210%</em> 。</p>

<h2>▍ 主权息差与量化终端反应</h2>

<p>我们从前线量化研究终端 <a href="https://ais-dev-z45bostpprrtdhzk3g7hov-362738392677.asia-northeast1.run.app" target="_blank">PRISM PORTAL</a> 调阅了最新的系统资产定价模型快照，以下是针对全球前三大主权主权券溢价和算力相关衍生契约进行的多因子回归分析结果：</p>

<pre><code>[PRISM QUANT RUN] Portfolio Optimization Output (Ref: v1.026)
-----------------------------------------------------------
COEFFICIENT     ESTIMATE       STD.ERROR     T-STAT    P-VALUE
Intercept       0.04122        0.0122        3.38      0.0012
Beta_SemiCon    0.68412        0.0415        16.48     &lt; 0.0001 ***
Beta_Sovereign -0.32145        0.0894        -3.59     0.0004
-----------------------------------------------------------
R-Squared: 0.74241 | Adjusted R-Squared: 0.73918 | F-Stat: 214.2
Risk Premium Target: HBM High-Bandwidth Spread (10Y Gov)
*** Denotes statistical significance at the 0.01% level.</code></pre>

<p>分析表明，<code>Beta_SemiCon</code> (半导体资本贝塔)的估计值极为强劲，达到了惊人的 <code>0.684</code>，这验证了算力周期对于主权债券违约信用掉期 (CDS) 的强大挟制力。</p>

<hr />

<h2>▍ 结论：深水区下的避险法则</h2>

<p>主权信贷在算力通胀面前正在退潮。对于全球私人理财和家办套期保值策略，经典的 60/40 股债组合需要重整。投资者必须配置具备“物理智能产能”的实物代付代币资产。未来的全球支付不再取决于黄金，而取决于 <em>每秒浮点运算力 (PFLOPS)</em> 的底层交付度。</p>

<div id="footnotes">
    <p>
        <span class="footnote-num">[1]</span>
        <span class="footnote-txt">Prism Signal Research (2026), "Compute as a Sovereign Collateral Layer," Global Macro Monographs, Vol. 42.</span>
    </p>
    <p>
        <span class="footnote-num">[2]</span>
        <span class="footnote-txt">国际半导体储蓄互助组织 (ISMA) 年报，关于流动性抵押及实物交割框架协议的补充声明。</span>
    </p>
</div>`
  },
  {
    id: "crypto-yield",
    category: "Crypto Paradigms ｜ 加密流动性",
    author: "Prism Digital Asset Desk",
    date: "2026-05-18",
    title: "以太流动性级联与宏观期限溢价波动",
    htmlContent: `<h1>以太级联流动性与<span>宏观期限溢价</span></h1>

<p>去中心化流动性协议已成为新时期的超流资产媒介。在这里，传统金融市场的<strong>期限结构</strong> (Term Structure) 与智能合约链上的 <strong>权益证明质押收益率</strong> (Staking Yield Loop) 彻底实现交叉对撞。这一重塑催生了我们称之为“以太流动性级联”的全新链上信用模型。</p>

<blockquote>
    信贷不是银行的专属，而在链上以秒为单位闪电借贷。每一个Staking衍生契约 (Liquid Staking Tokens) 本质上都是一张可流动的长债凭证。
</blockquote>

<p>根据当前的以太坊信标链参数，全网活跃验证者已突破 120 万。当全网权益抵押率突破 <code>28.4%</code>，以太坊原生收益率将历史性地跌破 <code>2.8%</code> 的名义安全关口，而与此同时，传统主权公债的真实防御收益率仍维持在 <code>4.2%</code> 附近。</p>

<h2>▍ 衍生权益代号 <code>LST</code> 波动深度</h2>

<p>各大聚合衍生协议(Lido, RocketPool, EigenLayer)在期限溢价错配时，容易在极端行情面临极速挤兑。这一现象对定量金融建模带来了极其丰富的链上回撤因子。</p>

<h3>● 顶级质押池对标美债收益率利差</h3>

<table>
    <thead>
        <tr>
            <th>协议流动代币 / Asset Symbol</th>
            <th>当前APR / Live Yield</th>
            <th>相对美债基准利差 / Spread vs UST</th>
            <th>资产负债比 / LTV Threshold</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>wstETH / Lido Trust</td>
            <td>3.15%</td>
            <td>-105 bps</td>
            <td>85.0%</td>
        </tr>
        <tr>
            <td>rETH / Rocket Pool</td>
            <td>3.42%</td>
            <td>-78 bps</td>
            <td>82.5%</td>
        </tr>
        <tr>
            <td>ezETH / Renzo Matrix</td>
            <td>4.88%</td>
            <td>+68 bps</td>
            <td>75.0%</td>
        </tr>
    </tbody>
</table>

<p>我们观察到，带有额外主动权益证明重构 (Restaking Yield) 的资产 <code>ezETH</code> 展现出了高于国家债券基准的收益，但这部分溢价本质上是由其高频验证罚没风险(Slashing Risk)和多次抵押杠杆所提供的流动性承担代价。</p>

<h2>▍ 实测 EigenLayer 罚没机制清算回测</h2>

<p>我们通过智能网络模拟了在网络高频拥堵、多点共识验证离线下的重质押资金清算概率矩阵：</p>

<pre><code>[LIQUIDITY CRASH EMULATOR V2]
RUN DATE: 2026-05-15 UTC
========================================
VALIDATOR SAMPLE SIZE : 50,000 Nodes
STAKE VOLUME          : 1.6M ETH
DEVIATION THRESHOLD   : > 12.4% Gas Spike
----------------------------------------
TIME (SEC)   DE-PEG RATIO   LIQ COUNT   VOL (ETH)
00.00s       1.0000         0           -
08.00s       0.9854[CRITICAL] 5         12,005
16.00s       0.9542[COLLAPSE] 47        185,410
32.00s       0.9120[ARBITRAGE] 124      540,290
----------------------------------------
System State: Saturated Liquified Cascading</code></pre>

<p>上述量化结果警示，在重度网络风暴下，资产重构将面临前所未有的阶梯清算，资产托管方必须通过高频期权工具对极端事件进行对冲。</p>

<div id="footnotes">
    <p>
        <span class="footnote-num">[1]</span>
        <span class="footnote-txt">Prism Digital Asset Team (2026), "Ethereum Restaking and Systemic Fragility," Decentralized Finance Review, Issue 8.</span>
    </p>
    <p>
        <span class="footnote-num">[2]</span>
        <span class="footnote-txt">EigenLayer Yellowpaper Addendum A: Quadratic Penalties under Slashing Scenarios.</span>
    </p>
</div>`
  },
  {
    id: "military-briefing",
    category: "Tactical Defense ｜ 战术要塞",
    author: "Special Operations Cryptography Office",
    date: "2026-06-06",
    title: "空中信息走廊与数字防线对抗态势",
    htmlContent: `<h1>物理防区空天一体化<span>电磁阻断与数字防线</span></h1>

<p>根据空天防御研究所 (Aerospace Defence Trust) 与前哨电子作战实验室于2026年第二季度的联合机密态势纪要：在数字生存主权争夺深水区，<strong>太空近轨极化星座</strong> (Orbital Megaconstellation) 及 <strong>量子跳频电磁对抗</strong> (Quantum Frequency-Hopping ECM) 正在彻底重塑传统边疆物理安全阈值。当前的多址链路安全度，核心取决于高能态抗干扰信息发射走廊之 <em>有效接收增益分贝 (Antenna Gain dB)</em>。</p>

<blockquote>
    数字壁垒的铸造已不再是单纯修筑防火墙，而是利用高功率固态卫星射频放大器 (SSPA) 对星地全频段遥测遥感信号实施秒级战术遮断。任何丧失全空域微波抗干扰的节点，将在战略对冲博弈开启的 <code>180</code> 秒内，完全坠入本位信息黑洞。
</blockquote>

<p>战略防务研究署以及红外光电雷达感知部最新披露的分析图表表明：<em>电磁压制有用带宽 (Suppressing Bandwidth)</em> 与 <em>多域防御冗余配置 (Defense Redundancy Ratio)</em> 呈现高度反向衰减特征。因此，各大防务节点已经全面启动临时移动光纤战术骨干网的“双频宽温容灾式复联”。</p>

<h2>▍ 轨道卫星战术高频直通链路传输参数</h2>

<p>我们测算了主要战区在强对撞电磁干扰干扰状态下，全极化转发天线的实战级吞吐量指数：</p>

<table>
    <thead>
        <tr>
            <th>战区标识 / Sector Code</th>
            <th>轨道卫星节点 / Nodes</th>
            <th>瞬时抗扰接收速率 / Max Link</th>
            <th>有效静默抗扰能力 / Anti-Jamming</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>亚太战区 T1 / APAC-T1-E</td>
            <td>480 Core Satellites</td>
            <td>1.25 Pbps Equivalent</td>
            <td>94.5 dB (CLASS-4)</td>
        </tr>
        <tr>
            <td>极圈高纬度基地 / Arctic Outer-Base</td>
            <td>240 Core Satellites</td>
            <td>0.62 Pbps Equivalent</td>
            <td>110.2 dB (CLASS-5)</td>
        </tr>
        <tr>
            <td>欧陆核心枢纽 / Brussels Corridor</td>
            <td>180 Core Satellites</td>
            <td>0.45 Pbps Equivalent</td>
            <td>72.8 dB (CLASS-2)</td>
        </tr>
    </tbody>
</table>

<p>在超视距强抗干扰演习评估下，由于极圈高纬度基地的综合冗余电平高达 <code>+110.2 dB</code>，使其具备了极好的物理气动穿透与对流层穿袭电涌免疫能力。在模拟发生高能空爆电磁脉冲 (EMP) 重击后，其分布式超短波自组网络仍能于 <em>12秒</em> 内进行全极化自愈式自动拓扑组网。</p>

<h2>▍ 雷达终端射频多路径衰落干扰试验</h2>

<p>我们从前线特区雷达信息汇总终端 <a href="https://ais-dev-z45bostpprrtdhzk3g7hov-362738392677.asia-northeast1.run.app" target="_blank">PRISM TACTICAL MONITOR</a> 调阅了最新的多极偏振天线信号衰减系数演算快照：</p>

<pre><code>[SYS_TACTICAL_CALC] Polar Electromagnetic Decelerator Run
===========================================================
RADAR BANDWIDTH : Ka-Band &amp; Ku-Band Multiplex
INTERFERENCE    : Active Dual-Tone Spot Jamming (120kW)
COEFFICIENT     ESTIMATE       STD.ERROR     P-VALUE
-----------------------------------------------------------
ECM_Power       0.84152        0.0210        &lt; 0.0001 [CRITICAL]
Rain_Fade       0.21042        0.0512        0.0018 [MODERATE]
Multi_Path      0.11542        0.0815        0.1140 [STABLE]
===========================================================
Scrambler Entropy: 9.852 bits (Decryption Difficulty: Tier-1)
System Health: Green [ALL TELEMETRY PASS INTERCEPT TEST]</code></pre>

<p>回归分析显示，<code>ECM_Power</code> (主动电子对抗功率) 的主效应系数高度显著，高达 <code>0.841</code>，这也直接指明了未来主力战舰与装甲车必须要配置自适应空域波束整形阵列。</p>

<h2>▍ 研判：真空量子防务的坚硬未来</h2>

<p>空天数字防御主权在超高功率电场与多目标指示雷达面前，代表的是物理上每一毫瓦的高增益优势。对于未来的防务供应链和家办避险模型，评估资产的实物抗风险底牌，除传统的地缘配置外，也应当考虑加入 <em>物理真空紫外波段激光量子通讯通道 (VUV Quantum Link)</em> 的自主代付与高保密性指标权属。</p>

<div id="footnotes">
    <p>
        <span class="footnote-num">[1]</span>
        <span class="footnote-txt">Special Operations Defence Group (2026), "Electromagnetic Horizon Dominance over High-Frequency Battlefields," Journal of Tactical Telecommunication, Paper 94.</span>
    </p>
    <p>
        <span class="footnote-num">[2]</span>
        <span class="footnote-txt">防区信息遮蔽与跳频雷达频谱分配协议补充附录 (机密解密 2026)。</span>
    </p>
</div>`
  }
];
