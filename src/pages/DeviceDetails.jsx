import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Droplets, Sun, Clock, ToggleLeft, ToggleRight } from 'lucide-react'
import { useState } from 'react'

const mockDevice = {
  id: '1',
  nickname: 'Lily',
  plantType: 'Sweet Basil',
  growthDay: 12,
  waterLevel: 'NORMAL',
  lightIntensity: 850,
  mode: 'smart',
  customLightStart: '08:00',
  customLightEnd: '22:00',
  customPumpInterval: 30,
}

function getDevice(id) {
  void id
  return mockDevice
}

export default function DeviceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const device = getDevice(id)
  const [mode, setMode] = useState(device.mode)
  const [lightStart, setLightStart] = useState(device.customLightStart)
  const [lightEnd, setLightEnd] = useState(device.customLightEnd)
  const [pumpInterval, setPumpInterval] = useState(device.customPumpInterval)

  const isCustom = mode === 'custom'

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="device-hero">
        <div className="device-animation">
          <div className={`plant-pot ${device.waterLevel === 'LOW' ? 'dry' : ''}`}>
            <span className="plant-emoji">🪴</span>
            <div className="water-indicator" />
          </div>
        </div>
        <h1>{device.nickname}</h1>
        <p className="device-subtitle">{device.plantType} &middot; Day {device.growthDay}</p>
      </div>

      <div className="telemetry-section">
        <h2 className="section-title">Real-time Telemetry</h2>
        <div className="telemetry-grid">
          <div className="telemetry-card">
            <Droplets size={24} className="telemetry-icon water" />
            <span className="telemetry-value">{device.waterLevel}</span>
            <span className="telemetry-label">Water Level</span>
          </div>
          <div className="telemetry-card">
            <Sun size={24} className="telemetry-icon light" />
            <span className="telemetry-value">{device.lightIntensity}</span>
            <span className="telemetry-label">Lux</span>
          </div>
          <div className="telemetry-card">
            <Clock size={24} className="telemetry-icon" />
            <span className="telemetry-value">Day {device.growthDay}</span>
            <span className="telemetry-label">Growth</span>
          </div>
        </div>
      </div>

      <div className="control-section">
        <div className="mode-toggle">
          <span className="mode-label">Control Mode</span>
          <button
            className={`toggle-button ${isCustom ? 'active' : ''}`}
            onClick={() => setMode(isCustom ? 'smart' : 'custom')}
          >
            {isCustom ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            <span>{isCustom ? '🎛️ Custom Mode' : '🤖 Smart Mode'}</span>
          </button>
        </div>

        {isCustom ? (
          <div className="custom-controls">
            <div className="control-group">
              <label className="control-label">Grow-Light Schedule</label>
              <div className="time-range">
                <input type="time" value={lightStart} onChange={(e) => setLightStart(e.target.value)} />
                <span>to</span>
                <input type="time" value={lightEnd} onChange={(e) => setLightEnd(e.target.value)} />
              </div>
            </div>

            <div className="control-group">
              <label className="control-label">Water Pump Interval</label>
              <div className="pump-control">
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={pumpInterval}
                  onChange={(e) => setPumpInterval(Number(e.target.value))}
                />
                <span>{pumpInterval} min</span>
              </div>
            </div>

            <button className="save-button">Save Settings</button>
          </div>
        ) : (
          <div className="smart-info">
            <p>ESP32 Autopilot is managing your device based on {device.plantType} growth parameters. Toggle to Custom Mode to adjust settings manually.</p>
          </div>
        )}
      </div>
    </div>
  )
}
