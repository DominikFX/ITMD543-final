import { useSyncExternalStore } from 'react'

export type Mic = {
  id: string
  label: string
  brand: string
  band: string
  frequencyMHz: number
  lastServiced?: string
}

const KEY = 'mic-vault-v1'

let listeners = new Set<() => void>()
let snapshot: Mic[] = readFromStorage()

function readFromStorage(): Mic[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Mic[]) : []
  } catch {
    return []
  }
}

function emit() {
  for (const l of listeners) l()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return snapshot
}

function setSnapshot(next: Mic[]) {
  const prevJson = localStorage.getItem(KEY)
  const nextJson = JSON.stringify(next)
  if (prevJson === nextJson) return
  localStorage.setItem(KEY, nextJson)
  snapshot = next 
  emit()
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      snapshot = readFromStorage()
      emit()
    }
  })
}

if (localStorage.getItem(KEY) === null) {
  localStorage.setItem(KEY, '[]')
  snapshot = []
}

export function useVault() {
  const mics = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const addMic = (mic: Mic) => setSnapshot([...mics, mic])
  const updateMic = (mic: Mic) => setSnapshot(mics.map(m => m.id === mic.id ? mic : m))
  const deleteMic = (id: string) => setSnapshot(mics.filter(m => m.id !== id))

  return { mics, addMic, updateMic, deleteMic }
}