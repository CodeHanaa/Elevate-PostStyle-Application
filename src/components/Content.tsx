import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  User as UserIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ClipboardList,
  Loader2,
  Inbox
} from "lucide-react";

import { getUsers, type User } from "../services/users";
import type { Post } from "../Types/post";

interface ContentProps {
  posts: Post[];
}

const Content = ({ posts }: ContentProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  const navigate = useNavigate();

  // جلب المستخدمين عند البداية
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await getUsers();
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // استخدام useMemo لتحسين الأداء عند الفلترة (Best Practice)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      const matchesUser = selectedUser === "all" || post.userId === Number(selectedUser);
      return matchesSearch && matchesUser;
    });
  }, [posts, search, selectedUser]);

  // حسابات الترقيم (Pagination)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // إعادة الترقيم لصفحة 1 عند البحث
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedUser]);

  return (
    <div className="max-w-[1200px] mx-auto mt-8 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/40 min-h-[800px] flex flex-col transition-all duration-300">
      
      {/* 1. Header Section */}
      <div className="px-8 py-5 flex justify-between items-center border-b border-gray-200/50 bg-white/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
            <ClipboardList size={22} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Post List</h2>
        </div>
        <button 
          onClick={() => navigate('/create')} 
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10"
        >
          <Plus size={18} />
          Create New Post
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/30 border-b border-gray-100/50">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
          />
        </div>
        
        <div className="relative flex items-center gap-3">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-wider hidden lg:block">Filter:</label>
          <div className="relative flex-1">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/50 outline-none cursor-pointer hover:border-gray-300 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none shadow-sm"
            >
              <option value="all">All Authors</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Posts List Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {currentPosts.length > 0 ? (
          <div className="divide-y divide-gray-100/50">
            {currentPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/post/${post.id}`)} 
                className="group px-8 py-6 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <span className="text-gray-700 font-medium text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                  {post.title}
                </span>
                <ChevronRight className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400 space-y-4">
            {loadingUsers && posts.length === 0 ? (
              <>
                <Loader2 className="animate-spin text-blue-500" size={40} />
                <p className="font-medium animate-pulse">Syncing with server...</p>
              </>
            ) : (
              <>
                <Inbox size={48} className="opacity-20" />
                <p className="font-medium">No posts found matching your criteria</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* 4. Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-6 flex justify-center items-center bg-white/40 border-t border-gray-100/50 gap-3">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1} 
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1} 
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200">
              {currentPage}
            </span>
            <span className="text-gray-400 font-medium px-2">of {totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages} 
              className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;