# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BigPrint.JS is a client-side React web app that tiles a large image across multiple sheets of paper for printing. Users upload an image, configure paper size/overlap/markers, and generate a multi-page PDF. All processing happens in the browser — there is no backend.

## Commands

- `yarn start` — Start Vite dev server
- `yarn build` — Production build (outputs to `dist/`)
- `yarn deploy` — Deploy to GitHub Pages via `gh-pages -d dist`

No test runner or linter is configured.

## Architecture

**Core pipeline:** Image upload → tiling calculation → canvas preview → PDF generation

- `tiler.js` — Pure function that computes sheet layout (how many sheets, offsets, total dimensions) given image dimensions, DPI, paper size, and overlap. Central to both preview and PDF generation.
- `pdfPreview.js` — Uses `jsPDF` to generate a multi-page PDF with the tiled image, overlap markers, and optional diagonal alignment grid. Embeds the result via `PDFObject`.
- `ImagePreview.jsx` — Canvas-based preview showing how sheets will tile over the image. One instance rendered per paper size (A4/A3, portrait/landscape).
- `MeasureModal.jsx` — Interactive tool for determining image DPI by measuring known distances on the image. Supports multiple measurement lines and averages them.
- `useImage.js` — Custom hook that loads an image from a blob URL.

**Key domain concepts:**
- All paper dimensions and overlap values are in millimeters
- DPI converts between image pixels and physical dimensions (pixels / DPI * 25.4 = mm)
- Overlap is the margin where adjacent sheets overlap for alignment when assembling
- Overlap markers (dashed/solid lines) and diagonal grid lines help align printed sheets

## Tech Stack

- React 18 with Vite (no TypeScript — uses JSDoc type annotations)
- jsPDF for PDF generation, PDFObject for embedding
- Deployed to GitHub Pages with base path `/bigprint-js`
