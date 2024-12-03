import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import NotFound from "./views/NotFound";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
			{
        path: "/",
        element: <App />,
        index: true,
      },
		]
  }
]);
