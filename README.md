# 🔋 Battery Feature Portal

A high-fidelity monitoring and analytics dashboard for battery health, built with **React (Vite)** and **FastAPI**. This portal provides deep engineering insights into battery performance across its entire lifecycle.

## 🚀 Key Features

### 1. Electrical Monitoring
*   **Voltage Profile**: Real-time telemetry visualization with automated limit violation detection (V_MAX/V_MIN).
*   **Current & C-Rate**: Dynamic current tracking and automatic C-Rate calculation based on nominal capacity.
*   **Internal Resistance (DCIR)**: Advanced trend analysis using a robust DCIR fallback algorithm (ΔV/ΔI) to track aging even when raw IR data is missing.

### 2. Health & Aging
*   **State of Health (SOH)**: Industry-standard health scoring based on discharge capacity normalization.
*   **EOL Prediction**: Automatic detection of End-of-Life (80%) thresholds with explicit cycle marking.
*   **Health Status Classification**: Real-time binning into *Healthy*, *Warning*, and *Critical* states based on degradation trends.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Recharts (Data Visualization), CSS3 (Modern Glassmorphism Design).
*   **Backend**: FastAPI (Python), NumPy (Data Processing), Pickle (Data Interchange).
*   **Data Source**: High-frequency `.pkl` battery telemetry files.

## ⚙️ Setup & Installation

### Backend Setup (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn numpy pandas
   ```
4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup (React)
1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 Engineering Methodology
The portal uses advanced data processing techniques:
*   **Extrema-Preserving Downsampling**: Ensures peaks and spikes are never lost in visualization while maintaining UI performance.
*   **Natural Numeric Sorting**: Correctly maps cycle indices across disparate data formats (List vs Dict).
*   **Medial Filtering**: Used in DCIR calculations to filter out sensor noise and physical outliers.

---
*Developed for advanced battery lifecycle monitoring and diagnostics.*
