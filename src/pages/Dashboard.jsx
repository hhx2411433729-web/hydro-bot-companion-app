import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sprout,
  Droplets,
  Sun,
  AlertTriangle,
  Zap,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react'
import {
  devices as initialDevices,
  getFixtureIcon,
  getGrowthStage,
  getGrowthPercent,
} from '../data/devices'

function getButlerForAll(devices) {
  const lowDevices = devices.filter((d) => d.waterLevel === 'LOW')
  if (lowDevices.length > 0) {
    const name = lowDevices[0].nickname
    if (lowDevices.length === 1) {
      return {
        emoji: '😟',
        mood: 'alert',
        text: `Oh no, Master! '${name}' is extremely thirsty and needs water immediately! Please refill the tank. 😰`,
      }
    }
    const names = lowDevices.map((d) => `'${d.nickname}'`).join(' and ')
    return {
      emoji: '😟',
      mood: 'alert',
      text: `Master, ${names} are critically low on water! Please refill their tanks right away! 🚨`,
    }
  }
  const maturePlants = devices.filter((d) => d.growthDays >= 10)
  if (maturePlants.length > 0) {
    const star = maturePlants[0]
    return {
      emoji: '🤖',
      mood: 'happy',
      text: `Hello Master! Today is a beautiful day. '${star.nickname}' (${star.plantType}) has been growing for ${star.growthDays} days and is almost ready for harvest! 🌱`,
    }
  }
  return {
    emoji: '🤖',
    mood: 'calm',
    text: 'Hello Master! All your botanical babies are thriving. Your smart garden is in perfect harmony. ✨',
  }
}

function getButlerForDevice(device) {
  if (device.waterLevel === 'LOW') {
    return {
      emoji: '😟',
      mood: 'alert',
      text: `Oh no, Master! '${device.nickname}' is running dangerously low on water. The ${device.fixtureType.toLowerCase()} needs your attention — please refill the tank immediately! 😰`,
    }
  }

  const stage = getGrowthStage(device.growthDays).toLowerCase()
  if (device.growthDays >= 21) {
    return {
      emoji: '🎉',
      mood: 'happy',
      text: `Master, great news! '${device.nickname}' (${device.plantType}) has reached Day ${device.growthDays} and is in the ${stage} phase. It's harvest time! 🎉🌿`,
    }
  }
  if (device.growthDays >= 14) {
    return {
      emoji: '😊',
      mood: 'happy',
      text: `'${device.nickname}' is approaching harvest! At Day ${device.growthDays}, your ${device.plantType} is ${stage} beautifully under ${device.lightIntensity} Lux. Almost there, Master! 🌱✨`,
    }
  }
  if (device.growthDays >= 7) {
    return {
      emoji: '😊',
      mood: 'calm',
      text: `'${device.nickname}' is ${stage} nicely at Day ${device.growthDays}. Currently enjoying ${device.lightIntensity} Lux of light in its ${device.fixtureType.toLowerCase()}. Looking great, Master! 🪴`,
    }
  }
  return {
    emoji: '🌱',
    mood: 'calm',
    text: `'${device.nickname}' is just ${device.growthDays} day${device.growthDays > 1 ? 's' : ''} old — a young ${device.plantType} sprouting in your ${device.fixtureType.toLowerCase()}. Receiving ${device.lightIntensity} Lux. Let's watch it grow! 🌱✨`,
  }
}

const moodStyles = {
  alert: {
    avatarBg: 'bg-gradient-to-br from-red-50 to-rose-100',
    avatarRing: 'ring-alert-red/20',
    bubbleBg: 'bg-gradient-to-br from-alert-rose to-red-50',
    bubbleBorder: 'border-alert-red/20',
    dotColor: 'bg-alert-red',
  },
  happy: {
    avatarBg: 'bg-gradient-to-br from-emerald-50 to-green-100',
    avatarRing: 'ring-nordic-moss/20',
    bubbleBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    bubbleBorder: 'border-nordic-moss/20',
    dotColor: 'bg-nordic-moss',
  },
  calm: {
    avatarBg: 'bg-gradient-to-br from-blue-50 to-sky-100',
    avatarRing: 'ring-nordic-sky/20',
    bubbleBg: 'bg-gradient-to-br from-nordic-cream to-nordic-sand',
    bubbleBorder: 'border-nordic-stone',
    dotColor: 'bg-nordic-sky',
  },
}

