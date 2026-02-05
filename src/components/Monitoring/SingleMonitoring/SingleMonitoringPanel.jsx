import React from 'react'
import './SingleMonitoringPanel.css'
import { useBattery } from '../../../context/BatteryContext'

const SingleMonitoringPanel = () => {
    const { selectedAnalysis, setSelectedAnalysis } = useBattery()

    const monitoringData = {
        electrical: [
            { name: 'Voltage Profile', value: 'V' },
            { name: 'Current Profile', value: 'I' },
            { name: 'Internal Resistance', value: 'R' }
        ],
        health: [
            { name: 'State of Health (SOH)', value: '' },
            { name: 'Capacity Fade', value: '' },
            { name: 'Degradation Rate', value: '' }
        ],
        thermal: [
            { name: 'Temperature Trend', value: '' },
            { name: 'Thermal Stability Map', value: '' }
        ],
        life: [
            { name: 'Cycle Life Summary', value: '' },
            { name: 'Remaining Useful Life (RUL)', value: '' }
        ]
    }

    return (
        <div className="single-monitoring-panel">
            <div className="panel-header">
                <div className="header-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <h2>Li-ion Battery</h2>
            </div>

            <div className="monitoring-sections">
                {/* Electrical Monitoring */}
                <div className="monitoring-section">
                    <h3 className="section-title">ELECTRICAL MONITORING</h3>
                    <div className="monitoring-items">
                        {monitoringData.electrical.map((item, index) => (
                            <button
                                key={index}
                                className={`monitoring-item ${selectedAnalysis === item.name ? 'active' : ''}`}
                                onClick={() => setSelectedAnalysis(item.name)}
                            >
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
                                className={`monitoring-item ${selectedAnalysis === item.name ? 'active' : ''}`}
                                onClick={() => setSelectedAnalysis(item.name)}
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
                            <button
                                key={index}
                                className={`monitoring-item ${selectedAnalysis === item.name ? 'active' : ''}`}
                                onClick={() => setSelectedAnalysis(item.name)}
                            >
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
                            <button
                                key={index}
                                className={`monitoring-item ${selectedAnalysis === item.name ? 'active' : ''}`}
                                onClick={() => setSelectedAnalysis(item.name)}
                            >
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
