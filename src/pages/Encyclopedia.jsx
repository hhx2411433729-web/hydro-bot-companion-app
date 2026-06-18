import { useState } from 'react'
import { Sprout, Sun, Droplets, Clock, Plus, X } from 'lucide-react'

const officialPlants = [
  { id: 'p1', name: 'Roman Lettuce', growthDays: 30, lightNeeds: 'Medium (600-800 Lux)', pumpFreq: '5 min / 30 min', icon: '🥬' },
  { id: 'p2', name: 'Sweet Basil', growthDays: 14, lightNeeds: 'High (800-1000 Lux)', pumpFreq: '5 min / 30 min', icon: '🌿' },
  { id: 'p3', name: 'Mint', growthDays: 20, lightNeeds: 'Medium (500-700 Lux)', pumpFreq: '5 min / 45 min', icon: '🍃' },
  { id: 'p4', name: 'Cherry Tomatoes', growthDays: 60, lightNeeds: 'High (900-1200 Lux)', pumpFreq: '10 min / 30 min', icon: '🍅' },
]

const mockDevices = [
  { id: '1', nickname: 'Lily' },
  { id: '2', nickname: 'Living Room Tower' },
  { id: '3', nickname: 'Bedroom Pendant' },
]

export default function Encyclopedia() {
  const [activeTab, setActiveTab] = useState('official')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [showBindModal, setShowBindModal] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState('')
  const [customPlants, setCustomPlants] = useState([])
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [customForm, setCustomForm] = useState({ name: '', growthDays: '', lightNeeds: '', pumpFreq: '' })

  function handleStartPlanting(plant) {
    setSelectedPlant(plant)
    setShowBindModal(true)
  }

  function handleBindConfirm() {
    setShowBindModal(false)
    setSelectedDevice('')
    setSelectedPlant(null)
  }

  function handleAddCustom() {
    if (!customForm.name || !customForm.growthDays) return
    setCustomPlants((prev) => [...prev, { ...customForm, id: 'c' + Date.now(), icon: '🌱' }])
    setCustomForm({ name: '', growthDays: '', lightNeeds: '', pumpFreq: '' })
    setShowAddCustom(false)
  }

  return (
    <div className="page-container">
      <h2 className="section-title">Botanical Encyclopedia</h2>

      <div className="tab-bar">
        <button className={`tab ${activeTab === 'official' ? 'active' : ''}`} onClick={() => setActiveTab('official')}>
          Official Plants
        </button>
        <button className={`tab ${activeTab === 'custom' ? 'active' : ''}`} onClick={() => setActiveTab('custom')}>
          My Custom Plants
        </button>
      </div>

      {activeTab === 'official' && (
        <div className="plant-grid">
          {officialPlants.map((plant) => (
            <div key={plant.id} className="plant-card" onClick={() => setSelectedPlant(plant)}>
              <span className="plant-icon">{plant.icon}</span>
              <h3>{plant.name}</h3>
              <div className="plant-meta">
                <span><Clock size={14} /> {plant.growthDays} days</span>
                <span><Sun size={14} /> {plant.lightNeeds}</span>
              </div>
              <button className="start-planting-btn" onClick={(e) => { e.stopPropagation(); handleStartPlanting(plant) }}>
                <Sprout size={16} /> Start Planting
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="plant-grid">
          {customPlants.map((plant) => (
            <div key={plant.id} className="plant-card">
              <span className="plant-icon">{plant.icon}</span>
              <h3>{plant.name}</h3>
              <div className="plant-meta">
                <span><Clock size={14} /> {plant.growthDays} days</span>
                <span><Sun size={14} /> {plant.lightNeeds}</span>
              </div>
              <button className="start-planting-btn" onClick={() => handleStartPlanting(plant)}>
                <Sprout size={16} /> Start Planting
              </button>
            </div>
          ))}
          <button className="plant-card add-card" onClick={() => setShowAddCustom(true)}>
            <Plus size={32} />
            <span>Add Custom Plant</span>
          </button>
        </div>
      )}

      {selectedPlant && !showBindModal && (
        <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPlant(null)}><X size={20} /></button>
            <span className="plant-icon large">{selectedPlant.icon}</span>
            <h2>{selectedPlant.name}</h2>
            <div className="modal-stats">
              <div className="modal-stat">
                <Clock size={18} />
                <span>Growth Cycle: {selectedPlant.growthDays} days</span>
              </div>
              <div className="modal-stat">
                <Sun size={18} />
                <span>Light: {selectedPlant.lightNeeds}</span>
              </div>
              <div className="modal-stat">
                <Droplets size={18} />
                <span>Pump: {selectedPlant.pumpFreq}</span>
              </div>
            </div>
            <button className="start-planting-btn primary" onClick={() => handleStartPlanting(selectedPlant)}>
              <Sprout size={16} /> Start Planting
            </button>
          </div>
        </div>
      )}

      {showBindModal && selectedPlant && (
        <div className="modal-overlay" onClick={() => setShowBindModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBindModal(false)}><X size={20} /></button>
            <h2>Bind to Hydro-Bot</h2>
            <p className="modal-desc">Select a device to bind "{selectedPlant.name}" to:</p>
            <div className="device-list">
              {mockDevices.map((d) => (
                <label key={d.id} className={`device-option ${selectedDevice === d.id ? 'selected' : ''}`}>
                  <input type="radio" name="device" value={d.id} checked={selectedDevice === d.id} onChange={(e) => setSelectedDevice(e.target.value)} />
                  <span>{d.nickname}</span>
                </label>
              ))}
            </div>
            <button className="start-planting-btn primary" disabled={!selectedDevice} onClick={handleBindConfirm}>
              Confirm & Start Day 1
            </button>
          </div>
        </div>
      )}

      {showAddCustom && (
        <div className="modal-overlay" onClick={() => setShowAddCustom(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddCustom(false)}><X size={20} /></button>
            <h2>Add Custom Plant</h2>
            <div className="custom-form">
              <input placeholder="Plant Name" value={customForm.name} onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })} />
              <input placeholder="Growth Cycle (Days)" type="number" value={customForm.growthDays} onChange={(e) => setCustomForm({ ...customForm, growthDays: e.target.value })} />
              <input placeholder="Light Requirements" value={customForm.lightNeeds} onChange={(e) => setCustomForm({ ...customForm, lightNeeds: e.target.value })} />
              <input placeholder="Pump Frequency" value={customForm.pumpFreq} onChange={(e) => setCustomForm({ ...customForm, pumpFreq: e.target.value })} />
              <button className="start-planting-btn primary" onClick={handleAddCustom}>Add Plant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
