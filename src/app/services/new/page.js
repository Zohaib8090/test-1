'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostServicePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tutoring',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const platformFeePercentage = 0.10; // 10%
  const price = parseFloat(formData.price) || 0;
  const platformFee = (price * platformFeePercentage).toFixed(2);
  const earnings = (price - platformFee).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // For prototype, we use a mock seller_id (Alice = 1)
    const payload = {
      ...formData,
      seller_id: 1,
      price: parseFloat(formData.price),
      platform_fee: parseFloat(platformFee)
    };

    const res = await fetch('/api/services/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to post service');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }} className="glass card">
      <h2 style={{ marginBottom: '2rem' }} className="gradient-text">List Your Skill</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Service Title</label>
          <input 
            className="glass"
            placeholder="e.g. Advanced Calculus Tutoring"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
          <select 
            className="glass"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            style={{ width: '100%' }}
          >
            <option value="Tutoring">Tutoring</option>
            <option value="Design">Design</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
          <textarea 
            className="glass"
            placeholder="Describe what you offer and your experience..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
            style={{ width: '100%', height: '100px' }}
          ></textarea>
        </div>

        <div style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price ($)</label>
            <input 
              type="number"
              className="glass"
              placeholder="0.00"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="glass" style={{ padding: '0.8rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span>Platform Fee (10%):</span>
              <span style={{ color: 'var(--error)' }}>-${platformFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '0.2rem' }}>
              <span>You Earn:</span>
              <span style={{ color: 'var(--success)' }}>${earnings}</span>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem' }}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Service Listing'}
        </button>
      </form>
    </div>
  );
}
