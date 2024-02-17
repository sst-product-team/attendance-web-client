function markAttendance(mail, status) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(markAttendanceURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: mail.toLowerCase(),
          status: status.toLowerCase(),
        }),
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
      reject();
      console.error("Error fetching JSON data:", error);
    } finally {
    }
  });
}

export default markAttendance;
