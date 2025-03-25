import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";

const ScheduleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch schedules from backend
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/getallschedule"
      );
      const data = await response.json();

      if (response.ok) {
        const formattedEvents = data.data.map((schedule) => ({
          id: schedule.id,
          title: `${schedule.course?.name || "Untitled"} (${schedule.venue})`,
          start: schedule.startTime,
          end: schedule.endTime,
          extendedProps: {
            courseName: schedule.course?.name,
            venue: schedule.venue,
            description: schedule.description,
            recipientType: schedule.recipientType,
          },
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      toast.error("Failed to fetch schedules");
    }
  };

  // Handle clicking on a date (for adding new events)
  const handleDateClick = (arg) => {
    setCurrentEvent({
      start: arg.dateStr,
      end: arg.dateStr,
    });
    setShowModal(true);
  };

  // Handle clicking on an event (for editing)
  const handleEventClick = (arg) => {
    setCurrentEvent({
      id: arg.event.id,
      title: arg.event.extendedProps.courseName,
      start: arg.event.start,
      end: arg.event.end,
      ...arg.event.extendedProps,
    });
    setShowModal(true);
  };

  // Handle event updates (drag & drop, resize)
  const handleEventChange = async (eventChangeInfo) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/updateschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: eventChangeInfo.event.id,
            date: eventChangeInfo.event.start.toISOString().split("T")[0],
            startTime: eventChangeInfo.event.start.toISOString(),
            endTime: eventChangeInfo.event.end?.toISOString(),
            venue: eventChangeInfo.event.extendedProps.venue,
            description: eventChangeInfo.event.extendedProps.description,
            recipientType: eventChangeInfo.event.extendedProps.recipientType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update schedule");
      }
      toast.success("Schedule updated successfully");
    } catch (error) {
      toast.error(error.message);
      eventChangeInfo.revert(); // Revert changes if API fails
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/deleteschedule",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: currentEvent.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }
      toast.success("Schedule deleted successfully");
      setShowModal(false);
      fetchSchedules(); // Refresh the calendar
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle saving new/updated event
  const handleSaveEvent = async () => {
    try {
      const url = currentEvent.id
        ? "http://localhost:8080/api/admin/updateschedule"
        : "http://localhost:8080/api/admin/addschedule";

      const method = currentEvent.id ? "POST" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentEvent.id,
          courseName: currentEvent.title,
          date: new Date(currentEvent.start).toISOString().split("T")[0],
          startTime: new Date(currentEvent.start).toISOString(),
          endTime: currentEvent.end
            ? new Date(currentEvent.end).toISOString()
            : null,
          venue: currentEvent.venue,
          description: currentEvent.description,
          recipientType: currentEvent.recipientType,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${currentEvent.id ? "update" : "add"} schedule`
        );
      }

      toast.success(
        `Schedule ${currentEvent.id ? "updated" : "added"} successfully`
      );
      setShowModal(false);
      fetchSchedules();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Schedule Calendar
      </h2>

      <div className="fc-custom">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          height="auto"
          nowIndicator={true}
          eventContent={(eventInfo) => (
            <div className="fc-event-content">
              <div className="font-medium">{eventInfo.event.title}</div>
              <div className="text-xs">
                {eventInfo.timeText} • {eventInfo.event.extendedProps.venue}
              </div>
            </div>
          )}
        />
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              {currentEvent?.id ? "Edit Schedule" : "Add Schedule"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="title"
                value={currentEvent?.title || ""}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent, title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={
                  currentEvent?.start
                    ? new Date(currentEvent.start).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent, start: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={
                    currentEvent?.start
                      ? new Date(currentEvent.start)
                          .toISOString()
                          .split("T")[1]
                          .substring(0, 5)
                      : ""
                  }
                  onChange={(e) => {
                    const date = currentEvent.start.split("T")[0];
                    setCurrentEvent({
                      ...currentEvent,
                      start: `${date}T${e.target.value}:00Z`,
                    });
                  }}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={
                    currentEvent?.end
                      ? new Date(currentEvent.end)
                          .toISOString()
                          .split("T")[1]
                          .substring(0, 5)
                      : ""
                  }
                  onChange={(e) => {
                    const date = currentEvent.start.split("T")[0];
                    setCurrentEvent({
                      ...currentEvent,
                      end: `${date}T${e.target.value}:00Z`,
                    });
                  }}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={currentEvent?.venue || ""}
                onChange={(e) =>
                  setCurrentEvent({ ...currentEvent, venue: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Type
              </label>
              <select
                name="recipientType"
                value={currentEvent?.recipientType || ""}
                onChange={(e) =>
                  setCurrentEvent({
                    ...currentEvent,
                    recipientType: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select</option>
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="all">All</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={currentEvent?.description || ""}
                onChange={(e) =>
                  setCurrentEvent({
                    ...currentEvent,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-2">
              {currentEvent?.id && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
