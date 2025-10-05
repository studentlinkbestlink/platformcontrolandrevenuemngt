import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Users, Package, Truck, DollarSign, BarChart3, Shield, Zap, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Tech Pattern Background */}
      <div className="relative overflow-hidden hero-gradient tech-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  Next-Generation Platform
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 text-balance">
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Unified Platform
                </span>
                <br />
                Control & Revenue Management
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                Unlock unequalled business performance with real-time insights, automation, and expanding marketplace.
                Join the logistics revolution in the making.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-start">
                <Button asChild size="lg" className="text-lg px-10 py-4 glow-primary">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-4 border-primary/30 hover:border-primary bg-transparent"
                >
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/hero-logistics.jpg"
                  alt="Futuristic logistics platform visualization"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-3xl blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Built for Every Role</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our platform provides specialized dashboards and tools for each user type with real-time data
              synchronization and advanced analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center card-gradient border-border/50 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-8 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4">Admin Dashboard</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Complete system oversight with KPIs, revenue stats, and dispute management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-gradient border-border/50 hover:border-success/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-8 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-success/20 to-success/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-xl mb-4">Vendor Portal</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Product management, earnings tracking, and subscription handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-gradient border-border/50 hover:border-warning/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-8 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-warning/20 to-warning/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-8 w-8 text-warning" />
                </div>
                <CardTitle className="text-xl mb-4">Logistics Hub</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Delivery management, status updates, and tracking coordination
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-gradient border-border/50 hover:border-chart-4/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-chart-4/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-8 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-chart-4/20 to-chart-4/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-chart-4" />
                </div>
                <CardTitle className="text-xl mb-4">Finance Center</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Financial reporting, payout management, and transaction logs
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-32 bg-gradient-to-r from-card to-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Advanced Analytics & Insights</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Make data-driven decisions with our comprehensive analytics suite. Track performance, identify trends,
                and optimize your operations in real-time.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Real-time performance monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Predictive analytics and forecasting</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Custom reporting and dashboards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Automated alerts and notifications</span>
                </div>
              </div>
              <Button asChild className="glow-primary">
                <Link href="/analytics">
                  Explore Analytics <BarChart3 className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/images/dashboard-analytics.jpg"
                alt="Advanced analytics dashboard"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of businesses already transforming their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-xl text-muted-foreground">Active Vendors</div>
              <div className="text-sm text-muted-foreground mt-2">Across 50+ countries</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold text-success mb-4 group-hover:scale-110 transition-transform duration-300">
                $2.5M
              </div>
              <div className="text-xl text-muted-foreground">Monthly Revenue</div>
              <div className="text-sm text-muted-foreground mt-2">Processed securely</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-bold text-warning mb-4 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-xl text-muted-foreground">Uptime</div>
              <div className="text-sm text-muted-foreground mt-2">Enterprise-grade reliability</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 bg-gradient-to-r from-secondary/30 to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Enterprise-Grade Security</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your data and operations are protected by industry-leading security measures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center card-gradient border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>SOC 2 Compliant</CardTitle>
                <CardDescription>
                  Rigorous security controls and regular audits ensure your data is protected
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-gradient border-border/50 hover:border-success/30 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-success" />
                </div>
                <CardTitle>99.9% Uptime SLA</CardTitle>
                <CardDescription>
                  Guaranteed availability with redundant infrastructure and failover systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-gradient border-border/50 hover:border-warning/30 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>GDPR Compliant</CardTitle>
                <CardDescription>
                  Full compliance with global data protection regulations and privacy laws
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 tech-pattern opacity-50" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Ready to Transform Your Operations?</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Experience the future of platform management with real-time insights, automated workflows, and seamless
            integrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-lg px-12 py-4 glow-primary">
              <Link href="/register">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-12 py-4 border-primary/30 hover:border-primary bg-transparent"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
