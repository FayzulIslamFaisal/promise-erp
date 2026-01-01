"use client";
import { useState } from "react";
import { ArrowLeft, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddEarningForm = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(
        files.length === 1 ? files[0].name : `${files.length} files selected`
      );
    } else {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button className="hover:opacity-70 transition">
            <ArrowLeft className="w-6 h-6 text-secondary" />
          </button>
          <h1 className="text-3xl font-bold text-secondary">Add New Earning</h1>
        </div>

        {/* Form Card */}
        <Card className="">
          <CardContent className="p-8 space-y-6">
            {/* Earning Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-secondary font-normal">
                Earning Platform
              </Label>
              <Select>
                <SelectTrigger
                  id="platform"
                  className="h-22 text-secondary border-gray-200 w-full"
                >
                  <SelectValue placeholder="Select your earning platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="payment" className="text-secondary font-normal">
                Payment Method
              </Label>
              <Select>
                <SelectTrigger
                  id="payment"
                  className="h-22 text-secondary border-gray-200 w-full"
                >
                  <SelectValue placeholder="Select your payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="wise">Wise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job */}
            <div className="space-y-2">
              <Label htmlFor="job" className="text-secondary font-normal">
                Job
              </Label>
              <Select>
                <SelectTrigger
                  id="job"
                  className="h-22 text-secondary border-gray-200 w-full"
                >
                  <SelectValue placeholder="Select your job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Total Earning in USD and BDT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* USD Input */}
              <div className="space-y-2">
                <Label htmlFor="usd" className="text-secondary font-normal">
                  Total Earning in USD
                </Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-10 w-12 bg-secondary flex items-center justify-center rounded-l-md">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <Input
                    id="usd"
                    type="number"
                    placeholder="Enter your earning in USD"
                    className="h-10 pl-20 text-secondary border-gray-200"
                  />
                </div>
              </div>

              {/* BDT Input */}
              <div className="space-y-2">
                <Label htmlFor="bdt" className="text-secondary font-normal">
                  Total Earning in BDT
                </Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-10 w-12 bg-secondary flex items-center justify-center rounded-l-md">
                    <span className="text-white text-xl font-medium">৳</span>
                  </div>
                  <Input
                    id="bdt"
                    type="number"
                    placeholder="Enter your earning in BDT"
                    className="h-10 pl-20 text-secondary border-gray-200"
                  />
                </div>
              </div>
            </div>

           {/* Images File Upload */}
            <div className="space-y-2">
              <Label htmlFor="images" className="text-primary font-normal">
                Images
              </Label>
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <label
                  htmlFor="file-upload"
                  className="bg-primary hover:bg-primary text-white font-semibold px-8 py-2 cursor-pointer transition shrink-0"
                >
                  Choose Files
                </label>
                <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                <span className="text-secondary px-4 flex-1">{fileName}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button>Cancel</Button>
              <Button>Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEarningForm;
