const Header = () => {

  return (

    <div 

      className="max-w-[1200px] w-full h-[67px] mx-auto flex justify-between items-center px-[24px] py-[16px] backdrop-blur-[16px] mt-4 mb-6 rounded-xl border border-white/30 shadow-lg" 

      style={{ background: "rgba(255, 255, 255, 0.5)" }} // خلفية بيضاء شفافة زي الصورة

    >   

        {/* Left Side */}

        <div className="flex items-center">

            <span className="text-[20px] font-bold text-white">Elevate</span>

        </div>

        

        {/* Right Side */}

        <div className="flex items-center">

            <span className="text-[20px] font-semibold text-white">Frontend Advanced Bootcamp Task</span>

        </div>

    </div>

  )

}



export default Header;
