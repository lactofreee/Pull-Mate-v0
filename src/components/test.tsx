// app/page.tsx

'use client'; // 클라이언트 컴포넌트

import { useState, useEffect } from 'react';

// Prisma 모델 타입 정의 (실제 프로젝트에서는 @prisma/client에서 가져올 수 있습니다)
interface Post {
  id: number;
  createdAt: string;
  title: string;
  content: string | null;
  published: boolean;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 데이터 조회 (출력/읽기) 함수
  const fetchPosts = async () => {
    setLoading(true);
    try {
      // API 라우트에서 데이터 GET
      const res = await fetch('/api/posts'); 
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 데이터 생성 (입력/쓰기) 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      // API 라우트에 데이터 POST
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        fetchPosts(); // 성공 시 목록 새로고침
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Next.js + TypeScript + Supabase + Prisma 입출력 예시</h1>

      {/* 데이터 입력 폼 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        <h2>새 Post 작성 (입력)</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid #ddd' }}
        />
        <textarea
          placeholder="내용 (선택 사항)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          style={{ padding: '8px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Post 저장
        </button>
      </form>

      {/* 데이터 출력 목록 */}
      <h2>Post 목록 (출력)</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ border: '1px solid #eee', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>작성일: {new Date(post.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}