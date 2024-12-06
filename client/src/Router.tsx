import { Navigate, Route, Routes, useLocation } from "react-router";
import IntroView from "./views/start/IntroView";
import RegisterView from "./views/start/RegisterView";
import SignInView from "./views/start/SignInView";
import NotFoundView from "./views/NotFoundView";
import StartLayout from "./layouts/StartLayout";
import DashboardView from "./views/dashboard/DashboardView";
import NotesView from "./views/dashboard/NotesView";
import DashboardLayout from "./layouts/DashboardLayout";
import UserView from "./views/dashboard/UserView";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start" />} />

      <Route element={<StartLayout />}>
        <Route
          path="/start/*"
          element={
            <>
              <IntroView />
              <Routes>
                <Route path="register" element={<RegisterView />} />
                <Route path="signin" element={<SignInView />} />
              </Routes>
            </>
          }
        />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard/*"
          element={
            <>
              <DashboardView />
              <Routes>
                <Route path="notes" element={<NotesView />} />
                <Route path="user" element={<UserView />} />
              </Routes>
            </>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default Router;
