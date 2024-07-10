import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import fetchAttendanceData from "../repository/fetchAttendanceData";
import { useParams } from "react-router-dom";
import bulkMarkAttendance from "../repository/bulkMarkAttendance";
const StatusToAttendanceMap = {
  1: "Present",
  0: "Absent",

  P: "Present",
  A: "Absent",
  p: "Present",
  a: "Absent",

  TRUE: "Present",
  FALSE: "Absent",
};

const AttendanceInjestPage = () => {
  const { subjectClassPK } = useParams();
  const [mailStatus, setMailStatus] = useState([]);
  const mailInputRef = useRef(null);
  const attendanceStatusInputRef = useRef(null);
  const [inputError, setInputError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [serverAttendance, setServerAttendance] = useState({});

  async function fetchServerAttendance() {
    const { all_attendance } = await fetchAttendanceData(subjectClassPK);
    const attendance = {};
    for (let { mail, status } of all_attendance) {
      attendance[mail] = status;
    }
    setServerAttendance(attendance);
    return attendance;
  }

  useEffect(() => {
    fetchServerAttendance();
  }, []);

  async function handelUploadPressed() {
    setUploading(true);
    const request = mailStatus.map(({ mail, status }) => {
      return {
        mail,
        status: status.toLowerCase(),
      };
    });
    bulkMarkAttendance(subjectClassPK, request)
      .then(async () => {
        setUploading(false);
        await fetchServerAttendance();
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  }

  function createZippedMailStatus(emails, statuses, serverAttendance) {
    const zipped = emails.map((mail, i) => {
      mail = mail.replace("@ms.sst.scaler.com", "@sst.scaler.com");
      const status = getStatusFromRaw(statuses[i]);
      const serverStatus = serverAttendance[mail];

      return { mail, status, serverStatus };
    });
    return zipped;
  }

  function updateFromInput() {
    const emails = mailInputRef.current.value.trim().split("\n");
    const statuses = attendanceStatusInputRef.current.value.trim().split("\n");
    if (emails.length !== statuses.length) {
      setInputError("Length mismatch");
      return;
    } else {
      setInputError("");
    }
    if (emails.length === 1 && emails[0] === "") {
      emails.pop();
      statuses.pop();
    }

    const zipped = createZippedMailStatus(emails, statuses, serverAttendance);

    setMailStatus(zipped);
  }
  useEffect(updateFromInput, [serverAttendance]);
  function getStatusFromRaw(value) {
    return StatusToAttendanceMap[value];
  }
  function countStatuses() {
    let presentCount = 0;
    let absentCount = 0;
    let unknownCount = 0;

    for (let { status } of mailStatus) {
      if (status === "Present") {
        presentCount++;
      } else if (status === "Absent") {
        absentCount++;
      } else {
        unknownCount++;
      }
    }
    return { presentCount, absentCount, unknownCount };
  }
  const { presentCount, absentCount, unknownCount } = countStatuses();
  const allKnownMails =
    mailStatus.filter(({ serverStatus }) => !serverStatus).length === 0;

  const uploadDisabled =
    uploading ||
    mailStatus.length === 0 ||
    inputError.length > 0 ||
    !allKnownMails;

  return (
    <div className="flex flex-col gap-8 p-8 h-full">
      <div className="flex justify-evenly h-40">
        <textarea
          ref={mailInputRef}
          rows={5}
          className="border bg-gray-100 w-2/5"
          placeholder="Paste emails from gsheet here"
          onChange={updateFromInput}
        />
        <textarea
          ref={attendanceStatusInputRef}
          rows={5}
          className="border bg-gray-100 1/5"
          placeholder="Paste attendance from gsheet here"
          onChange={updateFromInput}
        />
        {
          <div>
            <button
              disabled={uploadDisabled}
              onClick={handelUploadPressed}
              type="button"
              className={`px-8 py-3 rounded text-white bg-blue-700 ${
                !uploadDisabled ? "hover:bg-blue-800" : "bg-gray-500"
              }`}
            >
              {uploading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  size="1x"
                  color="white"
                />
              ) : (
                <FontAwesomeIcon icon={faUpload} size="1x" color="white" />
              )}
              Upload
            </button>
          </div>
        }
      </div>
      {inputError && <div className="text-red-500">{inputError}</div>}

      <table className="w-full mt-8 text-left bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr className="[&>*]:py-2">
            <th>#</th>
            <th>Emails: ({mailStatus.length})</th>
            <th className="flex flex-col">
              <span>Attendances: ({mailStatus.length})</span>
              <div className="flex flex-wrap gap-4">
                <span>{presentCount} Present</span>
                <span>{absentCount} Absent</span>
                {unknownCount > 0 && <span>{unknownCount} Unknown</span>}
              </div>
            </th>
            <th>Server Status</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {mailStatus.map(({ mail, status, serverStatus }, index) => {
            let style = index % 2 === 0 ? "bg-gray-100" : "bg-white";
            if (!serverStatus) {
              style = "bg-red-400";
            } else if (status === serverStatus) {
              style = "bg-green-400";
            } else {
              style = "bg-yellow-400";
            }

            return (
              <tr className={style} key={index + mail}>
                <td>{index + 1}</td>
                <td className="py-2">{mail}</td>
                <td className="py-2">{status}</td>
                <td className="py-2">{serverStatus || "?"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AttendanceInjestPage;
