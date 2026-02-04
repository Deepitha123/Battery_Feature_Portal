import React from 'react'
import HybridMonitoringPanel from '../../components/Monitoring/HybridMonitoring/HybridMonitoringPanel'
import FeatureVisualization from '../../components/Visualization/FeatureVisualization/FeatureVisualization'
import '../CoreTechnology/CoreTechnology.css'

const HybridBattery = () => {
    return (
        <div className="core-technology-page">
            <div className="page-layout">
                <HybridMonitoringPanel />
                <FeatureVisualization />
            </div>
        </div>
    )
}

export default HybridBattery
