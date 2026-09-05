import { RouterProvider } from 'react-router';
// 注意：确保你的 routes 文件名是 routes.tsx，如果是 routes.ts 请重命名一下
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
