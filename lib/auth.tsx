"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState, UserRole } from "./types"

const AuthContext = createContext<
  AuthState & {
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
  }
>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock user data for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  "admin@platform.com": {
    password: "admin123",
    user: {
      id: "1",
      email: "admin@platform.com",
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  "vendor@platform.com": {
    password: "vendor123",
    user: {
      id: "2",
      email: "vendor@platform.com",
      name: "Vendor User",
      role: "vendor",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  "logistics@platform.com": {
    password: "logistics123",
    user: {
      id: "3",
      email: "logistics@platform.com",
      name: "Logistics Partner",
      role: "logistics",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  "finance@platform.com": {
    password: "finance123",
    user: {
      id: "4",
      email: "finance@platform.com",
      name: "Finance Team",
      role: "finance",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
}

const getRandomRole = (): UserRole => {
  const roles: UserRole[] = ["admin", "vendor", "logistics", "finance"]
  return roles[Math.floor(Math.random() * roles.length)]
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser = mockUsers[email]
    if (!mockUser || mockUser.password !== password) {
      throw new Error("Invalid credentials")
    }

    localStorage.setItem("user", JSON.stringify(mockUser.user))
    setAuthState({
      user: mockUser.user,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  const register = async (email: string, password: string, name: string) => {
    // Check if user already exists
    if (mockUsers[email]) {
      throw new Error("User already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: getRandomRole(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Store in mock database
    mockUsers[email] = { password, user: newUser }

    localStorage.setItem("user", JSON.stringify(newUser))
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  const logout = () => {
    localStorage.removeItem("user")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, register, logout }}>{children}</AuthContext.Provider>
}
