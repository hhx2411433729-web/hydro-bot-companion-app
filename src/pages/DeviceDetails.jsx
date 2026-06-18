import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  Droplets,
  Sun,
  Sprout,
  Clock,
  Zap,
  Settings2,
  Timer,
  Lightbulb,
} from 'lucide-react'
import { getDeviceById, getFixtureIcon, getGrowthStage, getGrowthPercent } from '../data/devices'

export default function DeviceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const baseDevice = getDeviceById(id)

  const [device, setDevice] = useState(baseDevice)
  const [lightStart, setLightStart] = useState(baseDevice.customLightStart)
  const [lightEnd, setLightEnd] = useState(baseDevice.customLightEnd)
  const [pumpInterval, setPumpInterval] = useState(baseDevice.customPumpInterval)

  if (!device) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-5xl">🔍</span>
          <h2 className="mt-4 text-lg font-semibold text-nordic-charcoal">Device Not Found</h2>
          <p className="text-sm text-nordic-slate mt-1">The device you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2.5 bg-nordic-moss text-white rounded-full text-sm font-semibold hover:bg-nordic-moss/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const isCustom = device.mode === 'custom'
  const isAlert = device.waterLevel === 'LOW'
  const stage = getGrowthStage(device.growthDays)
  const growthPct = getGrowthPercent(device.growthDays)

  function handleModeToggle() {
    setDevice((prev) => ({
      ...prev,
      mode: prev.mode === 'smart' ? 'custom' : 'smart',
    }))
  }

  function handleSave() {
    setDevice((prev) => ({
      ...prev,
      customLightStart: lightStart,
      customLightEnd: lightEnd,
      customPumpInterval: pumpInterval,
    }))
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-nordic-slate hover:text-nordic-charcoal transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium">Dashboard</span>
      </button>

      {/* Device Hero */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div
            className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg transition-all duration-500 ${
              isAlert
                ? 'bg-alert-rose animate-pulse-alert'
                : 'bg-gradient-to-br from-nordic-sand to-nordic-cream'
            }`}
          >
            <span className={isAlert ? 'animate-float' : 'animate-float'}>
              {getFixtureIcon(device.fixtureType)}
            </span>
          </div>
          {isAlert && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-alert-red rounded-full border-2 border-white flex items-center justify-center animate-shimmer">
              <span className="text-white text-xs font-bold">!</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-nordic-charcoal mb-1">{device.nickname}</h1>
        <p className="text-sm text-nordic-slate flex items-center justify-center gap-1.5">
          <Sprout size={14} className="text-nordic-moss" />
          {device.plantType}
          <span className="text-nordic-stone">&middot;</span>
          Day {device.growthDays}
          <span className="text-nordic-stone">&middot;</span>
          <span className="font-medium text-nordic-bark">{device.fixtureType}</span>
        </p>

        {/* Growth Bar */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-medium text-nordic-slate uppercase tracking-wide">
              {stage}
            </span>
            <span className="text-[11px] text-nordic-slate">{growthPct}%</span>
          </div>
          <div className="h-2 w-full bg-nordic-stone/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${growthPct}%`,
                background: isAlert
                  ? 'linear-gradient(90deg, #e0554a, #f08070)'
                  : 'linear-gradient(90deg, #4a7c59, #87a88d)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Telemetry Dashboard */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-nordic-slate uppercase tracking-wide mb-3 flex items-center gap-2">
          <Settings2 size={14} />
          Real-time Telemetry
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center border border-nordic-stone/40 shadow-sm">
            <Droplets
              size={22}
              className={`mx-auto mb-2 ${
                isAlert ? 'text-alert-red animate-shimmer' : 'text-nordic-water'
              }`}
            />
            <p
              className={`text-lg font-bold ${
                isAlert ? 'text-alert-red' : 'text-nordic-charcoal'
              }`}
            >
              {device.waterLevel}
            </p>
            <p className="text-[10px] text-nordic-slate uppercase tracking-wide mt-0.5">
              Water Level
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center border border-nordic-stone/40 shadow-sm">
            <Sun size={22} className="mx-auto mb-2 text-sun" />
            <p className="text-lg font-bold text-nordic-charcoal">{device.lightIntensity}</p>
            <p className="text-[10px] text-nordic-slate uppercase tracking-wide mt-0.5">Lux</p>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center border border-nordic-stone/40 shadow-sm">
            <Clock size={22} className="mx-auto mb-2 text-nordic-bark" />
            <p className="text-lg font-bold text-nordic-charcoal">Day {device.growthDays}</p>
            <p className="text-[10px] text-nordic-slate uppercase tracking-wide mt-0.5">Growth</p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {isAlert && (
        <div className="flex items-center gap-3 bg-alert-rose rounded-2xl px-4 py-3.5 mb-6 animate-shimmer border border-alert-red/20">
          <Droplets size={20} className="text-alert-red flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-alert-red">Water Level Critical</p>
            <p className="text-xs text-alert-red/80 mt-0.5">
              Please refill the tank immediately to prevent damage to your {device.plantType}.
            </p>
          </div>
        </div>
      )}

      {/* Control Mode */}
      <div className="bg-white rounded-2xl border border-nordic-stone/40 shadow-sm overflow-hidden mb-6">
        <div className="p-5">
          <h2 className="text-sm font-semibold text-nordic-slate uppercase tracking-wide mb-4 flex items-center gap-2">
            <Zap size={14} />
            Control Mode
          </h2>

          {/* Mode Toggle */}
          <div className="flex items-center justify-between bg-nordic-cream rounded-xl p-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-nordic-charcoal">
                {isCustom ? '🎛️ Custom Mode' : '🤖 Smart Autopilot'}
              </p>
              <p className="text-[11px] text-nordic-slate mt-0.5">
                {isCustom
                  ? 'You control light and pump schedules manually.'
                  : 'ESP32 manages everything based on plant profile.'}
              </p>
            </div>
            <button
              onClick={handleModeToggle}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isCustom ? 'bg-nordic-clay' : 'bg-nordic-moss'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                  isCustom ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Custom Controls */}
          {isCustom && (
            <div className="space-y-4">
              <div className="bg-nordic-cream rounded-xl p-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-nordic-charcoal mb-3">
                  <Lightbulb size={16} className="text-sun" />
                  Grow-Light Schedule
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={lightStart}
                    onChange={(e) => setLightStart(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-white border border-nordic-stone/60 rounded-xl text-sm text-nordic-charcoal focus:outline-none focus:border-nordic-moss focus:ring-2 focus:ring-nordic-moss/10"
                  />
                  <span className="text-xs text-nordic-slate font-medium">to</span>
                  <input
                    type="time"
                    value={lightEnd}
                    onChange={(e) => setLightEnd(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-white border border-nordic-stone/60 rounded-xl text-sm text-nordic-charcoal focus:outline-none focus:border-nordic-moss focus:ring-2 focus:ring-nordic-moss/10"
                  />
                </div>
              </div>

              <div className="bg-nordic-cream rounded-xl p-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-nordic-charcoal mb-3">
                  <Timer size={16} className="text-nordic-water" />
                  Water Pump Interval
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    value={pumpInterval}
                    onChange={(e) => setPumpInterval(Number(e.target.value))}
                    className="flex-1 accent-nordic-moss h-2 rounded-full"
                  />
                  <span className="text-sm font-bold text-nordic-charcoal min-w-[4rem] text-right">
                    {pumpInterval} min
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-nordic-slate mt-1.5 px-0.5">
                  <span>5m</span>
                  <span>120m</span>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-nordic-moss text-white rounded-xl text-sm font-semibold hover:bg-nordic-moss/90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-nordic-moss/20"
              >
                Save Settings
              </button>
            </div>
          )}

          {/* Smart Mode Info */}
          {!isCustom && (
            <div className="bg-nordic-cream rounded-xl p-4">
              <p className="text-sm text-nordic-slate leading-relaxed">
                ESP32 Autopilot is managing your{' '}
                <span className="font-semibold text-nordic-charcoal">{device.nickname}</span> based on{' '}
                <span className="font-semibold text-nordic-charcoal">{device.plantType}</span> growth
                parameters. Toggle to Custom Mode to adjust light schedules and pump intervals manually.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
