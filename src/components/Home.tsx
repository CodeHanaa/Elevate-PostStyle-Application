import Content from "./Content";
import Header from "./Header";
// تأكدي من استيراد النوع (Type) لو بتستخدميه
import type { Post } from "../Types/post"; 

const Home = ({ posts }: { posts: Post[] }) => {
    return ( 
        <>
            <Header />
            {/* لازم تمرري الـ posts هنا عشان تظهر في صفحة البوستات */}
            <Content posts={posts} />
        </>
     );
}

export default Home;