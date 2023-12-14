import { FaExclamationCircle } from "react-icons/fa/index.js";
import sharedStyles from "../../styles/shared.css";

function Error({ title, children }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
