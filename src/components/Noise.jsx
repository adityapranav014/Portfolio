import { useEffect, useRef } from "react";

/**
 * Noise — adds a subtle film-grain texture over the entire page.
 * Uses an SVG feTurbulence filter rendered to a canvas,
 * then drawn as a fixed overlay with low opacity.
 * pointer-events:none so it never blocks interaction.
 */
const Noise = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animFrame;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Throttle to ~10 fps — grain is imperceptible faster and
        // running at 60 fps costs ~500 MB/s of random pixel writes.
        const FPS = 10;
        const INTERVAL = 1000 / FPS;
        let lastTime = 0;

        const drawNoise = (timestamp) => {
            animFrame = requestAnimationFrame(drawNoise);
            if (timestamp - lastTime < INTERVAL) return;
            lastTime = timestamp;

            const { width, height } = canvas;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = (Math.random() * 255) | 0;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 18; // ~7% alpha per pixel
            }

            ctx.putImageData(imageData, 0, 0);
        };

        resize();
        drawNoise(0);
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9996] pointer-events-none"
            style={{ opacity: 0.04, mixBlendMode: "overlay" }}
            aria-hidden="true"
        />
    );
};

export default Noise;
