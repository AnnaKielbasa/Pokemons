import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div>Error! Page not found</div>
      <div>
        <button>
          <Link to="/">Strona Główna</Link>
        </button>
      </div>
    </>
  );
};

export default Error;
