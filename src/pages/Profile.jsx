import { useState } from 'react'
import { User, Wifi, Bell, BellOff, Settings, LogOut } from 'lucide-react'

export default function Profile() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="page-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={40} />
        </div>
        <h2>Hydro Master</h2>
        <p className="profile-email">hydro.master@example.com</p>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Account Settings</h3>
        <div className="settings-list">
          <div className="settings-item">
            <User size={20} />
            <span>Edit Profile</span>
          </div>
          <div className="settings-item">
            <Settings size={20} />
            <span>App Preferences</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Device Management</h3>
        <div className="settings-list">
          <div className="settings-item">
            <Wifi size={20} />
            <span>Add New Device</span>
            <span className="settings-hint">Register ESP32 by Chip ID</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Notifications</h3>
        <div className="settings-list">
          <div className="settings-item" onClick={() => setNotifications(!notifications)}>
            {notifications ? <Bell size={20} /> : <BellOff size={20} />}
            <span>Push Notifications</span>
            <span className={`settings-status ${notifications ? 'on' : 'off'}`}>
              {notifications ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-list">
          <div className="settings-item logout">
            <LogOut size={20} />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  )
}
