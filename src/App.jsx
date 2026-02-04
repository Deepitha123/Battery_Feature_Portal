import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { BatteryProvider } from './context/BatteryContext'
import MainLayout from './components/Layout/MainLayout'
import MarketIntelligence from './pages/MarketIntelligence/MarketIntelligence'
import CoreTechnology from './pages/CoreTechnology/CoreTechnology'
import HybridBattery from './pages/HybridBattery/HybridBattery'
import SiteOperations from './pages/SiteOperations/SiteOperations'
import ComplianceExport from './pages/ComplianceExport/ComplianceExport'
import SourcingIntel from './pages/SourcingIntel/SourcingIntel'
import CostControl from './pages/CostControl/CostControl'
import { NavigationProvider } from './context/NavigationContext'
import './App.css'

function App() {
    return (
        <ThemeProvider>
            <BatteryProvider>
                <NavigationProvider>
                    <Router>
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<CoreTechnology />} />
                                <Route path="/market-intelligence" element={<MarketIntelligence />} />
                                <Route path="/core-technology" element={<CoreTechnology />} />
                                <Route path="/hybrid-battery" element={<HybridBattery />} />
                                <Route path="/site-operations" element={<SiteOperations />} />
                                <Route path="/compliance-export" element={<ComplianceExport />} />
                                <Route path="/sourcing-intel" element={<SourcingIntel />} />
                                <Route path="/cost-control" element={<CostControl />} />
                            </Routes>
                        </MainLayout>
                    </Router>
                </NavigationProvider>
            </BatteryProvider>
        </ThemeProvider>
    )
}

export default App
