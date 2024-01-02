import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import headerIntersect from '../lib/headerIntersect';
import delay from '../lib/delay';

function BackHeader({
   title,
   backCb,
   rightIcon,
   RightIconOnClick,
}: {
   title: string;
   backCb?: Function;
   rightIcon?: string;
   RightIconOnClick?: any;
}) {
   const navigate = useNavigate();
   const topElement = useRef<HTMLDivElement>(null);
   const [isIntersecting, setIsIntersecting] = useState(true);
   useEffect(() => {
      headerIntersect(topElement.current as Element, setIsIntersecting);
   }, []);

   return (
      <>
         <div ref={topElement}></div>
         <div
            className={`transition ${isIntersecting ? '' : 'shadow-sm dark:shadow-white/10'}  
			sticky top-0 z-50 flex w-full bg-white/70 backdrop-blur-md dark:bg-black/60 `}
         >
            <header className='mt-[-1px] flex w-full select-none items-center justify-between px-3 py-[0.7rem]'>
               <div className='left tap' onClick={handelBackClick}>
                  <img src={icons.left_arrow_long_solid} className='w-10 dark:grayscale dark:invert' />
               </div>
               <div className='center line-clamp-1 text-base font-medium dark:text-darkText'>{title}</div>
               <div className='right tap opacity-0'>
                  <img src={icons.left_arrow_long_solid} className='w-10 dark:grayscale dark:invert' />
               </div>
               {rightIcon && (
                  <img src={icons.deleteIcon} onClick={RightIconOnClick} className='w-5 dark:grayscale dark:invert' />
               )}
            </header>
         </div>
      </>
   );
   function handelBackClick() {
      delay(() => {
         if (backCb) backCb();
         else navigate(-1);
      }, 80);
   }
}

export default BackHeader;
