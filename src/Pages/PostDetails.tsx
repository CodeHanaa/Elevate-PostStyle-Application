import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Calendar, FileText, AlertTriangle, Loader2 } from "lucide-react";
import Header from "../components/Header";
import type { Post } from "../Types/post";

const PostDetails = ({ posts }: { posts: Post[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل بسيطة لضمان تجربة مستخدم (UX) سلسة
    const findPost = () => {
      const foundPost = posts.find((p) => String(p.id) === String(id));
      if (foundPost) {
        setPost(foundPost);
      }
      setLoading(false);
    };

    const timer = setTimeout(findPost, 500); // تأخير بسيط جداً لجمالية الـ Loader
    return () => clearTimeout(timer);
  }, [id, posts]);

  // 1. حالة التحميل (Loading State)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">Fetching post details...</p>
      </div>
    );
  }

  // 2. حالة عدم العثور على البوست (Error State)
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md">
          <AlertTriangle className="text-amber-500 mx-auto mb-4" size={56} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
          <p className="text-gray-500 mb-8">The post you're looking for might have been removed or doesn't exist.</p>
          <button 
            onClick={() => navigate("/")} 
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <Header />
      
      <div className="max-w-[1000px] mx-auto px-4 mt-10">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
          
          {/* Header Section: Blue Gradient like Figma */}
          <div className="bg-gradient-to-br from-[#4A76A8] to-[#3b5d85] p-8 md:p-12 text-white relative overflow-hidden">
            {/* Decoration Circles */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <button 
              onClick={() => navigate(-1)} 
              className="group flex items-center gap-2 bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-full text-sm font-semibold transition-all mb-8 border border-white/10 backdrop-blur-md"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Posts
            </button>
            
            <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                    <FileText size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                    {post.title}
                </h1>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <User size={16} className="text-blue-200" />
                <span className="opacity-90 tracking-wide">Author ID: {post.userId}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Calendar size={16} className="text-blue-200" />
                <span className="opacity-90">
                    {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </span>
              </div>
            </div>
          </div>

          {/* Content Body Section */}
          <div className="p-8 md:p-14 bg-white relative">
            <div className="absolute top-0 left-12 w-16 h-1 bg-blue-500/20 rounded-full"></div>
            <p className="text-gray-700 leading-relaxed text-xl md:text-2xl font-light italic">
              {post.body}
            </p>
            
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                <div className="text-gray-300 select-none font-black text-6xl opacity-10">
                    POST CONTENT
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;