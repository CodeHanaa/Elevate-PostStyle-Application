const Header = () => {
  return (
    <div 
      className="max-w-[1200px] w-[95%] md:w-full h-auto md:h-[67px] mx-auto flex flex-col md:flex-row justify-between items-center px-[24px] py-[12px] md:py-[16px] backdrop-blur-[16px] mt-4 mb-6 rounded-xl border border-white/30 shadow-lg" 
      style={{ background: "rgba(255, 255, 255, 0.5)" }}
    >   
        {/* Left Side - Logo */}
        <div className="flex items-center mb-2 md:mb-0">
            <span className="text-[18px] md:text-[20px] font-bold text-white">Elevate</span>
        </div>
        
        {/* Right Side - Task Title */}
        <div className="flex items-center text-center">
            <span className="text-[14px] md:text-[20px] font-semibold text-white leading-tight">
                {/* هنا بنصغر الخط جداً في الموبايل أو نغير النص */}
                <span className="md:hidden">Frontend Task</span> {/* يظهر في الموبايل بس */}
                <span className="hidden md:inline">Frontend Advanced Bootcamp Task</span> {/* يظهر في الشاشات الكبيرة بس */}
            </span>
        </div>
    </div>
  )
}

export default Header;
