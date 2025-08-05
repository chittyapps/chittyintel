import { useState } from "react";
import { Brain, User, DollarSign, Percent, Calendar, CheckCircle, ChartLine, Gavel, Building, ChartArea, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/timeline";
import { AnalyticsCard } from "@/components/analytics-card";
import { FinancialChart } from "@/components/financial-chart";
import { aribiaData } from "@/data/aribia-data";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every 30 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  });

  const { loanDetails, litigationDetails, timelineEvents, financialData } = aribiaData;

  const smartMetrics = [
    {
      title: "Loan Principal",
      value: `$${loanDetails.principal.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-500",
      textColor: "text-green-700"
    },
    {
      title: "Interest Rate",
      value: `${loanDetails.interestRate}%`,
      icon: Percent,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      textColor: "text-blue-700"
    },
    {
      title: "Loan Term",
      value: `${loanDetails.termMonths} Months`,
      icon: Calendar,
      gradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      textColor: "text-purple-700"
    },
    {
      title: "Status",
      value: "Active",
      icon: CheckCircle,
      gradient: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-500",
      textColor: "text-amber-700"
    }
  ];

  const financialOverviewData = [
    { label: "Loan Principal", value: "$100,000.00", bg: "bg-gray-50" },
    { label: "Monthly Payment", value: "$1,135.40", bg: "bg-gray-50" },
    { label: "Credit Applied", value: "$1,097.74", bg: "bg-green-50", textColor: "text-green-700" },
    { label: "First Payment Due", value: "$37.66", bg: "bg-blue-50", textColor: "text-blue-700" }
  ];

  const legalStatusData = [
    { label: "Operating Agreement", status: "Active", color: "green" },
    { label: "Member Disputes", status: "Monitored", color: "blue" },
    { label: "Compliance Status", status: "Under Review", color: "amber" },
    { label: "Document Integrity", status: "Verified", color: "purple" }
  ];

  const assetPortfolioData = [
    { name: "Medellín Property", status: "Owned", description: "Rental income generating asset" },
    { name: "City Studio (Surf 211)", status: "100%", description: "Via ARIBIA LLC - City Studio" },
    { name: "Apt Arlene", status: "Majority", description: "Partial ownership stake" }
  ];

  const timelineInsights = [
    {
      title: "Ownership Evolution",
      description: "Multiple ownership changes indicate complex corporate restructuring with clear documentation trail.",
      color: "blue"
    },
    {
      title: "Financial Compliance",
      description: "Credit memo adjustments demonstrate proactive financial management and transparency.",
      color: "green"
    },
    {
      title: "Member Relations",
      description: "Email correspondence reveals ongoing disputes requiring careful legal oversight and resolution.",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 clarity-gradient rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CLARITY</h1>
                <p className="text-sm text-gray-500">Legal Intelligence Dashboard</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">ARIBIA LLC</p>
                <p className="text-xs text-gray-500">Never Sh*tty Legal Analysis™</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Smart Metrics Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {smartMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                className={`bg-gradient-to-r ${metric.gradient} rounded-2xl p-4 smooth-hover hover:shadow-lg cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${metric.textColor}`}>{metric.title}</p>
                    <p className={`text-2xl font-bold ${metric.textColor.replace('700', '900')}`}>{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}>
                    <metric.icon className="text-white" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Timeline events={timelineEvents} />
        </motion.div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnalyticsCard
              title="Financial Overview"
              icon={ChartLine}
              iconColor="text-green-600"
              iconBg="bg-green-100"
              data={financialOverviewData}
              footerText="Payment status: Current"
              footerIcon="arrow-up"
              footerColor="text-green-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnalyticsCard
              title="Legal Intelligence"
              icon={Gavel}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              data={legalStatusData}
              footerText="Legal risk: Moderate"
              footerIcon="shield-check"
              footerColor="text-blue-600"
              isStatusCard={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnalyticsCard
              title="Asset Portfolio"
              icon={Building}
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
              data={assetPortfolioData}
              footerText="Portfolio value: Stable"
              footerIcon="trending-up"
              footerColor="text-purple-600"
              isAssetCard={true}
            />
          </motion.div>
        </div>

        {/* Real-Time Intelligence Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FinancialChart data={financialData} />
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-6 card-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Timeline Insights</h3>
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="text-amber-600" size={16} />
              </div>
            </div>
            
            <div className="space-y-4">
              {timelineInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  className={`p-4 bg-${insight.color}-50 rounded-xl border-l-4 border-${insight.color}-500`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <h4 className={`font-semibold text-${insight.color}-900 mb-2`}>{insight.title}</h4>
                  <p className={`text-sm text-${insight.color}-700`}>{insight.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <motion.button 
                className="w-full clarity-gradient text-white py-3 rounded-xl font-medium smooth-hover hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Legal Report
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="w-8 h-8 clarity-gradient rounded-lg flex items-center justify-center">
                <Brain className="text-white" size={16} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">CLARITY Legal Intelligence</div>
                <div className="text-sm text-gray-500">Never Sh*tty Legal Analysis™</div>
              </div>
            </motion.div>
            <div className="text-sm text-gray-500">
              Last updated: <span>{currentTime.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
