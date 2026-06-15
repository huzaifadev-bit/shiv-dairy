const fs = require('fs');
const path = require('path');

const srcLayout = `
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shiv Dairy - Premium Dairy & Daily Needs",
  description: "Fresh Dairy & Daily Needs Delivered Near You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {\`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "on-secondary-fixed-variant": "#004f58",
                    "on-primary-container": "#7684a1",
                    "tertiary-fixed-dim": "#c4c7c9",
                    "background": "#f8f9ff",
                    "on-tertiary-container": "#818486",
                    "outline-variant": "#c5c6ce",
                    "on-secondary-container": "#00616d",
                    "surface-container-high": "#dce9ff",
                    "primary-container": "#0d1b33",
                    "on-secondary": "#ffffff",
                    "surface-tint": "#515f7a",\n                    "surface-container-lowest": "#ffffff",\n                    "surface-container-low": "#eff4ff",\n                    "primary": "#000000",\n                    "secondary": "#006875",\n                    "surface-container-highest": "#d3e4fe",\n                    "surface-container": "#e5eeff",\n                    "surface-variant": "#d3e4fe",\n                    "surface-bright": "#f8f9ff",\n                    "tertiary": "#000000",\n                    "inverse-surface": "#213145",\n                    "on-background": "#0b1c30",\n                    "secondary-fixed": "#9cf0ff",\n                    "secondary-fixed-dim": "#00daf3",\n                    "error": "#ba1a1a",\n                    "on-tertiary-fixed-variant": "#444749",\n                    "inverse-on-surface": "#eaf1ff",\n                    "primary-fixed-dim": "#b9c7e6",\n                    "tertiary-fixed": "#e0e3e5",\n                    "on-primary": "#ffffff",\n                    "on-secondary-fixed": "#001f24",\n                    "surface-dim": "#cbdbf5",\n                    "on-primary-fixed-variant": "#394761",\n                    "on-tertiary": "#ffffff",\n                    "error-container": "#ffdad6",\n                    "primary-fixed": "#d7e2ff",\n                    "surface": "#f8f9ff",\n                    "on-surface-variant": "#44474d",\n                    "on-tertiary-fixed": "#191c1e",\n                    "outline": "#75777e",\n                    "on-surface": "#0b1c30",\n                    "on-error-container": "#93000a",\n                    "tertiary-container": "#191c1e",\n                    "on-error": "#ffffff",\n                    "on-primary-fixed": "#0d1b33",\n                    "secondary-container": "#00e3fd",\n                    "inverse-primary": "#b9c7e6"\n                  },\n                  borderRadius: {\n                    DEFAULT: "0.25rem",\n                    lg: "0.5rem",\n                    xl: "0.75rem",\n                    "2xl": "1rem",\n                    full: "9999px"\n                  },\n                  spacing: {\n                    base: "4px",\n                    "container-padding": "16px",\n                    "stack-sm": "8px",\n                    "stack-lg": "24px",\n                    "stack-md": "16px",\n                    gutter: "12px"\n                  },\n                  fontFamily: {\n                    "display-lg-mobile": ["Inter"],\n                    "label-sm": ["Inter"],\n                    "body-md": ["Inter"],\n                    "price-xl": ["Inter"],\n                    "headline-md": ["Inter"],\n                    "display-lg": ["Inter"]\n                  },\n                }\n              }\n            }\n          \`}\n        </Script>\n        <style>\n          {\`\n            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }\n            .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }\n            .product-shadow { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); }\n            .blue-glow:active { box-shadow: 0 0 15px rgba(0, 227, 253, 0.4); }\n            ::-webkit-scrollbar { height: 4px; }\n            ::-webkit-scrollbar-track { background: transparent; }\n            ::-webkit-scrollbar-thumb { background: #c5c6ce; border-radius: 10px; }\n          \\`}\n        </style>\n      </head>\n      <body className=\"bg-surface font-body-md text-on-surface selection:bg-secondary-container\">\n        {children}\n      </body>\n    </html>\n  );\n}\n`;\n\nfs.writeFileSync(path.join('src', 'app', 'layout.tsx'), srcLayout);\nfs.writeFileSync(path.join('src', 'app', 'globals.css'), ''); // clear default globals\n\nfunction convertHtmlToJsxBody(html) {\n  // Extract body content\n  const bodyMatch = html.match(/<body[^>]*>([\\s\\S]*?)<\\/body>/i);\n  let bodyContent = bodyMatch ? bodyMatch[1] : html;\n\n  // Simple JSX conversion\n  let jsx = bodyContent\n    .replace(/class=/g, 'className=')\n    .replace(/for=/g, 'htmlFor=')\n    .replace(/<img([^>]*?[^\\/])>/g, '<img$1 />')\n    .replace(/<input([^>]*?[^\\/])>/g, '<input$1 />')\n    .replace(/<br>/g, '<br />')\n    .replace(/<!--[\\s\\S]*?-->/g, '')\n    .replace(/style=\"([^\"]*)\"/g, (match, styleString) => {\n      if (styleString.includes('font-variation-settings')) {\n        return \\`style={{ fontVariationSettings: '\\${styleString.replace('font-variation-settings:', '').replace(';', '').trim()}' }}\\`;\n      }\n      return '';\n    });\n\n  return \\`\nexport default function Page() {\n  return (\n    <>\n      \\${jsx}\n    </>\n  );\n}\n\\`;\n}\n\nconst pages = {\n  'home': 'page.tsx',\n  'browse': 'browse/page.tsx',\n  'cart': 'cart/page.tsx',\n  'admin': 'admin/page.tsx'\n};\n\nObject.entries(pages).forEach(([name, outPath]) => {\n  const htmlPath = path.join('downloads', \\`\\${name}.html\\`);\n  if (fs.existsSync(htmlPath)) {\n    const html = fs.readFileSync(htmlPath, 'utf8');\n    const jsx = convertHtmlToJsxBody(html);\n    \n    const fullOutPath = path.join('src', 'app', outPath);\n    const dir = path.dirname(fullOutPath);\n    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });\n    \n    fs.writeFileSync(fullOutPath, jsx);\n    console.log(\\`Generated \\${fullOutPath}\\`);\n  }\n});\n