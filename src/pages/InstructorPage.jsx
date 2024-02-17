// InstructorPage.js
import React, { useState, useEffect } from "react";
import ClassDetails from "../components/ClassDetails";
import StudentRow from "../components/StudentRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

const InstructorPage = ({ allAttendance, classDetails }) => {
  const [syncingSet, setSyncingSet] = useState(new Set());
  const [syncFailedSet, setSyncFailedSet] = useState(new Set());

  function addToSyncing(mail) {
    const newSyncingSet = new Set(syncingSet);
    newSyncingSet.add(mail);
    setSyncingSet(newSyncingSet);
  }
  function removeFromSyncing(mail) {
    const newSyncingSet = new Set(syncingSet);
    newSyncingSet.delete(mail);
    setSyncingSet(newSyncingSet);
  }
  function addToSyncingFailed(mail) {
    const newSyncingSet = new Set(syncFailedSet);
    newSyncingSet.add(mail);
    setSyncFailedSet(newSyncingSet);
  }
  function removeFromSyncingFailed(mail) {
    const newSyncingSet = new Set(syncFailedSet);
    newSyncingSet.delete(mail);
    setSyncFailedSet(newSyncingSet);
  }

  return (
    <div className="">
      <ClassDetails classDetails={classDetails} />

      <div className="fixed top-10 right-4 z-50 flex gap-2 ">
        {syncingSet.size > 0 && (
          <div className="font-medium gap-1 text-center">
            <span className="font-bold text-xl">{syncingSet.size}</span>
            <FontAwesomeIcon icon={faSyncAlt} spin size="2x" color="blue" />
          </div>
        )}
        {syncFailedSet.size > 0 && (
          <div className="font-medium gap-1 text-center">
            <span className="font-bold text-xl">{syncFailedSet.size}</span>
            <FontAwesomeIcon icon={faCircleExclamation} size="2x" color="red" />
          </div>
        )}

        {"" && (
          <p
            className={
              syncStatus === "Synced successfully"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {syncStatus}
          </p>
        )}
      </div>
      <div className="h-full w-full">
        <table className="w-full mt-8 text-left bg-white border border-gray-300">
          <thead className="bg-gray-200 sticky top-0 z-40">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Attendance</th>
              <th className="py-2 text-center">Change to</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {allAttendance.map((student, index) => (
              <tr
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                key={student.mail}
              >
                <td className="py-2">{index + 1}</td>
                <StudentRow
                  student={student}
                  onSyncStart={(mail) => {
                    //                    addToSyncing(mail);
                    //                    removeFromSyncingFailed(mail);
                  }}
                  onSyncComplete={(mail) => {
                    //                    removeFromSyncing(mail);
                    //                    removeFromSyncingFailed(mail);
                  }}
                  onSyncFailed={(mail) => {
                    //                    removeFromSyncing(mail);
                    //                    addToSyncingFailed(mail);
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorPage;