export default function Dashboard() {
  const [devices, setDevices] = useState(initialDevices)
  const [perspective, setPerspective] = useState('all')
  const navigate = useNavigate()

  function toggleMode(id) {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, mode: d.mode === 'smart' ? 'custom' : 'smart' } : d,
      ),
    )
  }

  const focusedDevice = perspective !== 'all' ? devices.find((d) => d.id === perspective) : null
  const { emoji, mood, text } = focusedDevice
    ? getButlerForDevice(focusedDevice)
    : getButlerForAll(devices)

  const m = moodStyles[mood]

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-lg mx-auto">
      {/* === Butler Card === */}
      <div className="relative mb-8">
        <div className="flex items-start gap-4">
          <div
            className={`relative flex-shrink-0 w-16 h-16 rounded-2xl ${m.avatarBg} ring-4 ${m.avatarRing} flex items-center justify-center shadow-lg transition-all duration-500`}
          >
            <span className="text-3xl animate-float">{emoji}</span>
            <span
              className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${m.dotColor} rounded-full border-2 border-white animate-shimmer`}
            />
          </div>

          <div
            className={`flex-1 rounded-2xl rounded-tl-md ${m.bubbleBg} border ${m.bubbleBorder} p-4 shadow-md transition-all duration-500`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-nordic-moss" />
              <span className="text-xs font-semibold tracking-wide uppercase text-nordic-slate">
                Smart Botanical Butler
              </span>
            </div>
            <p className="text-sm leading-relaxed text-nordic-charcoal">{text}</p>
          </div>
        </div>

        {/* Perspective Switcher Pills */}
        <div className="mt-3 ml-20">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setPerspective('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                perspective === 'all'
                  ? 'bg-nordic-charcoal text-white shadow-md shadow-nordic-charcoal/20'
                  : 'bg-white text-nordic-slate border border-nordic-stone/60 hover:border-nordic-charcoal/30 hover:text-nordic-charcoal'
              }`}
            >
              <Layers size={12} />
              All Devices
            </button>
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => setPerspective(d.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                  perspective === d.id
                    ? d.waterLevel === 'LOW'
                      ? 'bg-alert-red text-white shadow-md shadow-alert-red/20'
                      : 'bg-nordic-moss text-white shadow-md shadow-nordic-moss/20'
                    : 'bg-white text-nordic-slate border border-nordic-stone/60 hover:border-nordic-charcoal/30 hover:text-nordic-charcoal'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    d.waterLevel === 'LOW'
                      ? perspective === d.id
                        ? 'bg-white animate-shimmer'
                        : 'bg-alert-red animate-shimmer'
                      : perspective === d.id
                        ? 'bg-white'
                        : 'bg-nordic-moss'
                  }`}
                />
                {d.nickname}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Section Header === */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-nordic-charcoal tracking-tight">
          {focusedDevice ? focusedDevice.nickname : 'Your Devices'}
        </h2>
        <span className="text-xs text-nordic-slate bg-nordic-stone/50 px-2.5 py-1 rounded-full font-medium">
          {devices.length} active
        </span>
      </div>

      {/* === Device Cards === */}
      <div className="flex flex-col gap-4">
        {devices.map((device) => {
          const isAlert = device.waterLevel === 'LOW'
          const growthPct = getGrowthPercent(device.growthDays)
          const stage = getGrowthStage(device.growthDays)
          const isFocused = perspective === device.id

          return (
            <div
              key={device.id}
              onClick={() => navigate(`/device/${device.id}`)}
              className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                isAlert
                  ? 'animate-pulse-alert border-2 border-alert-red/30 shadow-md shadow-alert-red/10'
                  : isFocused
                    ? 'border-2 border-nordic-moss/40 shadow-md shadow-nordic-moss/10 ring-4 ring-nordic-moss/5'
                    : 'border border-nordic-stone/60 shadow-sm'
              }`}
            >
              <div
                className={`h-1.5 w-full ${
                  isAlert
                    ? 'bg-gradient-to-r from-alert-red via-red-400 to-alert-red animate-shimmer'
                    : device.mode === 'smart'
                      ? 'bg-gradient-to-r from-nordic-moss via-nordic-sage to-nordic-lichen'
                      : 'bg-gradient-to-r from-nordic-clay via-nordic-bark to-nordic-clay'
                }`}
              />

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                        isAlert ? 'bg-alert-rose' : 'bg-nordic-sand'
                      }`}
                    >
                      {getFixtureIcon(device.fixtureType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-nordic-charcoal leading-tight">
                        {device.nickname}
                      </h3>
                      <p className="text-xs text-nordic-slate flex items-center gap-1.5 mt-0.5">
                        <Sprout size={12} className="text-nordic-moss" />
                        {device.plantType}
                        <span className="text-nordic-stone">|</span>
                        <span className="font-medium text-nordic-bark">
                          {device.fixtureType}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMode(device.id)
                    }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      device.mode === 'smart'
                        ? 'bg-nordic-moss/10 text-nordic-moss'
                        : 'bg-nordic-clay/10 text-nordic-clay'
                    } hover:scale-105 active:scale-95`}
                  >
                    <Zap size={12} />
                    {device.mode === 'smart' ? 'Smart' : 'Custom'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-nordic-cream rounded-xl p-3 text-center">
                    <Sun
                      size={16}
                      className={`mx-auto mb-1 ${isAlert ? 'text-alert-red' : 'text-nordic-bark'}`}
                    />
                    <p className="text-sm font-bold text-nordic-charcoal">
                      {device.lightIntensity}
                    </p>
                    <p className="text-[10px] text-nordic-slate uppercase tracking-wide">Lux</p>
                  </div>

                  <div className="bg-nordic-cream rounded-xl p-3 text-center">
                    <Droplets
                      size={16}
                      className={`mx-auto mb-1 ${
                        isAlert ? 'text-alert-red animate-shimmer' : 'text-nordic-water'
                      }`}
                    />
                    <p
                      className={`text-sm font-bold ${
                        isAlert ? 'text-alert-red' : 'text-nordic-charcoal'
                      }`}
                    >
                      {device.waterLevel === 'LOW' ? 'LOW' : 'OK'}
                    </p>
                    <p className="text-[10px] text-nordic-slate uppercase tracking-wide">Water</p>
                  </div>

                  <div className="bg-nordic-cream rounded-xl p-3 text-center">
                    <Sprout size={16} className="mx-auto mb-1 text-nordic-moss" />
                    <p className="text-sm font-bold text-nordic-charcoal">
                      {device.growthDays}
                    </p>
                    <p className="text-[10px] text-nordic-slate uppercase tracking-wide">Days</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-medium text-nordic-slate uppercase tracking-wide">
                      {stage}
                    </span>
                    <span className="text-[11px] text-nordic-slate">
                      Day {device.growthDays}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-nordic-stone/50 rounded-full overflow-hidden">
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

                {isAlert && (
                  <div className="flex items-center gap-2 bg-alert-rose rounded-xl px-3 py-2.5 animate-shimmer">
                    <AlertTriangle size={14} className="text-alert-red flex-shrink-0" />
                    <span className="text-xs font-semibold text-alert-red">
                      Refill Required — water level critical
                    </span>
                    <ChevronRight size={14} className="text-alert-red/60 ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}

                {!isAlert && (
                  <div className="flex items-center justify-end">
                    <span className="text-[11px] text-nordic-sage group-hover:text-nordic-moss transition-colors flex items-center gap-1">
                      Tap for details
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
