"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Plus, Trash2 } from "lucide-react"
import type { StudentProfile, Education } from "@/apiServices/studentDashboardService"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"

const MyProfileTab = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    facebook: "",
    linkedin: "",
  })
  const [educations, setEducations] = useState<Array<{ id?: number; degree: string; institution: string; subject: string }>>([
    { degree: "", institution: "", subject: "" }
  ])
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.accessToken) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_BASE}/student-panel/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`)
        }

        const response = await res.json()

        if (response.success && response.data) {
          const profile: StudentProfile = response.data

          setFormData({
            name: profile.name || "",
            username: profile.email?.split("@")[0] || "",
            email: profile.email || "",
            phone: profile.phone || "",
            gender: profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : "",
            age: profile.age?.toString() || "",
            facebook: profile.facebook || "",
            linkedin: profile.linkedin || "",
          })

          // Map educations from API
          if (profile.educations && profile.educations.length > 0) {
            setEducations(
              profile.educations.map((edu) => ({
                id: edu.id,
                degree: edu.degree || "",
                institution: edu.institution || "",
                subject: edu.subject || "",
              }))
            )
          } else {
            // Add one empty education entry if none exists
            setEducations([{ degree: "", institution: "", subject: "" }])
          }

          setProfileImage(profile.profile_image)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session?.accessToken])

  if (loading) {
    return (
      <Card className="border-gray-200 text-secondary shadow-sm py-0">
        <CardContent className="p-8">
          <div className="text-center py-8">Loading profile...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-200 text-secondary shadow-sm py-0">
      <CardContent className="p-8">
        {/* Avatar */}
        <div className="mb-6 flex justify-start">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} alt="Profile" />
              <AvatarFallback className="bg-secondary/20 text-xl text-white">
                {formData.name
                  ? formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 border-2 border-white">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-normal text-secondary">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-normal text-secondary">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-normal text-secondary">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-normal text-secondary">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-base font-normal text-secondary">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger id="gender" className="border-gray-200 text-secondary w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base font-normal text-secondary">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>
          </div>

          {/* Educational Qualification */}
          <div className="space-y-4">
            <Label className="text-base font-normal text-secondary">
              Educational Qualification
            </Label>

            {educations.map((education, index) => (
              <div key={index} className="space-y-3 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  {/* Degree */}
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`} className="text-sm font-normal text-secondary">
                      Degree
                    </Label>
                    <Input
                      id={`degree-${index}`}
                      value={education.degree}
                      onChange={(e) => {
                        const updated = [...educations]
                        updated[index] = { ...updated[index], degree: e.target.value }
                        setEducations(updated)
                      }}
                      placeholder="Enter your degree"
                      className="border-gray-200 text-secondary"
                    />
                  </div>

                  {/* Institute */}
                  <div className="space-y-2">
                    <Label htmlFor={`institute-${index}`} className="text-sm font-normal text-secondary">
                      Institute
                    </Label>
                    <Input
                      id={`institute-${index}`}
                      value={education.institution}
                      onChange={(e) => {
                        const updated = [...educations]
                        updated[index] = { ...updated[index], institution: e.target.value }
                        setEducations(updated)
                      }}
                      placeholder="Enter your institute's name"
                      className="border-gray-200 text-secondary"
                    />
                  </div>

                  {/* Subject/Division */}
                  <div className="space-y-2">
                    <Label htmlFor={`subject-${index}`} className="text-sm font-normal text-secondary">
                      Subject/Division
                    </Label>
                    <Input
                      id={`subject-${index}`}
                      value={education.subject}
                      onChange={(e) => {
                        const updated = [...educations]
                        updated[index] = { ...updated[index], subject: e.target.value }
                        setEducations(updated)
                      }}
                      placeholder="Enter your subject or division"
                      className="border-gray-200 text-secondary"
                    />
                  </div>
                </div>

                {/* Delete Button */}
                {educations.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = educations.filter((_, i) => i !== index)
                        setEducations(updated)
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Add More Button */}
            {/* <div className="flex justify-end"> */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEducations([...educations, { degree: "", institution: "", subject: "" }])
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            {/* </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Facebook Profile Link */}
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-base font-normal text-secondary">
                Facebook Profile Link
              </Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>

            {/* LinkedIn Profile Link */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-base font-normal text-secondary">
                LinkedIn Profile Link
              </Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="border-gray-200 text-secondary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button className=" px-6">Update Information</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyProfileTab
