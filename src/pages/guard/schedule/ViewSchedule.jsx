import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";

const events = [
  {
    title: "TRỰC DOM A",
    start: "2023-10-13T08:00:00",
    end: "2023-10-13T16:00:00",
  },
  {
    title: "ĐM MÔN SWP",
    start: "2023-10-14T01:00:00",
    end: "2023-10-14T08:00:00",
  },
  // Thêm các sự kiện khác ở đây
];

function ViewSchedule() {
  return (
    <Container style={{ marginBottom: "20px", marginTop: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "timeGridWeek",
        }}
        height="90vh"
        slotDuration="08:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        allDaySlot={false}
        slotLabelContent={(arg) => {
          // Sử dụng hàm này để tùy chỉnh nội dung của nhãn
          if (arg.text === "24:00") {
            return <div style={{ height: "25vh" }}>Shift 1: 00h00 - 08h00</div>;
          } else if (arg.text === "08:00") {
            return <div style={{ height: "25vh" }}>Shift 2: 08h00 - 16h00</div>;
          } else if (arg.text === "16:00") {
            return <div style={{ height: "25vh" }}>Shift 3: 16h00 - 00h00</div>;
          } else {
            return "";
          }
        }}
        events={events} // Đưa danh sách sự kiện vào FullCalendar
        eventDisplay="auto" // Sử dụng "auto" để tự động thay đổi kích thước của event
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={(eventInfo) => {
          return (
            <div>
              <b>{eventInfo.timeText}</b>
              <p>{eventInfo.event.title}</p>
              <p>{eventInfo.event.extendedProps.description}</p>
            </div>
          );
        }}
      />
    </Container>
  );
}

export default ViewSchedule;
