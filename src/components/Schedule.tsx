import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Edit2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import EventModal from './EventModal';
import { ScheduleEvent } from '../types';

const Schedule: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { schedule } = useContent();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<any>(undefined);

  const handleEditClick = (event: ScheduleEvent) => {
    if (!isAuthenticated) return;
    setSelectedEvent(event);
    setSelectedDay(undefined);
    setIsModalOpen(true);
  };

  const handleAddClick = (day: string) => {
    setSelectedEvent(undefined);
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const getEventTypeLabel = (type: string) => {
      switch(type) {
          case 'training': return t.schedule.types.training;
          case 'match': return t.schedule.types.match;
          case 'tournament': return t.schedule.types.tournament;
          default: return type;
      }
  };

  return (
    <section id="schedule" className="py-24 bg-[#141414] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-tennis-green/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="border-l-2 border-tennis-green pl-6">
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{t.schedule.title}</h2>
                <p className="text-gray-400 font-light">{t.schedule.subtitle}</p>
            </div>
            <button className="text-tennis-green text-sm uppercase font-bold tracking-widest hover:text-white transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t.schedule.sync}
            </button>
        </div>

        {/* Weekly Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-px md:bg-gray-800 md:border md:border-gray-800 rounded-lg overflow-hidden">
          {daysOfWeek.map((day) => {
            // Find events for this day
            const events = schedule.filter(e => e.dayOfWeek === day);
            const hasEvents = events.length > 0;

            return (
              <div key={day} className="flex flex-col bg-[#1a1a1a] min-h-[120px] md:min-h-[400px] relative group/col">
                {/* Day Header */}
                <div className={`p-4 border-b border-gray-800 ${hasEvents ? 'bg-tennis-green/5' : ''} flex justify-between items-center md:justify-center`}>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block md:hidden">
                    {t.schedule.days[day]}
                  </span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider hidden md:block text-center">
                    {t.schedule.days[day]}
                  </span>
                  
                  {/* Admin Add Button Mobile */}
                  {isAuthenticated && (
                      <button 
                        onClick={() => handleAddClick(day)}
                        className="md:hidden text-tennis-green hover:text-white"
                      >
                          <Plus className="w-4 h-4" />
                      </button>
                  )}
                </div>

                {/* Events Container */}
                <div className="p-2 flex-1 flex flex-col gap-2 relative">
                  {events.map(event => (
                    <div 
                      key={event.id}
                      onClick={() => handleEditClick(event)}
                      className={`bg-[#252525] p-3 rounded border border-gray-700 transition-colors group relative ${isAuthenticated ? 'cursor-pointer hover:border-tennis-green' : 'cursor-default'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            event.type === 'tournament' ? 'bg-tennis-green text-black' :
                            event.type === 'match' ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
                        }`}>
                            {getEventTypeLabel(event.type)}
                        </span>
                        {isAuthenticated && <Edit2 className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100" />}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 leading-tight">
                        {event.title}
                      </h4>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3 h-3 text-tennis-green" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Desktop Add Button (Overlay on hover) */}
                  {isAuthenticated && (
                    <button 
                        onClick={() => handleAddClick(day)}
                        className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover/col:opacity-100 transition-opacity pointer-events-none"
                    >
                         <div className="bg-tennis-green/10 p-4 rounded-full pointer-events-auto cursor-pointer hover:bg-tennis-green/20 hover:scale-110 transition-all">
                             <Plus className="w-6 h-6 text-tennis-green" />
                         </div>
                    </button>
                  )}

                  {!hasEvents && !isAuthenticated && (
                    <div className="hidden md:flex flex-1 items-center justify-center opacity-10">
                      <div className="w-1 h-1 bg-gray-500 rounded-full mx-1"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full mx-1"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full mx-1"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        defaultDay={selectedDay}
      />
    </section>
  );
};

export default Schedule;