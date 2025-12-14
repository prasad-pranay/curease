import { Heart, Link, MessageCircleMoreIcon } from "lucide-react";
import React, { useState } from "react";

// Community Page — Reddit-like feed & community discovery
// Users can browse communities, follow/unfollow, and see sample posts.
// Tailwind CSS should already be configured.

export default function CommunityPage() {
  const [communities, setCommunities] = useState([
    {
      id: "c1",
      name: "#Hairfall",
      description: "Share tips, remedies, and treatments for hair fall.",
      members: 1823,
      isFollowing: false,
    },
    {
      id: "c2",
      name: "#MentalHealth",
      description: "Discuss wellness, therapy, mindfulness, and support.",
      members: 2450,
      isFollowing: true,
    },
    {
      id: "c3",
      name: "#FitnessGoals",
      description: "Talk workouts, diet, and progress with others.",
      members: 3175,
      isFollowing: false,
    },
    {
      id: "c4",
      name: "#SkinCare",
      description: "Dermatology advice and skincare routines.",
      members: 2110,
      isFollowing: false,
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: "p1",
      author: "@HealthyHair",
      community: "#Hairfall",
      content: "Has anyone tried rosemary oil for hair growth? Results?",
      likes: 34,
      comments: 5,
    },
    {
      id: "p2",
      author: "@MindCare",
      community: "#MentalHealth",
      content: "Meditation helped me manage stress during exams! ✨",
      likes: 62,
      comments: 12,
    },
    {
      id: "p3",
      author: "@RunnerDude",
      community: "#FitnessGoals",
      content: "Just completed my 10k in under 1 hour! 💪",
      likes: 48,
      comments: 8,
    },
  ]);

  const toggleFollow = (id) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
    );
  };

  return (
    <div className="h-full overflow-y-scroll bg-[var(--bg)] py-10">
      <div className="bg-[var(--card)] rounded-xl px-10 py-10 max-w-7xl mx-auto">
        <header className="mb-6 border-b-1 border-gray-400 pb-10 mb-15">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-[var(--text)]">Community</h1>
          <p className="text-sm text-gray-400 mt-1">
            Join health-related communities, share experiences, and support each other.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed */}
          <section className="lg:col-span-2 space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="hover:-translate-y-1 transition-transform duration-300 bg-[var(--bg)] px-10 py-7 rounded-lg shadow flex flex-col gap-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400">{post.author}</span>
                    <span className="text-[var(--text)]">•</span>
                    <span className="text-[var(--button)] text-xs cursor-pointer">
                      {post.community}
                    </span>
                  </div>
                  <div className="flex gap-3 text-gray-400">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
                <p className="text-[var(--text)] text-sm md:text-base xl:text-xl">{post.content}</p>
                <div className="flex gap-3 mt-10">
                  <button className="px-5 py-2 text-xs rounded bg-red-400 text-white cursor-pointer hover:bg-red-500 flex items-center gap-2">
                    <Heart size={15} />
                    Like
                  </button>
                  <button className="px-5 py-2 text-xs rounded bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-300 flex items-center gap-2">
                    <MessageCircleMoreIcon size={15} />
                    Comment
                  </button>
                  <button className="px-5 py-2 text-xs rounded bg-teal-400 text-black cursor-pointer hover:bg-teal-500 flex items-center gap-2">
                    <Link  size={15} />
                    Share
                  </button>
                </div>
              </article>
            ))}
          </section>

          {/* Suggested Communities */}
          <aside className="space-y-7">
            <div className="bg-[var(--bg)] px-10 py-7 rounded-lg shadow">
              <h2 className="font-medium text-lg mb-7 text-[var(--text)]">Suggested Communities</h2>
              <div className="space-y-3">
                {communities.map((c) => (
                  <div
                    key={c.id}
                    className="border border-[var(--text)] cursor-pointer transition-bg duration-300 rounded-sm p-3 mb-5 text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs mt-3 text-gray-400">{c.members} members</div>
                    </div>
                    <button
                      onClick={() => toggleFollow(c.id)}
                      className={`px-3 py-1 text-sm rounded border-none cursor-pointer hover:scale-110 ${
                        c.isFollowing
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {c.isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-medium mb-2">Create a Post</h2>
              <textarea
                placeholder="Share your thoughts or ask a question..."
                className="w-full border rounded p-2 text-sm resize-none focus:outline-none"
                rows="3"
              ></textarea>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                Post
              </button>
            </div>
          </aside>
        </div>

        {/* <footer className="mt-8 text-center text-sm text-gray-500">
          Built for community connections ❤️ — Explore health & wellness groups near you.
        </footer> */}
      </div>
    </div>
  );
}