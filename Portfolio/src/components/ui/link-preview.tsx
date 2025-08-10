'use client'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { encode } from 'qss'
import React from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'

import { cn } from '@/lib/utils'

type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  className?: string
  width?: number
  height?: number
  quality?: number
  useApiFlash?: boolean
  fallbackSrc?: string
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
)

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 80,
  useApiFlash = false,
  fallbackSrc,
  isStatic = false,
  imageSrc = '',
}: LinkPreviewProps) => {
  let src
  if (!isStatic) {
    const apiflashKey = (import.meta as any).env?.VITE_APIFLASH_KEY as
      | string
      | undefined

    if (useApiFlash && apiflashKey) {
      const params = encode({
        access_key: apiflashKey,
        url,
        format: 'png',
        quality,
        full_page: false,
        ttl: 86400,
        width: width * 3,
        height: height * 3,
      })
      src = `https://api.apiflash.com/v1/urltoimage?${params}`
    } else {
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: 'screenshot.url',
        colorScheme: 'dark',
        'viewport.isMobile': true,
        'viewport.deviceScaleFactor': 1,
        'viewport.width': width * 3,
        'viewport.height': height * 3,
      })
      src = `https://api.microlink.io/?${params}`
    }
  } else {
    src = imageSrc
  }

  const [resolvedSrc, setResolvedSrc] = React.useState(src)
  React.useEffect(() => {
    setResolvedSrc(src)
  }, [src])

  const [isOpen, setOpen] = React.useState(false)

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)

  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2 // Reduce the effect to make it subtle
    x.set(offsetFromCenter)
  }

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img
            src={resolvedSrc}
            width={width}
            height={height}
            alt="hidden image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open)
        }}
      >
        <HoverCardPrimitive.Trigger asChild>
          <span
            onMouseMove={handleMouseMove}
            className={cn('inline-flex text-black dark:text-white', className)}
          >
            {children}
          </span>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={isStatic ? imageSrc : resolvedSrc}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                    onError={() => {
                      if (fallbackSrc) setResolvedSrc(fallbackSrc)
                    }}
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
