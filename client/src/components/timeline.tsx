import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  id: number;
  title: string;
  date: Date;
  description: string;
  type: string;
  color: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const filteredEvents = events.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'financial', label: 'Financial' },
    { id: 'member', label: 'Legal' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      green: 'bg-green-500',
      amber: 'bg-amber-500',
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-3xl p-8 card-shadow">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Intelligence Timeline</h2>
          <p className="text-gray-600">Corporate evolution and key legal events</p>
        </div>
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium smooth-hover ${
                activeFilter === filter.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 clarity-gradient rounded-full transform -translate-y-1/2"></div>
        
        {/* Timeline Events */}
        <div className="flex justify-between items-center relative">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="timeline-marker group cursor-pointer relative"
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`w-4 h-4 ${getColorClasses(event.color)} rounded-full border-4 border-white shadow-lg z-10 relative`}></div>
              
              <AnimatePresence>
                {hoveredEvent === event.id && (
                  <motion.div
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-xl p-4 shadow-xl border min-w-64">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.date.toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500 mt-2">{event.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Timeline Labels */}
        <div className="flex justify-between mt-8 text-xs text-gray-500">
          {filteredEvents.map((event) => (
            <span key={event.id}>
              {event.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
