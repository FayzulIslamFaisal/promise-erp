import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const AffiliatesClientsTab = ({ items }: { items: { name: string, logo: string }[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item, idx) => (
                <Card key={idx} className="rounded-2xl flex flex-col items-center justify-center hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center px-4">
                        <div className="relative w-40 h-20 mb-3 shadow-none">
                            <Image src={item.logo || '/images/home/client-logo.png'} alt={item.name} fill className="object-contain" />
                        </div>
                        <p className="text-base font-semibold text-center text-secondary">{item.name}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default AffiliatesClientsTab
