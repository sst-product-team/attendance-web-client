const fetchAttendanceData = async () => {
  try {
    const response = await fetch(getAttendanceURL);
    if (!response.ok) {
      alert("Failed to fetch course details");
      throw new Error("Failed to fetch course details");
    }
    const courseDetails = await response.json();
    return courseDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchAttendanceData;
