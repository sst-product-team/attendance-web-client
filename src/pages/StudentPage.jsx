import ClassDetails from "../components/ClassDetails";
import Header from "../components/Header";

const StudentPage = ({ allAttendance, classDetails }) => {
  function getStatusStyle(status) {
    if (status === "Present") {
      return "text-sky-700";
    } else if (status === "Absent") {
      return "text-red-700";
    } else if (status === "Proxy") {
      return "text-red-950";
    } else {
      return "";
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Header student={true} classDetails={classDetails} />
      </div>
      <div className="h-full w-full">
        <table className="w-full mt-8 text-left bg-white border border-gray-300">
          <thead className="bg-gray-200 sticky top-0 z-40">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Attendance</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {allAttendance.map((student, index) => (
              <tr
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                key={student.mail}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{student.name}</td>
                <td className="py-2">{student.mail}</td>
                <td className="py-2 pr-2">
                  <div className="flex justify-between">
                    <span className={`${getStatusStyle(student.status)}`}>
                      {student.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPage;
