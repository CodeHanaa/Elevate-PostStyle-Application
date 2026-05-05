import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, User as UserIcon, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import Header from "../components/Header";
import { getUsers, type User } from "../services/users";

// 1. تحديد شروط التحقق (Validation Schema) باستخدام Zod
const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  body: z.string().min(10, "Body must be at least 10 characters"),
  author: z.string().min(1, "Please select an author"),
});

// استخراج النوع (Type) من الـ Schema
type PostFormData = z.infer<typeof postSchema>;

const CreatePost = ({ onAddPost }: { onAddPost: (post: any) => void }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [serverError, setServerError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // 2. إعداد React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const onSubmit = async (data: PostFormData) => {
    setServerError(false);
    try {
      // محاكاة تأخير السيرفر
      await new Promise((resolve) => setTimeout(resolve, 200));

      const newPost = {
        id: Date.now(),
        title: data.title,
        body: data.body,
        userId: Number(data.author),
      };

      onAddPost(newPost);
      setShowSuccess(true);

      setTimeout(() => navigate("/"), 200);
    } catch (err) {
      setServerError(true);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center relative bg-gray-50/50">
      <Header />

      <div className="max-w-[800px] w-full mt-10 bg-white/90  rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center gap-3 bg-white/50">
          <FileText className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          {/* Title Section */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 ml-1">Title</label>
            <input
              {...register("title")}
              placeholder="What's on your mind?"
              className={`w-full p-4 rounded-2xl border ${
                errors.title ? "border-red-500 bg-red-50/30" : "border-gray-200"
              } outline-none focus:ring-2 focus:ring-blue-400/50 transition-all shadow-sm`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
                <AlertCircle size={14} /> {errors.title.message}
              </p>
            )}
          </div>

          {/* Body Section */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 ml-1">Content Body</label>
            <textarea
              {...register("body")}
              placeholder="Write your post content here..."
              rows={5}
              className={`w-full p-4 rounded-2xl border ${
                errors.body ? "border-red-500 bg-red-50/30" : "border-gray-200"
              } outline-none focus:ring-2 focus:ring-blue-400/50 transition-all resize-none shadow-sm`}
            />
            {errors.body && (
              <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
                <AlertCircle size={14} /> {errors.body.message}
              </p>
            )}
          </div>

          {/* Author Section */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 ml-1">Author</label>
            <div className="relative">
              <select
                {...register("author")}
                className={`w-full p-4 pl-12 rounded-2xl border ${
                  errors.author ? "border-red-500 bg-red-50/30" : "border-gray-200"
                } outline-none cursor-pointer appearance-none bg-white shadow-sm`}
              >
                <option value="">Select an author...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {errors.author && (
              <p className="text-red-500 text-sm flex items-center gap-1 ml-1">
                <AlertCircle size={14} /> {errors.author.message}
              </p>
            )}
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="w-full p-4 border border-red-200 bg-red-50 rounded-2xl text-red-600 flex items-center justify-center gap-2 animate-shake">
              <AlertCircle size={18} /> Internal Server Error. Please try again.
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative bg-gray-900 text-white px-20 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl disabled:opacity-70 flex items-center gap-3 overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-500 font-medium">
          <CheckCircle2 size={24} />
          Post created successfully! Returning home...
        </div>
      )}
    </div>
  );
};

export default CreatePost;