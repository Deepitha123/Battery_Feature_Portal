import React from 'react'
import { useNavigation } from '../../context/NavigationContext'
import SingleMonitoringPanel from '../../components/Monitoring/SingleMonitoring/SingleMonitoringPanel'
import FeatureVisualization from '../../components/Visualization/FeatureVisualization/FeatureVisualization'
import './CoreTechnology.css'

const CoreTechnology = () => {
    const { activeSection } = useNavigation()

    if (activeSection !== 'Battery Pack Brain') {
        return (
            <div className="core-technology-page">
                <div className="content-placeholder">
                    <div className="placeholder-icon">🚧</div>
                    <h2>{activeSection}</h2>
                    <p>This feature is currently under development.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="core-technology-page">
            <div className="page-layout">
                <SingleMonitoringPanel />
                <FeatureVisualization />
            </div>
        </div>
    )
}

export default CoreTechnology
