"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

const MyProfileTab = () => {
  const [formData, setFormData] = useState({
    name: "Rakib Hasan",
    username: "rakib_hasan01",
    email: "rakib@gmail.com",
    phone: "01710635481",
    gender: "Male",
    age: "25",
    education: "BSc",
    facebook: "https://www.facebook.com/rakib.hasan.profile",
    linkedin: "https://www.linkedin.com/in/rakib-hasan-123456789/",
  })

  return (
    <Card className="border-gray-200 text-secondary shadow-sm py-0">
      <CardContent className="p-8">
        {/* Avatar */}
        <div className="mb-6 flex justify-start">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="bg-secondary/20 text-xl text-white">RH</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 border-2 border-white">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="education" className="text-base font-normal text-secondary">
              Educational Qualification
            </Label>
            <Select
              value={formData.education}
              onValueChange={(value) => setFormData({ ...formData, education: value })}
            >
              <SelectTrigger id="education" className="border-gray-200 text-secondary w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BSc">BSc</SelectItem>
                <SelectItem value="MSc">MSc</SelectItem>
                <SelectItem value="BA">BA</SelectItem>
                <SelectItem value="MA">MA</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
