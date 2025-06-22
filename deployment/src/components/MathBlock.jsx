import { useEffect, useRef } from "react";

export default function MathBlock(props) {
    const content = props?.content??'';
    const inline = props?.inline;
        
    const containerRef = useRef();

    useEffect(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([containerRef.current]);
        }
    }, [content]);

    return inline ? (
        <span ref={containerRef} className={props?.className} style={props?.style}>
        {`\\(${content}\\)`}
        </span>
    ) : (
        <div ref={containerRef} className={`${props?.className} scroll-container`} style={props?.style}>
        {`\\[${content}\\]`}
        </div>
    );
}