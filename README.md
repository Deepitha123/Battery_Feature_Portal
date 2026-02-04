# Feature Portal - Battery Brain

A modern, high-performance dashboard for battery monitoring, analytics, and feature visualization. This application serves as a portal for managing Single and Hybrid battery systems with advanced telemetry and predictive logic.

## 🚀 Key Features

### 🔋 Battery Intelligence
- **Single Battery Monitoring**: Detailed telemetry for Voltage, Current, Resistance, SOH, and Thermal behavior.
- **Hybrid Battery Analytics**: Specialized monitoring for optimal power split, degradation tracking, and efficiency optimization.
- **Feature Visualization**: Real-time, interactive charts displaying high-fidelity electrochemical profiles.

### 🎛️ Dynamic Interface
- **Context-Aware Navigation**: Sidebar features dynamically update the main dashboard content.
- **Smart Header**: Selector inputs (Chemistry, Battery ID, Pack ID) automatically adapt based on the active view.
- **Live Simulation**: "Battery Pack Brain" feature includes simulated real-time telemetry data.

### 🎨 Modern UX/UI
- **Responsive Design**: Adapts seamlessly to different screen sizes.
- **Theme Support**: Built-in Light/Dark mode with persistent preference.
- **Interactive Visuals**: Smooth transitions, gradients, and professional SVG iconography.

## 📁 Project Structure

```
Feature_Portal/
├── src/
│   ├── components/
│   │   ├── Layout/          # Main layout components (Header, Sidebar)
│   │   ├── Monitoring/      # Monitoring panels (Single & Hybrid)
│   │   └── Visualization/   # Feature visualization charts
│   ├── context/             # React Contexts (Battery, Theme, Navigation)
│   ├── pages/               # Page components
│   │   ├── CoreTechnology/  # Main dashboard view
│   │   ├── HybridBattery/   # Hybrid battery view
│   │   └── ...              # Placeholder pages for other features
│   ├── App.jsx              # Main app entry & routing
│   └── index.css            # Global styles & variables
├── public/                  # Static assets
└── package.json            # Dependencies & scripts
```

## 🛠️ Tech Stack

- **React 18**: Component-based UI architecture.
- **Vite**: Ultra-fast build tool and development server.
- **React Router 6**: Client-side routing for seamless navigation.
- **Recharts**: Composable charting library for data visualization.
- **Context API**: Global state management for Navigation, Battery Data, and Theme.
- **CSS3**: Modern styling with CSS Custom Properties (Variables) and Flexbox/Grid.

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Feature_Portal
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Navigate to `http://localhost:3000` in your browser.

## 📝 Usage Guide

- **Sidebar**: Navigate between main modules (Product, Operations, Supply Chain). All modules are expandable.
- **Battery Pack Brain**: The core feature containing the primary dashboard. Click it to view live analytics.
- **Status Indicators**: Watch the "MONITORING LIVE" badge and status bar for system health.
- **Theme Toggle**: Switch between Light/Dark mode using the button at the bottom of the sidebar.

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
