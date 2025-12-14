"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "@/components/authenticated-layout";

// Toast function
const toast = (options: { title: string; description: string; variant?: string }) => {
  console.log(`${options.title}: ${options.description}`);
};

// TypeScript Interfaces
interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  title: string;
  company: string;
  location: string;
  website?: string;
  email: string;
  joinedDate: string;
  stats: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  isFollowing: boolean;
}

interface Post {
  id: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  likes: number;
  comments: number;
  title?: string;
  timestamp?: string;
}

interface Experience {
  title: string;
  company: string;
  startYear: number;
  endYear: number | string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
}

interface Certification {
  title: string;
  issuer: string;
}

// Mock data
const mockProfile: UserProfile = {
  id: '1',
  name: 'Dev Teotia',
  username: 'devteotia',
  avatar: '',
  bio: 'Web Developer | Next.js | Java Enthusiast',
  title: 'Senior Web Developer',
  company: 'Tech Company Inc.',
  location: 'India',
  website: 'devteotia.netlify.app',
  email: 'devteotia1511@gmail.com',
  joinedDate: 'Joined June 2020',
  stats: {
    followers: 12500,
    following: 842,
    posts: 156,
    likes: 12500
  },
  isFollowing: false
};

const mockPosts: Post[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    likes: 245,
    comments: 32,
    title: 'React Best Practices',
    timestamp: '2h ago'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    likes: 189,
    comments: 24,
    title: 'Next.js Guide',
    timestamp: '1d ago'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516534775068-bb57ce12cb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    likes: 156,
    comments: 18,
    title: 'Web Development',
    timestamp: '3d ago'
  }
];

const mockExperience: Experience[] = [
  {
    title: 'Senior Web Developer',
    company: 'Tech Company Inc.',
    startYear: 2022,
    endYear: 'Present',
    description: 'Leading front-end development, architecting scalable solutions, mentoring junior developers.'
  },
  {
    title: 'Web Developer',
    company: 'StartUp Solutions',
    startYear: 2020,
    endYear: 2022,
    description: 'Developed responsive web applications, optimized performance, collaborated with design team.'
  }
];

const mockEducation: Education[] = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'University of Technology',
    startYear: 2016,
    endYear: 2020
  }
];

const mockCertifications: Certification[] = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services'
  },
  {
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud'
  }
];

const mockInterestPosts: Post[] = [
  {
    id: 'i1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 120,
    comments: 15,
    title: 'Getting Started with React',
    timestamp: '5h ago'
  },
  {
    id: 'i2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 95,
    comments: 12,
    title: 'JavaScript Tips & Tricks',
    timestamp: '8h ago'
  },
  {
    id: 'i3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516534775068-bb57ce12cb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 108,
    comments: 18,
    title: 'CSS Modern Layouts',
    timestamp: '1d ago'
  },
  {
    id: 'i4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 142,
    comments: 22,
    title: 'Node.js Best Practices',
    timestamp: '2d ago'
  },
  {
    id: 'i5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 87,
    comments: 10,
    title: 'Cloud Computing 101',
    timestamp: '3d ago'
  },
  {
    id: 'i6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516534775068-bb57ce12cb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    likes: 165,
    comments: 28,
    title: 'AI & Machine Learning',
    timestamp: '4d ago'
  }
];

