import { Sprout, Droplets, Sun, AlertTriangle } from 'lucide-react'

const mockDevices = [
  { id: '1', nickname: 'Lily', plantType: 'Sweet Basil', growthDay: 12, waterLevel: 'NORMAL', lightIntensity: 850, mode: 'smart' },
  { id: '2', nickname: 'Living Room Tower', plantType: 'Roman Lettuce', growthDay: 5, waterLevel: 'LOW', lightIntensity: 620, mode: 'smart' },
  { id: '3', nickname: 'Bedroom Pendant', plantType: 'Mint', growthDay: 18, waterLevel: 'NORMAL', lightIntensity: 420, mode: 'custom' },
]

function getGrowthStage(day) {
  if (day >= 14) return 'Harvest'
  if (day >= 7) return 'Growing'
  return 'Sprout'
}

function getGreeting(devices) {
  const alerts = devices.filter((d) => d.waterLevel === 'LOW')
  const nearHarvest = devices.filter((d) => d.growthDay >= 14)

  if (alerts.length > 0) {
    const names = alerts.map((d) => d.nickname).join(', ')
    return `Oh no, Master! ${names} ${alerts.length > 1 ? 'are' : 'is'} extremely thirsty and ${alerts.length > 1 ? 'need' : 'needs'} water immediately! Please refill the tank. 😰`
  }

  if (nearHarvest.length > 0 && devices.every((d) => d.waterLevel === 'NORMAL')) {
    const name = nearHarvest[0].nickname
    const plant = nearHarvest[0].plantType
    return `Hello Master! Today is a beautiful day. ${name} (${plant}) has been growing for ${nearHarvest[0].growthDay} days and is almost ready for harvest! 🌱`
  }

  return 'Hello Master! All your botanical babies are thriving. Have a wonderful day! 🌿'
}

export default function Dashboard() {
  const greeting = getGreeting(mockDevices)

  return (
    <div className="page-container">
      <div className="butler-header">
        <div className="butler-avatar">🤖</div>
        <div className="butler-bubble">{greeting}</div>
      </div>

      <h2 className="section-title">My Devices</h2>

      <div className="device-grid">
        {mockDevices.map((device) => {
          const isAlert = device.waterLevel === 'LOW'
          return (
            <div key={device.id} className={`device-card ${isAlert ? 'alert' : ''}`}>
              <div className="device-card-header">
                <h3 className="device-nickname">{device.nickname}</h3>
                <span className={`mode-badge ${device.mode}`}>
                  {device.mode === 'smart' ? '🤖 Smart' : '🎛️ Custom'}
                </span>
              </div>
              <div className="device-card-body">
                <div className="device-stat">
                  <Sprout size={18} />
                  <span>{device.plantType}</span>
                </div>
                <div className="device-stat">
                  <span className="growth-badge">{getGrowthStage(device.growthDay)}</span>
                  <span>Day {device.growthDay}</span>
                </div>
                <div className="device-stat">
                  <Sun size={18} />
                  <span>{device.lightIntensity} Lux</span>
                </div>
                <div className={`device-stat ${isAlert ? 'stat-alert' : ''}`}>
                  <Droplets size={18} className={isAlert ? 'icon-flash' : ''} />
                  <span>{device.waterLevel === 'LOW' ? 'LOW WATER!' : 'Normal'}</span>
                </div>
              </div>
              {isAlert && (
                <div className="device-alert-banner">
                  <AlertTriangle size={14} />
                  <span>Water level critical - Refill needed</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
