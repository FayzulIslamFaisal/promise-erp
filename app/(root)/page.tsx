
import HighlightsSection from '@/components/root/home/HighlightsSection'
import HomeServiceList from '@/components/root/home/HomeServiceList'
import CourseCategoriesSection from '@/components/root/home/CourseCategoriesSection'
import HeroWithLogos from '@/components/root/home/HeroWithLogos'
import SectionTitle from '@/components/common/SectionTitle'

 const HomePage =()=> {
  return (
    <>
    <HighlightsSection />
    <section className="py-8 md:py-14 px-4 bg-secondary relative">
      <div className="container mx-auto relative z-10">
        <SectionTitle 
           title="আপনার আগ্রহের কোর্স বিভাগ খেঁজে নিন" 
           subtitle="দক্ষতা উন্নয়নের জন্য পছন্দের বিষয় থেকে কোর্স খুঁজে নিন"
           iswhite={true}
          />
        <CourseCategoriesSection />
      </div>
    </section>
    <HomeServiceList />
    <HeroWithLogos />
    </>
  )
}

export default HomePage