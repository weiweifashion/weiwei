import { useState, useEffect } from 'react';

// ⚠️ wewei
const AIRTABLE_TOKEN = 'patyF0W1KZWq2vY3Y.81ee26bcf1a4ad9c5c25507adf62684d686c77a8723b68381b236c260c5a27a5';
const BASE_ID = 'appe0azTDJhaS30Se';
const TABLE_NAME = 'Table 1';

// 定义数据类型
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
    // ❌ 错误：原来这里有个空格 'v0/ ${BASE_ID}' 会导致 404
    // ✅ 正确：删掉空格
    fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('获取到的数据:', data);
      if (data.error) {
        throw new Error(data.error.message);
      }
      setPosts(data.records || []);
      setLoading(false);
    })
    .catch(err => {
      console.error('获取失败:', err);
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>加载中...</div>;
  
  if (error) return (
    <div style={{ color: 'red', padding: '20px' }}>
      加载失败: {error}<br/>
      请检查 Token 和 Base ID 是否正确
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>我的内容列表</h2>
      
      {posts.length === 0 && <p>暂无数据，请在 Airtable 中添加内容</p>}
      
      {posts.map((post) => (
        <div key={post.id} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          padding: '15px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>{post.fields.标题 || '无标题'}</h3>
          <p style={{ color: '#666' }}>{post.fields.内容 || '暂无内容'}</p>
          
          {post.fields.视频 && post.fields.视频[0] && (
            <div style={{ marginTop: '10px' }}>
              <video 
                src={post.fields.视频[0].url} 
                controls 
                width="100%" 
                style={{ borderRadius: '4px' }}
                poster={post.fields.封面图 ? post.fields.封面图[0].url : ''}
              />
            </div>
          )}
          
          <small style={{ color: '#999' }}>
            发布时间: {post.fields.发布时间 || new Date(post.createdTime).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
