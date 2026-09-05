import { useEffect } from 'react';

// 1. 新的标准化命名，支持 title 和 description
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    // 更新网页标题
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // 更新描述 (如果传入了的话)
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', description);
    }
  }, [title, description]);
}

// 2. 🚀 核心修复：向下兼容旧页面的引入！
// 这样无论其他页面是 import { useDocumentTitle } 还是 import { usePageMeta }，都不会报错了！
export const useDocumentTitle = usePageMeta;