import { useRef, useState, useEffect } from 'react'

const getResponsiveValues = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024

    let baseRadius
    if (width < 768) {
        baseRadius = 70 + (width / 768) * 30
    } else if (width < 1440) {
        baseRadius = 80 + ((width - 768) / (1440 - 768)) * 20
    } else {
        baseRadius = 110 + ((Math.min(width, 2560) - 1440) / (2560 - 1440)) * 30
    }

    const multiplier = baseRadius / 100
    return {
        MAX_RADIUS: Math.round(baseRadius),
        MIN_RADIUS: 0,
        SOFT_EDGE: Math.round(60 * multiplier),
        LERP_SPEED: 0.18,
        RADIUS_LERP_SPEED: 0.13,
    }
}

/**
 * VideoHover — wraps any content with a mouse-reveal effect.
 * On touch devices it renders children without any overlay.
 */
export const VideoHover = ({ children, className }) => {
    const containerRef = useRef(null)
    const [mousePos, setMousePos] = useState(null)
    const [lerpedPos, setLerpedPos] = useState(null)
    const [hovered, setHovered] = useState(false)
    const [radius, setRadius] = useState(0)
    const [targetRadius, setTargetRadius] = useState(0)
    const [values, setValues] = useState(getResponsiveValues)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    // Detect touch device and keep responsive values in sync with window size
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
        const handleResize = () => setValues(getResponsiveValues())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Smooth-lerp the cursor position
    useEffect(() => {
        if (!hovered || !mousePos || isTouchDevice) {
            setLerpedPos(null)
            return
        }
        let frame
        const animate = () => {
            setLerpedPos(prev => {
                if (!prev) return mousePos
                const dx = mousePos.x - prev.x
                const dy = mousePos.y - prev.y
                if (Math.sqrt(dx * dx + dy * dy) < 0.5) return mousePos
                return { x: prev.x + dx * values.LERP_SPEED, y: prev.y + dy * values.LERP_SPEED }
            })
            frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [mousePos, hovered, isTouchDevice, values.LERP_SPEED])

    // Animate radius on hover in / out
    useEffect(() => {
        setTargetRadius(hovered ? values.MAX_RADIUS : values.MIN_RADIUS)
    }, [hovered, values.MAX_RADIUS, values.MIN_RADIUS])

    useEffect(() => {
        let frame
        const animate = () => {
            setRadius(prev => {
                if (Math.abs(prev - targetRadius) < 1) return targetRadius
                return prev + (targetRadius - prev) * values.RADIUS_LERP_SPEED
            })
            frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [targetRadius, values.RADIUS_LERP_SPEED])

    const handleMouseMove = e => {
        if (isTouchDevice) return
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseEnter = () => { if (!isTouchDevice) setHovered(true) }
    const handleMouseLeave = () => { setHovered(false); setMousePos(null); setLerpedPos(null) }

    // Touch devices — plain passthrough, no effect
    if (isTouchDevice) {
        return <div className={className}>{children}</div>
    }

    const maskStyle =
        lerpedPos && radius > 0
            ? {
                WebkitMaskImage: `radial-gradient(circle ${radius}px at ${lerpedPos.x}px ${lerpedPos.y}px,
            transparent 0 ${radius - values.SOFT_EDGE - 20}px,
            rgba(0,0,0,0.10) ${radius - values.SOFT_EDGE}px,
            rgba(0,0,0,0.25) ${radius - values.SOFT_EDGE / 1.5}px,
            rgba(0,0,0,0.45) ${radius - values.SOFT_EDGE / 2}px,
            rgba(0,0,0,0.75) ${radius}px,
            black 100%)`,
                maskImage: `radial-gradient(circle ${radius}px at ${lerpedPos.x}px ${lerpedPos.y}px,
            transparent 0 ${radius - values.SOFT_EDGE - 20}px,
            rgba(0,0,0,0.10) ${radius - values.SOFT_EDGE}px,
            rgba(0,0,0,0.25) ${radius - values.SOFT_EDGE / 1.5}px,
            rgba(0,0,0,0.45) ${radius - values.SOFT_EDGE / 2}px,
            rgba(0,0,0,0.75) ${radius}px,
            black 100%)`,
                opacity: 1,
            }
            : { WebkitMaskImage: 'none', maskImage: 'none', opacity: 1 }

    const overlayOpacity = hovered && lerpedPos && radius > 0 ? 'opacity-90' : 'opacity-100'

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className ?? ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Dark blur overlay — masked by cursor circle */}
            <div
                className={`absolute inset-0 bg-black/80 backdrop-blur-[6px] transition-opacity duration-300 pointer-events-none ${overlayOpacity}`}
                style={maskStyle}
            />

            {/* Soft glow ring */}
            {lerpedPos && radius > 0 && (
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `radial-gradient(circle ${radius + 30}px at ${lerpedPos.x}px ${lerpedPos.y}px, rgba(255,255,255,0.13) 0, rgba(255,255,255,0.07) 60%, transparent 100%)`,
                        mixBlendMode: 'screen',
                    }}
                />
            )}
        </div>
    )
}
