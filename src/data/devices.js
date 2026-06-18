export const devices = [
  {
    id: 'd1',
    nickname: 'Lily',
    plantType: 'Basil',
    growthDays: 10,
    waterLevel: 'NORMAL',
    lightIntensity: 450,
    mode: 'smart',
    fixtureType: 'Desktop Ornament',
    customLightStart: '08:00',
    customLightEnd: '22:00',
    customPumpInterval: 30,
  },
  {
    id: 'd2',
    nickname: 'Living Room Giant',
    plantType: 'Roman Lettuce',
    growthDays: 24,
    waterLevel: 'LOW',
    lightIntensity: 520,
    mode: 'smart',
    fixtureType: 'Floor Tower',
    customLightStart: '06:00',
    customLightEnd: '20:00',
    customPumpInterval: 45,
  },
  {
    id: 'd3',
    nickname: 'Dining Glow',
    plantType: 'Mint',
    growthDays: 3,
    waterLevel: 'NORMAL',
    lightIntensity: 120,
    mode: 'custom',
    fixtureType: 'Pendant Light',
    customLightStart: '18:00',
    customLightEnd: '23:00',
    customPumpInterval: 60,
  },
]

export function getDeviceById(id) {
  return devices.find((d) => d.id === id) || devices[0]
}

export function getFixtureIcon(type) {
  if (type === 'Desktop Ornament') return '🪴'
  if (type === 'Floor Tower') return '🏗️'
  if (type === 'Pendant Light') return '💡'
  return '🌱'
}

export function getGrowthStage(day) {
  if (day >= 21) return 'Harvest ready'
  if (day >= 14) return 'Maturing'
  if (day >= 7) return 'Growing'
  return 'Sprouting'
}

export function getGrowthPercent(day) {
  return Math.min(100, Math.round((day / 30) * 100))
}
