import { useEffect } from 'react';


interface Props {
    carouselRefs: React.RefObject<HTMLElement> | React.RefObject<HTMLUListElement> | React.RefObject<HTMLDivElement>
}



const scrollHorizontal = ({carouselRefs}:Props) => {

    useEffect(() => {
        const sliders = carouselRefs.current;
        let isDown = false;
        let startX;
        let scrollLeft;
        let velX = 0;
        let momentumId;

        const mouseDown = (e) => {
            isDown = true;
            sliders?.classList.add('active');

            let clientX = e.clientX ? e.clientX : e.touches[0].clientX;
            startX = clientX - sliders!.getBoundingClientRect()!.left;
            
            scrollLeft = sliders?.scrollLeft!;
            cancelMomentumTracking();
        }

        const mouseLeave = () => {
            isDown = false
            sliders?.classList.remove('active');
        }

        const mouseUp = () => {
            isDown = false
            sliders?.classList.remove('active');

            beginMomentumTracking();
        }

        const mouseMove = (e) => {
            if (!isDown) return

            e.preventDefault();

            let clientX = e.clientX ? e.clientX : e.touches[0].clientX;
            let x = clientX - sliders!.getBoundingClientRect()!.left;
            let walk = (x - startX) * 1; // scroll fast
            let prevScrollLeft = sliders?.scrollLeft!;
    
            sliders!.scrollLeft = scrollLeft! - walk;

            velX = sliders!.scrollLeft! - prevScrollLeft
        }

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumId = requestAnimationFrame(momenLoop)
        }
        
        const cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumId)
        }
    
        const momenLoop = () => {
            sliders!.scrollLeft += velX;
            velX *= 0.95;
    
            if (Math.abs(velX) > 0.5) {
                momentumId = requestAnimationFrame(momenLoop)
            }
        }

        sliders?.addEventListener('mousedown', mouseDown);
        sliders?.addEventListener('mouseleave', mouseLeave);
        sliders?.addEventListener('mouseup', mouseUp);
        sliders?.addEventListener('mousemove', mouseMove);

        return () => {
            
            sliders?.removeEventListener('mousedown', mouseDown);
            sliders?.removeEventListener('mouseleave', mouseLeave);
            sliders?.removeEventListener('mouseup', mouseUp);
            sliders?.removeEventListener('mousemove', mouseMove);
        }
            
    },[]);

}
export default scrollHorizontal