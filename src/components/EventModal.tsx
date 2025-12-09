import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { ScheduleEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: ScheduleEvent; // If editing
  defaultDay?: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'; // If adding new
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event, defaultDay }) => {
  const { t } = useLanguage();
  const { addScheduleEvent, updateScheduleEvent, deleteScheduleEvent } = useContent();

  const [formData, setFormData] = useState<Partial<ScheduleEvent>>({
    dayOfWeek: 'Mon',
    time: '10:00 AM',
    title: '',
    location: '',
    type: 'training',
    details: ''
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (defaultDay) {
      setFormData(prev => ({ ...prev, dayOfWeek: defaultDay, id: undefined, title: '', location: '', details: '', time: '10:00 AM' }));
    }
  }, [event, defaultDay, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event && event.id) {
        // Update existing
        updateScheduleEvent({ ...formData, id: event.id } as ScheduleEvent);
    } else {
        // Create new
        const newEvent: ScheduleEvent = {
            ...formData as ScheduleEvent,
            id: Date.now().toString()
        };
        addScheduleEvent(newEvent);
    }
    onClose();
  };

  const handleDelete = () => {
    if (event && event.id) {
        deleteScheduleEvent(event.id);
        onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-6 max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">
            {event ? t.schedule.editEvent : t.schedule.addEvent}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.day}</label>
                    <select 
                        value={formData.dayOfWeek}
                        onChange={e => setFormData({...formData, dayOfWeek: e.target.value as any})}
                        className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    >
                        {Object.entries(t.schedule.days).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.time}</label>
                    <input 
                        type="text" 
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.title}</label>
                <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                />
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.type}</label>
                <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                >
                    <option value="training">{t.schedule.types.training}</option>
                    <option value="match">{t.schedule.types.match}</option>
                    <option value="tournament">{t.schedule.types.tournament}</option>
                </select>
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.location}</label>
                <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                />
            </div>

            <div>
                <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{t.schedule.form.details}</label>
                <textarea 
                    value={formData.details}
                    onChange={e => setFormData({...formData, details: e.target.value})}
                    rows={2}
                    className="w-full bg-black/30 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                />
            </div>

            <div className="flex gap-3 pt-2">
                {event && (
                    <button 
                        type="button" 
                        onClick={handleDelete}
                        className="flex-1 bg-red-500/10 text-red-500 border border-red-500/50 py-2 rounded font-bold uppercase text-xs hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-3 h-3" /> {t.schedule.delete}
                    </button>
                )}
                <button 
                    type="submit"
                    className="flex-[2] bg-tennis-green text-black py-2 rounded font-bold uppercase text-xs hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                    <Save className="w-3 h-3" /> {t.schedule.save}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;