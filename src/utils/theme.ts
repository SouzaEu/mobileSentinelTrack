import type { useTheme } from "../contexts/ThemeContext"

export const createThemedStyles = (styleFunction: (theme: ReturnType<typeof useTheme>) => any) => {
  return (theme: ReturnType<typeof useTheme>) => styleFunction(theme)
}

export const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case "active":
      return colors.success
    case "inactive":
      return colors.mutedForeground
    case "maintenance":
      return colors.warning
    case "error":
      return colors.destructive
    default:
      return colors.mutedForeground
  }
}

export const getBatteryColor = (battery: number, colors: any) => {
  if (battery > 60) return colors.success
  if (battery > 30) return colors.warning
  return colors.destructive
}

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "agora"
  if (diffMins < 60) return `${diffMins} min atrás`
  if (diffHours < 24) return `${diffHours}h atrás`
  if (diffDays < 7) return `${diffDays}d atrás`
  return date.toLocaleDateString("pt-BR")
}
