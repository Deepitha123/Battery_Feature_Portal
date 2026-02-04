import React from 'react'
import './HybridMonitoringPanel.css'

const HybridMonitoringPanel = () => {
    const monitoringData = [
        { name: 'Optimal Power Split', status: 'active' },
        { name: 'Degradation', status: 'normal' },
        { name: 'Efficiency', status: 'normal' }
    ]

    return (
        <div className="hybrid-monitoring-panel">
            <div className="panel-header">
                <div className="header-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L3 6V10C3 14.5 6 17.5 10 18C14 17.5 17 14.5 17 10V6L10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <h2>HYBRID BATTERY</h2>
            </div>

            <div className="monitoring-sections">
                <div className="monitoring-items">
                    {monitoringData.map((item, index) => (
                        <button
                            key={index}
                            className={`monitoring-item ${index === 0 ? 'highlighted' : ''}`}
                        >
                            <span className="item-name">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HybridMonitoringPanel
