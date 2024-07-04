import { Outlet } from "react-router-dom";

function LayoutPanel() {
  return (
    <body>
      <Outlet />
    </body>
  );
}

export default LayoutPanel;
