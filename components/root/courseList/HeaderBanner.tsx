const HeaderBanner = () => {
  return (
    <div className="relative h-[330px] md:h-[430px] bg-[#292464d4] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/hero-banner/courselist.png')]" />
      </div>
      <div className="relative text-center">
        <h1 className="text-5xl font-bold text-white mb-2 opacity-100">Courses</h1>
      </div>
    </div>
  )
}

export default HeaderBanner
