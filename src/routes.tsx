import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import NotFound from './pages/NotFound';
import GlobalError from './components/GlobalError'; // 👈 引入已写好的全局错误捕获组件

// 🚀 直接引入，消除懒加载带来的动画闪烁问题
import Home from "./pages/Home";
import Product from "./pages/Product";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import TrustAndSafety from "./pages/TrustAndSafety";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TimedConnections from "./pages/TimedConnections";
import AICompanion from "./pages/AICompanion";
import FAQ from "./pages/FAQ";
import Login from './pages/Login';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <GlobalError />, // 👈 修复：当 React 组件抛出运行时异常时，渲染全局错误页面
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      { path: "features", element: <Features /> },
      { path: "timed-connections", element: <TimedConnections /> },
      { path: "ai-companion", element: <AICompanion /> },
      { path: "pricing", element: <Pricing /> },
      { path: "safety", element: <TrustAndSafety /> },
      { path: "support", element: <Support /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "faq", element: <FAQ /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> }, // 👈 修复：仅作为 URL 路径未匹配时的 404 兜底
    ],
  },
]);