import { useState, useEffect } from 'react';

// ⚠️ 必须替换这里！
const AIRTABLE_TOKEN = 'patebT1em6haiR8Uw.b85e1a19dfed0bcbd689c9fed04016b951129591169aad101c767d1e7f9e03c1'; // 以 pat 开头，从上面链接创建
const BASE_ID = 'appe0azTDJhaS30Se'; // 你的 Base ID（appe0az...）
const TABLE_NAME = 'Table 1';

interface Post {
  id: string;
  fields: {
    标题?: string;
    内容?: string;
    视频?: Array<{ url: string }>;
    封面图?: Array<{ url: string }>;
    发布时间?: string;
  };
  createdTime: string;
}

export default function AirtableContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error(`错误码: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log('数据:', data);
      if (data.error) throw new Error(data.error.message);
      setPosts(data.records || []);
      setLoading(false);
    })
    .catch(err => {
      console.error('失败:', err);
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding: 20, textAlign: 'center'}}>加载中...</div>;
  if (error) return <div style={{padding: 20, color: 'red'}}>错误: {error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>我的内容</h2>
      {posts.length === 0 && <p>暂无数据</p>}
      
      {posts.map((post) => (
        <div key={post.id} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          padding: '15px' 
        }}>
          <h3>{post.fields.标题 || '无标题'}</h3>
          <p>{post.fields.内容 || '暂无内容'}</p>
          
          {post.fields.视频?.[0] && (
            <video 
              src={post.fields.视频[0].url} 
              controls 
              width="100%" 
              style={{ borderRadius: '4px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
