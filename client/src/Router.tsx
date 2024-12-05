import { Routes, Route, useLocation } from "react-router";
import BaseLayout from "./layouts/BaseLayout";
import IntroView from "./views/public/IntroView";
import RegisterView from "./views/public/RegisterView";
import SignInView from "./views/public/SignInView";
import NotFoundView from "./views/NotFoundView";
import Modal from "./components/Modal/Modal";

const Router = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <div className="app">
      <Routes location={previousLocation || location}>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<IntroView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>

      {previousLocation && (
        <Routes>
          <Route
            path="/register"
            element={
              <Modal>
                <RegisterView />
              </Modal>
            }
          />
          <Route
            path="/signin"
            element={
              <Modal>
                <SignInView />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default Router;
