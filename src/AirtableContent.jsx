import { useState, useEffect } from 'react';

// ⚠️ weiwei
const AIRTABLE_TOKEN = 'patyF0W1KZWq2vY3Y.81ee26bcf1a4ad9c5c25507adf62684d686c77a8723b68381b236c260c5a27a5'; // 以 pat 开头，很长一串
const BASE_ID = 'appe0azTDJhaS30Se'; // 以 app 开头
const TABLE_NAME = 'Table 1'; // 你的表名，默认是 Table 1

export default function AirtableContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 Airtable 获取数据
    fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('获取到的数据:', data);
      setPosts(data.records || []);
      setLoading(false);
    })
    .catch(err => {
      console.error('获取失败:', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>我的内容列表</h2>
      
      {posts.map((post) => (
        <div key={post.id} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          padding: '15px',
          backgroundColor: '#f9f9f9'
        }}>
          {/* 标题 */}
          <h3>{post.fields.标题 || '无标题'}</h3>
          
          {/* 内容 */}
          <p style={{ color: '#666' }}>{post.fields.内容 || '暂无内容'}</p>
          
          {/* 视频播放 */}
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
          
          {/* 发布时间 */}
          <small style={{ color: '#999' }}>
            发布时间: {post.fields.发布时间 || new Date(post.createdTime).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
