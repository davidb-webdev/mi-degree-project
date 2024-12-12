import { Navigate, Route, Routes } from "react-router";
import IntroView from "./views/start/IntroView";
import RegisterView from "./views/start/RegisterView";
import SignInView from "./views/start/SignInView";
import NotFoundView from "./views/NotFoundView";
import StartLayout from "./layouts/StartLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import UserView from "./views/dashboard/UserView";
import DialogLayout from "./layouts/DialogLayout";
import NotesListView from "./views/dashboard/NotesListView";
import NoteView from "./views/dashboard/NoteView";
import ProjectInfoView from "./views/dashboard/InfoView";
import NoteEditView from "./views/dashboard/NoteEditView";

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
                <Route element={<DialogLayout baseUrl="/start" />}>
                  <Route path="register" element={<RegisterView />} />
                  <Route path="signin" element={<SignInView />} />
                </Route>
              </Routes>
            </>
          }
        />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<NotesListView />} />
        <Route path="/dashboard/notes/new" element={<NoteEditView newNote />} />
        <Route path="/dashboard/notes/:id" element={<NoteView />} />
        <Route path="/dashboard/notes/:id/edit" element={<NoteEditView />} />

        <Route element={<DialogLayout baseUrl="/dashboard" />}>
          <Route path="user" element={<UserView />} />
          <Route path="info" element={<ProjectInfoView />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default Router;
