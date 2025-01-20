import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center bg-white text-gray-900">
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Body */}
        <main className="z-10 pt-20 flex-col">{children}</main>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
