🏗️ BIM Planner – Floor Plan Design Tool (2D Prototype)
A modern, web-based Building Information Modeling (BIM) planner that lets users visually design and manipulate architectural floor plans. Built with React, TypeScript, and Spring Boot, this app is the foundation for a future 2D–3D BIM system inspired by tools like Autodesk Revit.

🚀 Features (MVP)
✅ Interactive 2D canvas for placing components (e.g., walls, beds, desks, chairs)
✅ Grid snapping, zooming, and panning support
✅ Component library sidebar with real icons (PNG)
✅ Rotate, delete, and inspect component details
✅ Realtime position updates synced to backend
✅ Dark mode design and clean UI
✅ RESTful API with Spring Boot for storing floor plan data
🖼️ Preview

🛠️ Technologies Used
Frontend
⚛️ React (Vite + TypeScript)
📦 CSS Modules
🖼️ PNG Icons for components
🔄 Axios for API requests
Backend
🧠 Java Spring Boot
🗃️ MySQL
🌐 REST API
📁 Folder Structure (Frontend)
src/
├── components/
│   └── Sidebar.tsx
├── pages/
│   └── FloorPlan.tsx
├── types/
│   └── PlacedComponent.ts
├── styles/
│   ├── sidebar.css
│   └── floorplan.css
└── App.tsx

📦 How to Run
Backend
cd bim-planner-backend
./mvnw spring-boot:run
Frontend
cd bim-planner-frontend
npm install
npm run dev
Navigate to: http://localhost:5173
ℹ️ Ensure the backend runs on http://localhost:8080

📌 Future Plan (Post-MVP)
Feature	Description
🧱 Parametric Walls	Edit wall height, thickness, and length
🏢 Multi-Floor Support	Add/edit per-floor architectural plans
🗂️ Component Catalog	Extend to include windows, doors, trees, furniture
🧠 Smart Suggestions	Recommend layout improvements using AI/ML
🔄 Import/Export	Save/load full plans in JSON or IFC format

📮 Why This Project?
This project was built to demonstrate my ability to:
Think in architectural systems
Model real-world building components
Design scalable frontend/backend structures
Extend a simple MVP into a BIM-capable tool

🎯 Goal: To contribute to AEC technology companies like Autodesk.
👋 Author
Marwan Soltan
🏗️ Ex-Architect turned Software Engineer
🇩🇪 Based in Germany
🌐 LinkedIn: https://www.linkedin.com/in/marwan-soltan/

✅ Next Steps
 Push this project to GitHub
 Deploy backend (e.g., Render, Railway)
 Deploy frontend (e.g., Netlify, Vercel)
 Include this in your application to Autodesk 🎯
