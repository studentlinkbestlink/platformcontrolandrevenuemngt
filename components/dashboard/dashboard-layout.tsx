"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  Settings,
  User,
  Home,
  Package,
  ShoppingCart,
  MessageSquare,
  Truck,
  DollarSign,
  BarChart3,
  FileText,
  Users,
  Bell,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "vendor":
        return "secondary"
      case "logistics":
        return "outline"
      case "finance":
        return "destructive"
      default:
        return "default"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground"
      case "vendor":
        return "bg-success text-success-foreground"
      case "logistics":
        return "bg-chart-3 text-white"
      case "finance":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getNavigationItems = () => {
    const baseItems = [{ href: "/dashboard", icon: Home, label: "Dashboard" }]

    switch (user?.role) {
      case "admin":
        return [
          ...baseItems,
          { href: "/analytics", icon: BarChart3, label: "Analytics" },
          { href: "/users", icon: Users, label: "Users" },
          { href: "/orders", icon: ShoppingCart, label: "Orders" },
          { href: "/products", icon: Package, label: "Products" },
          { href: "/disputes", icon: MessageSquare, label: "Disputes" },
          { href: "/logistics", icon: Truck, label: "Logistics" },
          { href: "/finance", icon: DollarSign, label: "Finance" },
          { href: "/reports", icon: FileText, label: "Reports" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      case "vendor":
        return [
          ...baseItems,
          { href: "/products", icon: Package, label: "My Products" },
          { href: "/orders", icon: ShoppingCart, label: "My Orders" },
          { href: "/disputes", icon: MessageSquare, label: "Disputes" },
          { href: "/payments", icon: DollarSign, label: "Earnings" },
          { href: "/analytics", icon: BarChart3, label: "Analytics" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      case "logistics":
        return [
          ...baseItems,
          { href: "/logistics", icon: Truck, label: "Shipments" },
          { href: "/orders", icon: ShoppingCart, label: "Orders" },
          { href: "/analytics", icon: BarChart3, label: "Analytics" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      case "finance":
        return [
          ...baseItems,
          { href: "/finance", icon: DollarSign, label: "Finance" },
          { href: "/orders", icon: ShoppingCart, label: "Orders" },
          { href: "/payments", icon: DollarSign, label: "Payouts" },
          { href: "/reports", icon: FileText, label: "Reports" },
          { href: "/analytics", icon: BarChart3, label: "Analytics" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      default:
        return baseItems
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-gradient-to-r from-sidebar to-sidebar-accent backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">Platform Control</h1>
            </div>
            <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize glow-primary">
              {user.role}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-sidebar-accent">
              <Bell className="h-4 w-4 text-sidebar-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-bold">3</span>
              </div>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={getRoleColor(user.role)}>
                      <AvatarInitials name={user.name} />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-sidebar-border bg-sidebar">
          <nav className="p-4 space-y-2">
            {getNavigationItems().map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 group"
                >
                  <item.icon className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-gradient-to-br from-background to-muted/20">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-2">{title}</h2>
                  <p className="text-xl text-muted-foreground">Welcome back, {user.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
