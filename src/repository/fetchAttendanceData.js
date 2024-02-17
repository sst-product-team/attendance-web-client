const fetchAttendanceData = async () => {
  try {
    const response = await fetch(getAttendanceURL);
    if (!response.ok) {
      alert("Failed to fetch course details");
      throw new Error("Failed to fetch course details");
    }
    const attendanceData = await response.json();

    const sortByEmail = (a, b) => a.mail.localeCompare(b.mail);
    attendanceData["all_attendance"] =
      attendanceData["all_attendance"].sort(sortByEmail);
    return attendanceData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchAttendanceData;
