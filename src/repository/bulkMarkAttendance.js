function bulkMarkAttendance(pk, data) {
  const url = `/attendance/v0/builk_mark_attendance/${pk}/`;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          mode: "same-origin",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonData = await response.json();

        console.log(
          `Attendance of ${jsonData["mail"]} marked to ${jsonData["status"]}`,
        );
        resolve(jsonData);
      } else {
        reject();
      }
    } catch (error) {
      reject({ message: error });
      console.error("Error fetching JSON data:", error);
    }
  });
}

export default bulkMarkAttendance;
