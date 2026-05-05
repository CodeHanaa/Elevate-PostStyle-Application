import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./Pages/CreatePost";
import { getPosts } from "./services/Posts";
import PostDetails from "./Pages/PostDetails";

const App = () => {
    const [allPosts, setAllPosts] = useState<any[]>([]);

    // 1. جلب البيانات عند البداية
    useEffect(() => {
        // أولاً: نشوف هل فيه بيانات محفوظة في المتصفح؟
        const savedPosts = localStorage.getItem("my_posts");
        
        if (savedPosts) {
            setAllPosts(JSON.parse(savedPosts));
        } else {
            // لو مفيش، نروح نجيبهم من الـ API لأول مرة بس
            getPosts().then(res => {
                setAllPosts(res.data);
                localStorage.setItem("my_posts", JSON.stringify(res.data));
            });
        }
    }, []);

    // 2. دالة إضافة بوست جديد (مع الحفظ في LocalStorage)
    const handleAddPost = (newPost: any) => {
        setAllPosts((prevPosts) => {
            const updatedPosts = [newPost, ...prevPosts];
            // حفظ النسخة الجديدة في ذاكرة المتصفح
            localStorage.setItem("my_posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home posts={allPosts} />} />
                <Route path="/create" element={<CreatePost onAddPost={handleAddPost} />} />
                <Route path="/post/:id" element={<PostDetails posts={allPosts} />} />
            </Routes>
        </Router>
    );
}

export default App;