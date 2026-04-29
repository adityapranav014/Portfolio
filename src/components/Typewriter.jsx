import { useEffect, useRef, useState } from "react";

/**
 * Typewriter - pure React, no extra dependencies.
 * Cycles through `texts[]`, typing then deleting each phrase.
 *
 * Props:
 *  texts        string[]   - phrases to cycle through
 *  speed        number     - ms per character typed   (default 60)
 *  deleteSpeed  number     - ms per character deleted (default 35)
 *  waitTime     number     - ms to pause before deleting (default 1800)
 *  className    string     - class on the typed span
 *  cursorChar   string     - cursor glyph (default "_")
 */
const Typewriter = ({
    texts = [],
    speed = 60,
    deleteSpeed = 35,
    waitTime = 1800,
    className = "",
    cursorChar = "_",
}) => {
    const [display, setDisplay] = useState("");
    const [charIdx, setCharIdx] = useState(0);
    const [textIdx, setTextIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeout = useRef(null);

    useEffect(() => {
        const current = texts[textIdx] ?? "";

        if (!isDeleting) {
            if (charIdx < current.length) {
                timeout.current = setTimeout(() => {
                    setDisplay(current.slice(0, charIdx + 1));
                    setCharIdx((i) => i + 1);
                }, speed);
            } else {
                // Fully typed - wait then start deleting
                timeout.current = setTimeout(() => setIsDeleting(true), waitTime);
            }
        } else {
            if (display.length > 0) {
                timeout.current = setTimeout(() => {
                    setDisplay((d) => d.slice(0, -1));
                }, deleteSpeed);
            } else {
                // Fully deleted - move to next text
                setIsDeleting(false);
                setCharIdx(0);
                setTextIdx((i) => (i + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout.current);
    }, [charIdx, display, isDeleting, textIdx, texts, speed, deleteSpeed, waitTime]);

    return (
        <span className={`inline whitespace-pre-wrap ${className}`}>
            {display}
            <span
                className="animate-[blink_0.75s_step-end_infinite] ml-0.5"
                aria-hidden="true"
            >
                {cursorChar}
            </span>
        </span>
    );
};

export default Typewriter;
