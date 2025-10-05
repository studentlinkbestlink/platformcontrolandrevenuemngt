import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface EnhancedStatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
  color?: "primary" | "success" | "warning" | "destructive" | "chart-2" | "chart-3" | "chart-4"
  className?: string
}

export function EnhancedStatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = "primary",
  className = "",
}: EnhancedStatCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          border: "hover:border-primary/30",
        }
      case "success":
        return {
          iconBg: "bg-success/20",
          iconColor: "text-success",
          border: "hover:border-success/30",
        }
      case "warning":
        return {
          iconBg: "bg-warning/20",
          iconColor: "text-warning",
          border: "hover:border-warning/30",
        }
      case "destructive":
        return {
          iconBg: "bg-destructive/20",
          iconColor: "text-destructive",
          border: "hover:border-destructive/30",
        }
      case "chart-2":
        return {
          iconBg: "bg-chart-2/20",
          iconColor: "text-chart-2",
          border: "hover:border-chart-2/30",
        }
      case "chart-3":
        return {
          iconBg: "bg-chart-3/20",
          iconColor: "text-chart-3",
          border: "hover:border-chart-3/30",
        }
      case "chart-4":
        return {
          iconBg: "bg-chart-4/20",
          iconColor: "text-chart-4",
          border: "hover:border-chart-4/30",
        }
      default:
        return {
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          border: "hover:border-primary/30",
        }
    }
  }

  const colorClasses = getColorClasses(color)

  return (
    <Card
      className={`card-gradient border-border/50 ${colorClasses.border} transition-all duration-300 group ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={`w-10 h-10 ${colorClasses.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`h-5 w-5 ${colorClasses.iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        {trend && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 text-sm ${trend.isPositive ? "text-success" : "text-destructive"}`}
            >
              {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="font-medium">{Math.abs(trend.value)}%</span>
            </div>
            <span className="text-sm text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
