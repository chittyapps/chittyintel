import { useState } from "react";
import { Brain, DollarSign, Percent, AlertTriangle, Scale, Eye, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/timeline";
import { FinancialChart } from "@/components/financial-chart";
import { aribiaData } from "@/data/aribia-data";

export default function Dashboard() {
  const [currentPOV, setCurrentPOV] = useState('aribia');

  const { loanDetails, timelineEvents, financialData } = aribiaData;

  const coreMetrics = [
    {
      title: "Loan Principal",
      value: `$${loanDetails.principal.toLocaleString()}`,
      icon: DollarSign,
      color: 'var(--aribia-green)'
    },
    {
      title: "Interest Rate",
      value: `${loanDetails.interestRate}%`,
      icon: Percent,
      color: 'var(--aribia-blue)'
    },
    {
      title: "TRO Duration",
      value: "118 Days",
      icon: AlertTriangle,
      color: 'var(--aribia-red)'
    },
    {
      title: "Legal Status",
      value: "Active Litigation",
      icon: Scale,
      color: 'var(--aribia-amber)'
    }
  ];

  const povOptions = [
    { id: 'aribia', label: 'ARIBIA LLC', description: 'Business Defense' },
    { id: 'sharon', label: 'Sharon Jones', description: 'Lender & President' },
    { id: 'luisa', label: 'Luisa Arias', description: 'Former Member' },
    { id: 'legal', label: 'Legal Neutral', description: 'Court Analysis' },
    { id: 'colombia', label: 'Colombian Legal', description: 'International' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <header className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 aribia-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">ARIBIA Intelligence</h1>
                <p className="text-sm text-muted-foreground">Legal & Financial Analysis Platform</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">Multi-POV Dashboard</p>
                <p className="text-xs text-muted-foreground">Real-time Legal Intelligence</p>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Eye className="text-primary" size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* POV Selector */}
        <div className="modern-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Point of View</h2>
              <p className="text-muted-foreground text-sm">Select perspective for analysis</p>
            </div>
            <Eye className="text-primary" size={20} />
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {povOptions.map((option, index) => (
              <motion.button
                key={option.id}
                className={`p-4 rounded-xl border-2 smooth-hover text-center ${
                  currentPOV === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setCurrentPOV(option.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-sm font-semibold text-foreground mb-1">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {coreMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="metric-card modern-card rounded-2xl p-6 smooth-hover hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <metric.icon size={20} style={{ color: metric.color }} />
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }}></div>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <Timeline events={timelineEvents} />

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claims Analysis */}
          <div className="modern-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Legal Position Analysis</h3>
                <p className="text-muted-foreground text-sm">Current perspective: {povOptions.find(p => p.id === currentPOV)?.label}</p>
              </div>
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-primary" size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {currentPOV === 'aribia' && (
                <>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Pre-Marital Asset</span>
                      <span className="text-sm font-semibold text-green-400">95%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">ARIBIA formed 5 months before marriage</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Separate Funding</span>
                      <span className="text-sm font-semibold text-green-400">90%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Colombian property funded with pre-marital assets</p>
                  </div>
                </>
              )}
              {currentPOV === 'sharon' && (
                <>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Loan Security</span>
                      <span className="text-sm font-semibold text-green-400">100%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">$100K secured by two properties</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">Administrative Authority</span>
                      <span className="text-sm font-semibold text-green-400">95%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Appointed Interim President April 2025</p>
                  </div>
                </>
              )}
              {currentPOV !== 'aribia' && currentPOV !== 'sharon' && (
                <div className="p-4 border border-border rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">Analysis Available</span>
                    <span className="text-sm font-semibold text-blue-400">--</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Select ARIBIA LLC or Sharon Jones for detailed analysis</p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Chart */}
          <FinancialChart data={financialData} />
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="w-10 h-10 aribia-gradient rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={16} />
              </div>
              <div>
                <div className="font-semibold text-foreground">ARIBIA Intelligence Platform</div>
                <div className="text-sm text-muted-foreground">Sophisticated Legal & Financial Analysis</div>
              </div>
            </motion.div>
            <div className="text-sm text-muted-foreground">
              Last updated: <span className="text-primary">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
