'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"

interface DataSourceDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  sourceSpec: DataSourceSpec | null
  content: ReactElement
}

import { ReactElement, ReactNode } from 'react'
import { useIsMobile } from '@/hooks/is-mobile'

export interface DataSourceSpec {
  icon: ReactNode
  title: string
  description: string
  modalDescription: string
  type: 'notion' | 'pdf' | 'url' | 'custom'
}


export function DataSourceDialog({ isOpen, onOpenChange, sourceSpec, content }: DataSourceDialogProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{sourceSpec?.title}</DrawerTitle>
            <DrawerDescription>{sourceSpec?.modalDescription}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sourceSpec?.title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

