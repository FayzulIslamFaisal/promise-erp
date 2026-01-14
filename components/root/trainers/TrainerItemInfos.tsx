"use client";
import { useState } from "react";
import { Trainer } from "./TrainerItemWrapper";
import TrainerItemCard from "./TrainerItemCard";
import TrainerItemCardModal from "./TrainerItemCardModal";
interface TrainerProps {
  trainer: Trainer;
}
const TrainerItemInfos = ({ trainer }: TrainerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>
        <TrainerItemCard trainer={trainer} />
      </div>

      <TrainerItemCardModal member={trainer} open={open} onOpenChange={setOpen} />
    </>
  );
};

export default TrainerItemInfos;
