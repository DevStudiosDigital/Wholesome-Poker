import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  txHash?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TxSuccessDialog = ({ txHash, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] w-4/5 border-white/10 border rounded-xl flex flex-col gap-5 pt-10 px-10 pb-14 items-center [&>button]:hidden bg-card">
        <div className="text-[42px] md:text-[48px] lg:text-[54px] xl:text-[72px] font-bold text-primary">
          Success
        </div>
        <Link
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          className="flex items-center gap-2"
        >
          View On Explorer <SquareArrowOutUpRight size={14} />
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default TxSuccessDialog;
