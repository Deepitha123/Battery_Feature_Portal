import React, { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useBattery } from '../../../context/BatteryContext'
import './FeatureVisualization.css'

const FeatureVisualization = () => {
    const { selectedBatteryId, selectedChemistry, monitoringStatus } = useBattery()
    const [chartData, setChartData] = useState([])

    // Mock data generator based on selected battery
    useEffect(() => {
        // Generate slightly different data based on the battery ID to simulate uniqueness
        const baseValue = selectedBatteryId.includes('182') ? 3.2 :
            selectedBatteryId.includes('183') ? 3.1 :
                selectedBatteryId.includes('184') ? 3.3 : 3.15

        const newData = Array.from({ length: 9 }).map((_, i) => ({
            x: i * 10,
            y1: Number((baseValue + (i * 0.04) + (Math.random() * 0.05)).toFixed(2)),
            y2: Number((baseValue - 0.1 + (i * 0.04) + (Math.random() * 0.05)).toFixed(2))
        }))

        setChartData(newData)

        // Simulate live updates
        if (monitoringStatus === 'MONITORING LIVE') {
            const interval = setInterval(() => {
                setChartData(prev => {
                    const next = [...prev]
                    next.shift()
                    const lastX = next[next.length - 1].x
                    const lastY1 = next[next.length - 1].y1
                    const lastY2 = next[next.length - 1].y2

                    next.push({
                        x: lastX + 10,
                        y1: Number((lastY1 + (Math.random() * 0.1 - 0.04)).toFixed(2)),
                        y2: Number((lastY2 + (Math.random() * 0.1 - 0.04)).toFixed(2))
                    })

                    return next
                })
            }, 3000)

            return () => clearInterval(interval)
        }
    }, [selectedBatteryId, monitoringStatus])

    return (
        <div className="feature-visualization">
            <div className="visualization-header">
                <div className="header-left">
                    <div className="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 17L7 9L11 13L17 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="7" cy="9" r="2" fill="currentColor" />
                            <circle cx="11" cy="13" r="2" fill="currentColor" />
                        </svg>
                    </div>
                    <div>
                        <h2>Feature Logic & Visualization</h2>
                        <p className="subtitle">Single Unit Telemetry ({selectedBatteryId})</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="action-btn" title="Download">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 13V14C3 15.1046 3.89543 16 5 16H13C14.1046 16 15 15.1046 15 14V13M9 3V12M9 12L6 9M9 12L12 9"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="action-btn" title="Search">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button className="action-btn" title="Fullscreen">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 7V3H7M11 3H15V7M15 11V15H11M7 15H3V11"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorY1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorY2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00C9A7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                            <XAxis
                                dataKey="x"
                                stroke="#6B7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6B7280"
                                style={{ fontSize: '12px' }}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-bg-light)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="y1"
                                stroke="#0066FF"
                                strokeWidth={2}
                                fill="url(#colorY1)"
                                animationDuration={500}
                            />
                            <Area
                                type="monotone"
                                dataKey="y2"
                                stroke="#00C9A7"
                                strokeWidth={2}
                                fill="url(#colorY2)"
                                animationDuration={500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="analytics-section">
                <h3>Single Unit Core Analytics</h3>
                <p className="analytics-description">
                    Displaying high-fidelity feature extraction for electrochemical profiles.
                    Analysis includes real-time voltage relaxation curves, incremental capacity
                    analysis (ICA), and thermal gradient modeling specific to the {selectedChemistry} cell architecture.
                </p>
            </div>

            <div className="status-bar">
                <div className="status-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="status-label">STATUS:</span>
                    <span className="status-value">Viewing high-resolution telemetry for <strong>{selectedBatteryId}</strong></span>
                </div>
                <div className="status-item">
                    <span className="status-label">Data sampled at 1Hz from the BMS core.</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Export features enabled for CSV and JSON formats.</span>
                </div>
                <div className="status-item warning">
                    <span className="status-label">Hybrid analytics and system-level power split controls are inactive in this view.</span>
                </div>
            </div>
        </div>
    )
}

export default FeatureVisualization
