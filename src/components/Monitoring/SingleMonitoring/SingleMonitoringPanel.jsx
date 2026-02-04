import React from 'react'
import './SingleMonitoringPanel.css'

const SingleMonitoringPanel = () => {
    const monitoringData = {
        electrical: [
            { name: 'Voltage Profile', value: 'V', status: 'active' },
            { name: 'Current Profile', value: 'I', status: 'normal' },
            { name: 'Internal Resistance', value: 'R', status: 'normal' }
        ],
        health: [
            { name: 'State of Health (SOH)', value: '', status: 'good' },
            { name: 'Capacity Fade', value: '', status: 'normal' }
        ],
        thermal: [
            { name: 'Temperature Trend', value: '', status: 'normal' },
            { name: 'Thermal Stability Map', value: '', status: 'normal' }
        ],
        life: [
            { name: 'Remaining Cycle Life', value: '', status: 'normal' },
            { name: 'End-of-Life Forecast', value: '', status: 'normal' }
        ]
    }

    return (
        <div className="single-monitoring-panel">
            <div className="panel-header">
                <div className="header-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
                <h2>SINGLE MONITORING</h2>
            </div>

            <div className="monitoring-sections">
                {/* Electrical Monitoring */}
                <div className="monitoring-section">
                    <h3 className="section-title">ELECTRICAL MONITORING</h3>
                    <div className="monitoring-items">
                        {monitoringData.electrical.map((item, index) => (
                            <button key={index} className="monitoring-item">
                                <span className="item-name">{item.name}</span>
                                {item.value && <span className="item-value">{item.value}</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Health & Aging */}
                <div className="monitoring-section">
                    <h3 className="section-title">HEALTH & AGING</h3>
                    <div className="monitoring-items">
                        {monitoringData.health.map((item, index) => (
                            <button
                                key={index}
                                className={`monitoring-item ${item.name === 'State of Health (SOH)' ? 'highlighted' : ''}`}
                            >
                                <span className="item-name">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Thermal Behavior */}
                <div className="monitoring-section">
                    <h3 className="section-title">THERMAL BEHAVIOR</h3>
                    <div className="monitoring-items">
                        {monitoringData.thermal.map((item, index) => (
                            <button key={index} className="monitoring-item">
                                <span className="item-name">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Life Prediction */}
                <div className="monitoring-section">
                    <h3 className="section-title">LIFE PREDICTION</h3>
                    <div className="monitoring-items">
                        {monitoringData.life.map((item, index) => (
                            <button key={index} className="monitoring-item">
                                <span className="item-name">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleMonitoringPanel
