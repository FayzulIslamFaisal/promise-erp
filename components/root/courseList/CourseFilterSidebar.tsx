import { Card } from '@/components/ui/card'
import React from 'react'
import CourseFilterSection from './CourseFilterSection'

const CourseFilterSidebar = () => {
  return (
    <Card className="p-6 top-4">
      <CourseFilterSection />
    </Card>
  )
}

export default CourseFilterSidebar