function ProfileContent() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  // State management
  const [profile, setProfile] = useState<UserProfile | null>(mockProfile);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [savedPosts, setSavedPosts] = useState<Post[]>(mockPosts.slice(0, 2));
  const [taggedPosts, setTaggedPosts] = useState<Post[]>(mockPosts.slice(1, 3));
  const [experience, setExperience] = useState<Experience[]>(mockExperience);
  const [education, setEducation] = useState<Education[]>(mockEducation);
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications);
  const [interestPosts, setInterestPosts] = useState<Post[]>(mockInterestPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>(mockProfile);

  // Check if current user's profile
  const isCurrentUser = session?.user?.id === id;

  // Update edited profile when profile changes
  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  // Handle edit profile toggle
  const handleEditProfile = () => {
    if (isEditing) {
      // Reset to original profile data when canceling edit
      setEditedProfile(profile || {});
    }
    setIsEditing(!isEditing);
  };

  // Handle save profile changes
  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedProfile: UserProfile = {
        id: profile?.id || '', // Make sure id is always a string
        name: editedProfile.name || profile?.name || '',
        username: editedProfile.username || profile?.username || '',
        bio: editedProfile.bio || profile?.bio || '',
        title: editedProfile.title || profile?.title || '',
        company: editedProfile.company || profile?.company || '',
        location: editedProfile.location || profile?.location || '',
        website: editedProfile.website || profile?.website || '',
        email: editedProfile.email || profile?.email || '',
        avatar: editedProfile.avatar !== undefined ? editedProfile.avatar : profile?.avatar,
        joinedDate: profile?.joinedDate || new Date().toISOString(),
        stats: profile?.stats || { followers: 0, following: 0, posts: 0, likes: 0 },
        isFollowing: profile?.isFollowing || false
      };

      setProfile(updatedProfile);
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  // Handle input change during editing
  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar remove
  const handleAvatarRemove = () => {
    setEditedProfile(prev => ({
      ...prev,
      avatar: ''
    }));
  };

  // Handle follow/unfollow
  const handleFollow = async () => {
    if (!profile) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setProfile(prev => ({
        ...prev!,
        isFollowing: !prev?.isFollowing,
        stats: {
          ...prev!.stats,
          followers: prev!.isFollowing
            ? prev!.stats.followers - 1
            : prev!.stats.followers + 1
        }
      }));

      toast({
        title: 'Success',
        description: profile.isFollowing
          ? 'Unfollowed successfully'
          : 'Followed successfully',
      });
    } catch (error) {
      console.error('Error updating follow status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update follow status',
        variant: 'destructive',
      });
    }
  };

  // Handle action button clicks
  const handleActionButtonClick = (action: string) => {
    toast({
      title: 'Action',
      description: `${action} clicked`,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Profile not found state
  if (!profile) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Profile not found</h2>
        <p style={{ color: '#999', marginBottom: '24px' }}>The requested profile could not be found.</p>
        <button
          onClick={() => router.push('/')}
          style={{
            background: '#2180b5',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-8">
      <style>{`
        :root {
          --color-primary: #2180b5;
          --color-text: #1f2121;
          --color-text-light: #626c71;
          --color-bg: #fcfcf9;
          --color-surface: #ffffff;
          --color-border: #e0e0e0;
          --spacing-sm: 12px;
          --spacing-md: 16px;
          --spacing-lg: 24px;
          --radius: 8px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-text);
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-md);
        }

        .profile-banner-container {
          position: relative;
          margin: 0 calc(var(--spacing-md) * -1);
          margin-top: calc(var(--spacing-md) * -1);
          margin-bottom: var(--spacing-lg);
          border-radius: var(--radius) var(--radius) 0 0;
          overflow: hidden;
        }

        .profile-banner {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #2180b5 0%, #1a6c93 100%);
        }

        .profile-info-section {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-top: none;
          margin: 0 calc(var(--spacing-md) * -1);
          margin-bottom: var(--spacing-lg);
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          border-radius: 0 0 var(--radius) var(--radius);
        }

        .profile-dp-edit {
          position: relative;
          flex-shrink: 0;
        }

        .profile-dp {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
          border: 4px solid var(--color-surface);
          margin-top: -150px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 120px;
          font-weight: bold;
          color: #999;
          overflow: hidden;
        }

        .profile-dp img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-edit-btn {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          border: 2px solid var(--color-surface);
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .profile-edit-btn:hover {
          background: #1a6c93;
          transform: scale(1.1);
        }

        .profile-edit-btn.hidden {
          display: none;
        }

        .profile-details {
          flex: 1;
          padding-left: var(--spacing-lg);
        }

        .profile-name-block {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .profile-name {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: var(--color-text);
        }

        .verified-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .profile-headline {
          font-size: 18px;
          font-weight: 500;
          color: var(--color-text-light);
          margin-bottom: var(--spacing-md);
        }

        .profile-location {
          font-size: 14px;
          color: var(--color-text-light);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .profile-action-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .action-btn {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: var(--spacing-md) var(--spacing-lg);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--color-text);
        }

        .action-btn:hover {
          background: var(--color-bg);
          border-color: var(--color-primary);
        }

        .section-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: var(--spacing-lg);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          margin-bottom: var(--spacing-lg);
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 2px solid var(--color-border);
        }

        .item {
          margin-bottom: var(--spacing-lg);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .item-title {
          font-weight: 600;
          font-size: 15px;
          color: var(--color-text);
        }

        .item-subtitle {
          color: var(--color-text-light);
          font-size: 13px;
        }

        .item-date {
          color: var(--color-text-light);
          font-size: 12px;
        }

        .item-description {
          color: var(--color-text);
          font-size: 14px;
          margin-top: 4px;
        }

        .post-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .post-item {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: var(--spacing-md);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .post-item:hover {
          background: var(--color-surface);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .post-item-title {
          font-weight: 500;
          font-size: 13px;
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .post-item-meta {
          font-size: 11px;
          color: var(--color-text-light);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--color-border);
          border-top: 4px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .profile-banner {
            height: 150px;
          }

          .profile-dp {
            width: 150px;
            height: 150px;
            margin-top: -75px;
            font-size: 60px;
          }

          .profile-info-section {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
          }

          .profile-details {
            padding-left: 0;
          }

          .profile-action-buttons {
            grid-template-columns: repeat(2, 1fr);
          }

          .post-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
        }
      `}</style>

      {/* Profile Banner Section */}
      <div className="profile-banner-container">
        <div className="profile-banner"></div>
        <div className="profile-info-section">
          <div className="profile-dp-edit">
            <div className="profile-dp">
              {isEditing ? (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="avatar-upload" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
                    {editedProfile.avatar ? (
                      <img 
                        src={editedProfile.avatar} 
                        alt={editedProfile.name || 'Profile'} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '120px',
                        fontWeight: 'bold',
                        color: '#999',
                        backgroundColor: '#f0f0f0'
                      }}>
                        {editedProfile.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </label>
                  {editedProfile.avatar && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAvatarRemove();
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Remove photo"
                    >
                      ×
                    </button>
                  )}
                </>
              ) : profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '120px',
                  fontWeight: 'bold',
                  color: '#999',
                  backgroundColor: '#f0f0f0'
                }}>
                  {profile?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            {isCurrentUser && (
              <button
                className="profile-edit-btn"
                onClick={handleEditProfile}
                title={isEditing ? 'Cancel Edit' : 'Edit Profile'}
              >
                {isEditing ? '×' : '✎'}
              </button>
            )}
          </div>
          <div className="profile-details">
            <div className="profile-name-block">
              <h1 className="profile-name">{profile.name}</h1>
              <span className="verified-badge">✓</span>
            </div>
            <div className="profile-headline">{profile.title} | Next | Java</div>
            <div className="profile-location">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
            {profile.website && (
              <div className="profile-link" style={{ marginTop: '8px' }}>
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#2180b5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>🌐</span> {profile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {profile.email && (
              <div className="profile-email" style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✉️</span> {profile.email}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Action Buttons */}
      <div className="profile-action-buttons">
        <button
          className="action-btn"
          onClick={() => handleActionButtonClick('Saved Items')}
        >
          Saved Items
        </button>
        <button
          className="action-btn"
          onClick={() => handleActionButtonClick('Applications')}
        >
          Applications
        </button>
        <button
          className="action-btn"
          onClick={() => handleActionButtonClick('Resume')}
        >
          Resume
        </button>
        <button
          className="action-btn"
          onClick={() => handleActionButtonClick('Posts')}
        >
          Posts
        </button>
      </div>

      {/* Experience Section */}
      <div className="section-card">
        <div className="section-title">➜ EXPERIENCE</div>
        {experience.map((exp, idx) => (
          <div key={idx} className="item">
            <div className="item-header">
              <span className="item-title">{exp.title}</span>
              <span className="item-date">
                {exp.startYear} - {exp.endYear}
              </span>
            </div>
            <div className="item-subtitle">{exp.company}</div>
            <div className="item-description">{exp.description}</div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="section-card">
        <div className="section-title">➜ EDUCATION</div>
        {education.map((edu, idx) => (
          <div key={idx} className="item">
            <div className="item-header">
              <span className="item-title">{edu.degree}</span>
              <span className="item-date">
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            <div className="item-subtitle">{edu.institution}</div>
          </div>
        ))}
      </div>

      {/* Licenses & Certifications Section */}
      <div className="section-card">
        <div className="section-title">➜ LICENSES &amp; CERTIFICATIONS</div>
        {certifications.map((cert, idx) => (
          <div key={idx} className="item">
            <div className="item-title">{cert.title}</div>
            <div className="item-subtitle">{cert.issuer}</div>
          </div>
        ))}
      </div>

      {/* Your Interests Section */}
      <div className="section-card">
        <div className="section-title">➜ YOUR INTERESTS</div>
        <div className="item-description">
          Interest-related posts are also shown in this section. Browse topics you care about
          and stay updated with the latest content.
        </div>
        <div className="post-grid">
          {interestPosts.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-item-title">{post.title}</div>
              <div className="post-item-meta">{post.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthenticatedLayout>
      <ProfileContent />
    </AuthenticatedLayout>
  );
}