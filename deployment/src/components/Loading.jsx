import { lazy, Suspense } from "react";
const MotionDiv = lazy(() => import('motion/react').then(mod => ({
        default: mod.motion.div
    }))
)
function LazyMotionDiv(props) {
    return <Suspense fallback={ <div style={props.style} className={props.className}> {props.children} </div> }>
        <MotionDiv {...props}>
            {props.children}
        </MotionDiv>
    </Suspense>
}

function Loading() {

    return <LazyMotionDiv
            style={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flex: 1
            }}
            initial={{fontSize: '1.2em'}}
            animate={{fontSize: '1.5em'}}
            transition={{
                duration: 0.7,
                repeat: Infinity,
                repeatDelay: 1.3,
                repeatType: 'reverse'
            }}
            className="primaryColor bold"
        >
        <div style={{position: 'relative'}}>
            <span> A Nature Sanctuary </span>
            <LazyMotionDiv
                className="slanted" 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: '-15%',
                    height: '100%', 
                    width: '15%',
                    zIndex: 1000,
                    backgroundColor: 'rgba(255,255,255,0.4)'
                }}
                animate={{
                    left: '100%',
                    transition: {
                        repeat: Infinity,
                        duration: 2,
                        repeatType: 'loop',
                        repeatDelay: 2
                    }
                }}
            />
        </div>
    </LazyMotionDiv>
}

export default Loading;