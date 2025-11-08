'use client';

import React, { useMemo } from 'react';
import {
  useCalendarApp,
  DayFlowCalendar,
  createDayView,
  createWeekView,
  createMonthView,
  createDragPlugin,
  CalendarType,
  ViewType,
} from '@dayflow/core';
import '@dayflow/core/dist/styles.css';

import { CALENDAR_SIDE_PANEL } from '@/utils/palette';
import { generateSampleEvents } from '@/utils/sampleData';

const calendarTypes: CalendarType[] = CALENDAR_SIDE_PANEL.map(item => ({
  id: item.id,
  name: item.name,
  icon: item.icon,
  colors: {
    eventColor: `${item.color}20`,
    eventSelectedColor: `${item.color}`,
    lineColor: item.color,
    textColor: item.color,
  },
  isVisible: true,
}));

export function InteractiveCalendar() {
  const currentView = ViewType.MONTH;

  const events = useMemo(() => generateSampleEvents(), []);

  const dragPlugin = createDragPlugin();

  const views = useMemo(
    () => [createDayView(), createWeekView(), createMonthView()],
    []
  );

  const calendar = useCalendarApp({
    views,
    plugins: [dragPlugin],
    initialDate: new Date(),
    defaultView: currentView,
    events,
    calendars: calendarTypes,
    switcherMode: 'buttons',
    useSidebar: {
      enabled: true,
    },
  });

  return (
    <div className="w-full">
      <DayFlowCalendar
        calendar={calendar}
        className="w-full"
      />
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <strong>Tip:</strong> Try dragging events across weeks, resizing them in
        Week view, or switching to Month view to see all-day scheduling in
        action.
      </div>
    </div>
  );
}

export default InteractiveCalendar;
