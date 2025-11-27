
import HighlightsSection from '@/components/root/home/HighlightsSection'
import HomeServiceList from '@/components/root/home/HomeServiceList'
import CourseCategoriesSection from '@/components/root/home/CourseCategoriesSection'
import HeroWithLogos from '@/components/root/home/HeroWithLogos'
import HomeCourses from '@/components/root/home/HomeCourses'

 const HomePage =()=> {
  return (
    <>
    <HighlightsSection />
    <CourseCategoriesSection />
    <HomeServiceList />
    <HomeCourses />
    <HeroWithLogos />
    </>
  )
}

export default HomePage