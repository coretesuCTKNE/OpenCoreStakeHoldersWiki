# Quartz Site Setup

This is the stakeholder wiki content directory. The Quartz framework is loaded via npx from GitHub.

## Quick Start

```bash
cd site
npm install
npm run dev      # serve at localhost:8080
npm run build    # build to public/
```

## Full Setup (optional)

For the full Quartz experience with custom components:

```bash
# Clone Quartz v4 into site/quartz/
git clone --depth 1 https://github.com/jackyzha0/quartz.git quartz
cp quartz/quartz.config.ts quartz/quartz.layout.ts .
# Customize your copy
```
