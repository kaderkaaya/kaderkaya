"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type ReorderItem = { id: string; order: number };

export function SortableTableProvider({
  itemIds,
  onReorder,
  children,
}: {
  itemIds: string[];
  onReorder: (items: ReorderItem[]) => Promise<void>;
  children: React.ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemIds.indexOf(active.id as string);
    const newIndex = itemIds.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = [...itemIds];
    const [removed] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, removed);
    const items: ReorderItem[] = reordered.map((id, order) => ({ id, order }));
    await onReorder(items);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={itemIds}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}

export function DragHandle() {
  return (
    <button
      type="button"
      className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:cursor-grabbing"
      aria-label="Drag to reorder"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
}

export function SortableTableRow({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "bg-muted/80 opacity-90 z-10", className)}
    >
      <TableCell className="w-10 p-1" {...attributes} {...listeners}>
        <DragHandle />
      </TableCell>
      {children}
    </TableRow>
  );
}

export function SortableTableBody({
  itemIds,
  onReorder,
  children,
}: {
  itemIds: string[];
  onReorder: (items: ReorderItem[]) => Promise<void>;
  children: React.ReactNode;
}) {
  return (
    <SortableTableProvider itemIds={itemIds} onReorder={onReorder}>
      <TableBody>{children}</TableBody>
    </SortableTableProvider>
  );
}
