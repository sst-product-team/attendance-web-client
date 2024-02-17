// StudentRow.js
import React, { useState } from "react";
import markAttendance from "../repository/markAttendance";
import {
  faArrowRotateRight,
  faExclamation,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SyncStatusMap = {
  Updated: 1,
  Syncing: 2,
  Failed: 3,
};

const StudentRow = ({ student, onSyncStart, onSyncComplete, onSyncFailed }) => {
  const [statusSelected, setStatusSelected] = useState("");
  const [syncStatus, setSyncStatus] = useState(SyncStatusMap.Updated);
  const syncMismatch = student.status !== (statusSelected || student.status);

  const focusButtonCss = "z-10 ring-2 ring-blue-700 text-blue-700";

  function setStatusButtonPressed(status) {
    if (syncStatus === SyncStatusMap.Syncing) return;
    setSyncStatus(SyncStatusMap.Syncing);
    onSyncStart(student.mail);

    setStatusSelected(status);
    markAttendance(student.mail, status)
      .then((response) => {
        student.status = response.status;
        setSyncStatus(SyncStatusMap.Updated);
        onSyncComplete(student.mail);
      })
      .catch(() => {
        setSyncStatus(SyncStatusMap.Failed);
        onSyncFailed(student.mail);
      });
  }
  function retrySync() {
    setStatusButtonPressed(statusSelected);
  }
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
    <>
      <td className="py-2">{student.name}</td>
      <td className="py-2">{student.mail}</td>
      <td className="py-2 pr-2">
        {syncStatus === SyncStatusMap.Updated && (
          <div className="flex justify-between">
            <span className={`${getStatusStyle(student.status)}`}>
              {student.status}
            </span>
            {syncMismatch && (
              <FontAwesomeIcon icon={faExclamation} size="2x" color="red" />
            )}
          </div>
        )}
        {syncStatus === SyncStatusMap.Syncing && (
          <FontAwesomeIcon icon={faSyncAlt} spin size="2x" color="blue" />
        )}

        {syncStatus === SyncStatusMap.Failed && (
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            onClick={retrySync}
            size="2x"
            color="red"
          />
        )}
      </td>
      <td className="py-2 flex items-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            disabled={syncStatus === SyncStatusMap.Syncing}
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ${
              statusSelected === "Present" ? focusButtonCss : ""
            }`}
            onClick={() => {
              setStatusButtonPressed("Present");
            }}
          >
            Present
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border hover:bg-gray-100 hover:text-blue-700  ${
              statusSelected === "Absent" ? focusButtonCss : ""
            }`}
            onClick={() => {
              setStatusButtonPressed("Absent");
            }}
          >
            Absent
          </button>

          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border  rounded-e-lg hover:bg-gray-100 hover:text-blue-700  ${
              statusSelected === "Proxy" ? focusButtonCss : ""
            }`}
            onClick={() => {
              setStatusButtonPressed("Proxy");
            }}
          >
            Proxy
          </button>
        </div>
      </td>
    </>
  );
};

export default StudentRow;
