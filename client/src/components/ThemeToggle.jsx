import { useEffect, useState } from "react"
import Switch from "react-switch"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  return (
    <Switch
      onChange={() => setIsDark(!isDark)}
      checked={isDark}
      offColor="#ccc"
      onColor="#000"
      uncheckedIcon={<div className="pl-1">☀️</div>}
      checkedIcon={<div className="pl-1">🌙</div>}
    />
  )
}
