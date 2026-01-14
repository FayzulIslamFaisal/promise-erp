import TrainerItemWrapper from "@/components/root/trainers/TrainerItemWrapper"
import TrainerStates from "@/components/root/trainers/TrainerStates"
import TrainerWrapperHeroBanner from "@/components/root/trainers/TrainerWrapperHeroBanner"


const TrainersPage = () => {
  return (
    <>
      <TrainerWrapperHeroBanner />
      <div className="container mx-auto px-4">
        <TrainerStates />
        <TrainerItemWrapper/>
        <TrainerItemWrapper/>
      </div>
    </>
  )
}

export default TrainersPage
