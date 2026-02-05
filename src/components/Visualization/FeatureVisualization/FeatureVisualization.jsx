import React, { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useBattery } from '../../../context/BatteryContext'
import './FeatureVisualization.css'

const FeatureVisualization = () => {
    const {
        selectedBatteryId,
        selectedChemistry,
        selectedAnalysis,
        selectedCycle,
        setSelectedCycle,
        analysisResult,
        fetchAnalysisData,
        isLoading,
        error
    } = useBattery()

    useEffect(() => {
        console.log(`FETCHING: ${selectedAnalysis} for ${selectedBatteryId} at cycle idx ${selectedCycle}`)
        fetchAnalysisData(selectedAnalysis, selectedBatteryId, selectedCycle)
    }, [selectedAnalysis, selectedBatteryId, selectedCycle, fetchAnalysisData])

    // Auto-adjust cycle if out of bounds (e.g. after switching battery)
    useEffect(() => {
        if (analysisResult?.total_cycles && selectedCycle >= analysisResult.total_cycles) {
            console.warn(`Cycle index ${selectedCycle} out of bounds for ${selectedBatteryId}. Resetting to ${analysisResult.total_cycles - 1}`)
            setSelectedCycle(Math.max(0, analysisResult.total_cycles - 1))
        }
    }, [analysisResult, selectedCycle, setSelectedCycle, selectedBatteryId])

    // Transform analysisResult for Recharts
    const chartData = React.useMemo(() => {
        if (!analysisResult) return []

        if (selectedAnalysis === 'Voltage Profile' && analysisResult.time && analysisResult.voltage) {
            return analysisResult.time.map((t, i) => ({
                x: t,
                y1: analysisResult.voltage[i]
            }))
        }

        if (selectedAnalysis === 'Current Profile' && analysisResult.time && analysisResult.current) {
            return analysisResult.time.map((t, i) => ({
                x: t,
                y1: analysisResult.current[i],
                y2: analysisResult.c_rate ? analysisResult.c_rate[i] : null
            }))
        }

        if (selectedAnalysis === 'Internal Resistance' && analysisResult.cycle && analysisResult.resistance) {
            return analysisResult.cycle.map((c, i) => ({
                x: c,
                y1: analysisResult.resistance[i]
            }))
        }

        if (selectedAnalysis === 'State of Health (SOH)' && analysisResult.cycle && analysisResult.soh) {
            return analysisResult.cycle.map((c, i) => ({
                x: c,
                y1: analysisResult.soh[i]
            }))
        }

        return []
    }, [analysisResult, selectedAnalysis])

    const getChartTitle = () => {
        if (selectedAnalysis === 'Voltage Profile') return 'Cell Voltage Profile (V)'
        if (selectedAnalysis === 'Current Profile') return 'Dynamic Current & C-Rate'
        if (selectedAnalysis === 'Internal Resistance') return 'Internal Resistance Trend (Ω)'
        if (selectedAnalysis === 'State of Health (SOH)') return 'State of Health Trends (SOH)'
        return 'Feature Logic & Visualization'
    }

    const getYLabel = () => {
        if (selectedAnalysis === 'Voltage Profile') return 'Voltage (V)'
        if (selectedAnalysis === 'Current Profile') return 'Current (A)'
        if (selectedAnalysis === 'Internal Resistance') return 'Resistance (Ω)'
        if (selectedAnalysis === 'State of Health (SOH)') return 'Health Index (%)'
        return 'Value'
    }

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
                        <h2>{getChartTitle()}</h2>
                        <p className="subtitle">
                            {['Internal Resistance', 'State of Health (SOH)'].includes(selectedAnalysis)
                                ? `Full Lifecycle Analysis (${selectedBatteryId})`
                                : `Cycle #${analysisResult?.cycle_number || selectedCycle + 1} Telemetry (${selectedBatteryId})`
                            }
                        </p>
                    </div>
                </div>
                <div className="header-actions">
                    {!['Internal Resistance', 'State of Health (SOH)'].includes(selectedAnalysis) && (
                        <div className="cycle-selector-container">
                            {analysisResult?.total_cycles && (
                                <span className="total-cycles-badge">
                                    {analysisResult.total_cycles} Cycles Detected
                                </span>
                            )}
                            <div className="cycle-selector">
                                <label>Cycle Number:</label>
                                <input
                                    type="number"
                                    value={selectedCycle + 1}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 1
                                        const maxCycle = analysisResult?.total_cycles || 1000
                                        setSelectedCycle(Math.min(maxCycle - 1, Math.max(0, val - 1)))
                                    }}
                                    min="1"
                                    max={analysisResult?.total_cycles || 1000}
                                />
                            </div>
                        </div>
                    )}
                    {isLoading && <span className="loading-spinner-small"></span>}
                    <button className="action-btn" title="Download">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 13V14C3 15.1046 3.89543 16 5 16H13C14.1046 16 15 15.1046 15 14V13M9 3V12M9 12L6 9M9 12L12 9"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="chart-container">
                {error ? (
                    <div className="chart-error">
                        <p>Error loading data: {error}</p>
                    </div>
                ) : (
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
                                    type="number"
                                    stroke="#6B7280"
                                    style={{ fontSize: '11px' }}
                                    domain={['auto', 'auto']}
                                    label={{
                                        value: ['Internal Resistance', 'State of Health (SOH)'].includes(selectedAnalysis) ? 'Cycle Number' : 'Time (s)',
                                        position: 'insideBottom',
                                        offset: -10,
                                        fontSize: 11
                                    }}
                                />
                                <YAxis
                                    stroke="#6B7280"
                                    style={{ fontSize: '11px' }}
                                    domain={['auto', 'auto']}
                                    label={{ value: getYLabel(), angle: -90, position: 'insideLeft', fontSize: 11 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                    formatter={(value, name) => [
                                        `${value.toFixed(2)} ${name.includes('Voltage') ? 'V' : name.includes('Current') ? 'A' : name.includes('Resistance') ? 'Ω' : name.includes('Health') ? '%' : ''}`,
                                        name
                                    ]}
                                />
                                {selectedAnalysis === 'State of Health (SOH)' && (
                                    <ReferenceLine
                                        y={80}
                                        stroke="#EF4444"
                                        strokeDasharray="5 5"
                                        label={{ value: 'EOL (80%)', position: 'insideTopRight', fill: '#EF4444', fontSize: 10 }}
                                    />
                                )}
                                <Area
                                    type="monotone"
                                    dataKey="y1"
                                    name={getYLabel()}
                                    stroke="#0066FF"
                                    strokeWidth={2}
                                    fill="url(#colorY1)"
                                    animationDuration={300}
                                />
                                {selectedAnalysis === 'Current Profile' && (
                                    <Area
                                        type="monotone"
                                        dataKey="y2"
                                        name="C-Rate"
                                        stroke="#00C9A7"
                                        strokeWidth={2}
                                        fill="url(#colorY2)"
                                        animationDuration={300}
                                    />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="analytics-section">
                <h3>Core Insights</h3>
                <div className="metrics-grid">
                    {selectedAnalysis === 'Voltage Profile' && (
                        <>
                            <div className="metric-card">
                                <span className="metric-label">V_MAX Limit</span>
                                <span className="metric-value">{analysisResult?.v_max}V</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">V_MIN Limit</span>
                                <span className="metric-value">{analysisResult?.v_min}V</span>
                            </div>
                            <div className="metric-card warning">
                                <span className="metric-label">Limit Violations</span>
                                <span className="metric-value">{analysisResult?.violations_count || 0}</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Avg. Charge Cap.</span>
                                <span className="metric-value">{analysisResult?.charge_capacity?.toFixed(3)} Ah</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Avg. Discharge Cap.</span>
                                <span className="metric-value">{analysisResult?.discharge_capacity?.toFixed(3)} Ah</span>
                            </div>
                        </>
                    )}
                    {selectedAnalysis === 'Current Profile' && (
                        <>
                            <div className="metric-card warning">
                                <span className="metric-label">Overcurrent Events</span>
                                <span className="metric-value">{analysisResult?.over_current_events || 0}</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Charge Capacity</span>
                                <span className="metric-value">{analysisResult?.charge_capacity?.toFixed(3)} Ah</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Discharge Capacity</span>
                                <span className="metric-value">{analysisResult?.discharge_capacity?.toFixed(3)} Ah</span>
                            </div>
                        </>
                    )}
                    {selectedAnalysis === 'Internal Resistance' && (
                        <div className="metric-card">
                            <span className="metric-label">Total Resistance Increase</span>
                            <span className="metric-value">{analysisResult?.increase_percent}%</span>
                        </div>
                    )}
                    {selectedAnalysis === 'State of Health (SOH)' && (
                        <>
                            <div className={`metric-card health-${analysisResult?.health_status?.toLowerCase()}`}>
                                <span className="metric-label">Current State of Health</span>
                                <span className="metric-value">{analysisResult?.current_soh}%</span>
                            </div>
                            <div className={`metric-card health-${analysisResult?.health_status?.toLowerCase()}`}>
                                <span className="metric-label">Health Status</span>
                                <span className="metric-value">
                                    {analysisResult?.health_status === 'Healthy' && 'Healthy 🟢'}
                                    {analysisResult?.health_status === 'Warning' && 'Warning 🟡'}
                                    {analysisResult?.health_status === 'Critical' && 'Critical 🔴'}
                                </span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Nominal Capacity</span>
                                <span className="metric-value">{analysisResult?.reference_capacity_Ah} Ah</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-label">Total Cycles Detect</span>
                                <span className="metric-value">{analysisResult?.cycle?.length}</span>
                            </div>
                            {analysisResult?.eol_cycle && (
                                <div className="metric-card warning">
                                    <span className="metric-label">EOL Reached At</span>
                                    <span className="metric-value">Cycle {analysisResult.eol_cycle}</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {analysisResult?.note && (
                <div className="analytics-section note-section">
                    <h3>💡 Engineering Insight</h3>
                    <p className="analytics-description">{analysisResult.note}</p>
                </div>
            )}

            <div className="status-bar">
                <div className="status-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="status-label">SERVER STATUS:</span>
                    <span className="status-value">
                        {isLoading ? 'FETCHING DATA...' : 'LIVE CONNECTION ESTABLISHED'}
                    </span>
                </div>
                <div className="status-item">
                    <span className="status-label">Showing high-fidelity {selectedAnalysis.toLowerCase()} data for {selectedChemistry} cell.</span>
                </div>
            </div>
        </div>
    )
}

export default FeatureVisualization
