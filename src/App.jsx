import React, { lazy, Suspense, useEffect, useState } from "react";
import Progress from "./components/Progress";
import fetchAttendanceData from "./repository/fetchAttendanceData";

const StudentPage = lazy(() => import("./pages/StudentPage"));
const InstructorPage = lazy(() => import("./pages/InstructorPage"));

const App = () => {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAttendanceData();
      setAttendanceData(data);
      console.log(data);
    }

    fetchData();
  }, []);

  if (attendanceData === null) {
    return <Progress />;
  }

  if (attendanceData.can_mark_attendance === true) {
    return (
      <Suspense fallback={<Progress />}>
        <InstructorPage
          allAttendance={attendanceData.all_attendance}
          classDetails={attendanceData.current_class}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Progress />}>
        <StudentPage
          allAttendance={attendanceData.all_attendance}
          classDetails={attendanceData.current_class}
        />
      </Suspense>
    );
  }
};

export default App;
