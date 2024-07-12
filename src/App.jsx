import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"));
const QuoteListPage = lazy(() => import("./pages/QuoteListPage"));
const QuoteCreationPage = lazy(() => import("./pages/QuoteCreationPage"));

const App = () => {
  return (
    <>
      <Suspense lazy={<div className="text-center text-3xl">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quote-list" element={<QuoteListPage />} />
          <Route path="/quote-creation" element={<QuoteCreationPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
