import { useEffect } from 'react'

const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function useKonami(onTrigger) {
  useEffect(() => {
    let idx = 0
    const h = (e) => {
      const key = e.key
      if (key === SEQ[idx]) {
        idx++
        if (idx === SEQ.length) {
          onTrigger()
          idx = 0
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onTrigger])
}
