import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faLink,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ classDetails, student }) => {
  return (
    <div className="w-full flex justify-between">
      <h2 className="text-3xl font-medium">{classDetails.name}</h2>
      <div className="flex justify-evenly gap-4">
        {student && (
          <a className="text-blue-600" href="/accounts/login">
            <FontAwesomeIcon icon={faLink} size="1x" color="blue" />
            login
          </a>
        )}
        {student && <p>This page is updated every 5 min</p>}

        {student || (
          <a
            href={`${getAttendanceURL + "download/"}`}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-s-lg hover:bg-gray-100 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faDownload} size="1x" color="blue" />
            Export to CSV
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;

//       <FontAwesomeIcon icon={faSpinner} spin size="3x" color="blue" />
