import { useState, useEffect } from "react"

// Retorna ancho y alto de la ventana y breakpoint
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getBreakpoint(window.innerWidth)
  })

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth)
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

function getBreakpoint(width) {
  if (width < 640) return "xs"
  if (width < 768) return "sm"
  if (width < 1024) return "md"
  if (width < 1280) return "lg"
  return "xl"
}
