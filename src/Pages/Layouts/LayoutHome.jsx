import { Outlet } from "react-router-dom";

function LayoutHome() {
  return (
    <body style={{padding:"0px"}}>
      <Outlet />
    </body>
  );
}

export default LayoutHome;
