"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RegisterButton({ materialId }: { materialId: number }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/material/${materialId}`);
  };

  return (
    <Button onClick={handleClick} className="w-full">
      Go to your personal account
    </Button>
  );
}