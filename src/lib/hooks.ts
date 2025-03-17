import { useState, useEffect } from "react";
import { Investment } from "../lib/types";
import { DragEndEvent, useSensors, useSensor, PointerSensor, KeyboardSensor } from "@dnd-kit/core";

export function useInvestmentDnD(investments: Investment[]) {
  const [investmentList, setInvestmentList] = useState<Investment[]>(investments);

  // Update local state when new data arrives
  useEffect(() => {
    setInvestmentList(investments);
  }, [investments]);

  // DnD sensors for better drag handling
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  // Function to handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Reorder array
    const oldIndex = investmentList.findIndex((inv) => inv.id === active.id);
    const newIndex = investmentList.findIndex((inv) => inv.id === over.id);

    const newList = [...investmentList];
    const [movedItem] = newList.splice(oldIndex, 1);
    newList.splice(newIndex, 0, movedItem);

    setInvestmentList(newList);
  };

  return { investmentList, handleDragEnd, sensors };
}
