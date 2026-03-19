👤 Author
Rohit Sanjay Patil

🚀 About
A futuristic, cyberpunk-themed 3D developer portfolio built with React and Three.js. Features a fully interactive Blender 3D dev room, a hologram avatar with custom GLSL shaders, animated starfields, and smooth scroll animations — all in a single-page React app.

✨ Features

3D Dev Room — Custom Blender scene exported as GLTF, with orbit controls and clickable hotspot annotations
Hologram Avatar — ReadyPlayer.me avatar rendered with a custom GLSL scanline + fresnel shader, rotating base rings and orbit particles
Cyberpunk UI — Neon cyan/magenta/gold color scheme, glowing cursor, futuristic typography (Orbitron, Share Tech Mono)
Smooth Animations — Framer Motion scroll-triggered fade-ins and card hovers throughout
2D Canvas Starfield — Animated star background with floating network nodes (zero WebGL, GPU-friendly)
CSS 3D Cube — Rotating skill cube built with pure CSS transforms
Clickable Project Links — All project cards link directly to GitHub repos and live demos
Color Switcher — Hologram color changes live between Cyan, Magenta, Gold and Green
Fully Responsive — Works on desktop and mobile


🛠️ Tech Stack
CategoryTechnologiesFrontendReact 19, Vite 8, TailwindCSS 33D / WebGLThree.js 0.169, @react-three/fiber 9, @react-three/drei 10AnimationsFramer Motion 123D ModelingBlender 4 (exported as GLB/GLTF)AvatarReadyPlayer.me → custom GLSL hologram shaderDeploymentVercel

📁 Project Structure
rohit-portfolio/
├── public/
│   ├── room.glb          # Blender 3D dev room model
│   └── avatar.glb        # ReadyPlayer.me hologram avatar
├── src/
│   ├── assets/
│   │   └── rohit.jpg     # Profile photo
│   ├── components/
│   │   ├── Scene3D.jsx   # Single shared WebGL canvas (room + hologram)
│   │   ├── HeroBg.jsx    # 2D canvas starfield + CSS cube
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Education.jsx
│   │   ├── Room.jsx
│   │   ├── HologramAvatar.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── projects.js   # All project + skill + education data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js

🏃 Getting Started
Prerequisites

Node.js 18+
npm or yarn

Installation
bash# Clone the repo
git clone https://github.com/MrRoy-0257/rohit-portfolio.git
cd rohit-portfolio

# Install dependencies
npm install

# Run dev server
npm run dev
Open http://localhost:5173 in your browser.
Build for Production
bashnpm run build
npm run preview

📦 Dependencies
json{
  "react": "^19.2.4",
  "three": "^0.169.0",
  "@react-three/fiber": "^9.1.2",
  "@react-three/drei": "^10.0.5",
  "framer-motion": "^12.0.0",
  "react-scroll": "^1.9.3"
}

🎯 Sections
SectionDescriptionHeroAnimated name reveal, contact links, CTA buttonsAboutPhoto, bio, stats, personal details, rotating CSS cubeProjects7 project cards with GitHub + live demo linksSkills6 skill groups with neon pill tagsEducation4 education cards + 2 certifications3D RoomInteractive Blender scene with hotspot annotationsHologramGLSL hologram avatar with color switcher and HUDContactLinks + contact form

🎨 Design System
TokenValuePrimary#00f5ff (Cyan)Secondary#ff00aa (Magenta)Accent#ffd700 (Gold)Success#00ff88 (Green)Background#020409Font — DisplayOrbitronFont — MonoShare Tech MonoFont — BodyRajdhani



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

📄 License
This project is open source and available under the MIT License.


<div align="center">
Built with ♥ & caffeine by Rohit Patil
⭐ Star this repo if you like it!
</div>