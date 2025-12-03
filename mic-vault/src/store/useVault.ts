import { useSyncExternalStore } from 'react'
import type { Mic } from '../types'
import seedData from '../data/mics.json'

let listeners = new Set<() => void>()
let snapshot: Mic[] = (seedData as Mic[])

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
  snapshot = next
  emit()
}

export function useVault() {
  const mics = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const addMic = (mic: Mic) => setSnapshot([...mics, mic])
  const updateMic = (mic: Mic) => setSnapshot(mics.map(m => (m.id === mic.id ? mic : m)))
  const deleteMic = (id: string) => setSnapshot(mics.filter(m => m.id !== id))

  return { mics, addMic, updateMic, deleteMic }
}