import Image from "next/image"
const AuthLeftImage = () => {
  return (
    <div className="hidden md:flex justify-center w-full">
        <div className="relative w-full">
            <Image
            src="/images/loginpagebg.png"
            alt="Register Illustration"
            width={600}
            height={600}
            className="object-contain"
            priority
            />
        </div>
    </div>
  )
}

export default AuthLeftImage
