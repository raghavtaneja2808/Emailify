import React, { useEffect, useState } from 'react'
import { TextReveal } from "@/components/magicui/text-reveal";
import assets from '@/assets/assets';
import { Button } from "@/components/ui/button";
import GradientText from '../GradientText/GradientText'
import CountUp from '../CountUp/CountUp';
import { TextAnimate } from '../magicui/text-animate';
import { MarqueeDemo } from '../reviewCards';
import { AuroraText } from '../magicui/aurora-text';
import { InteractiveHoverButton } from '../magicui/interactive-hover-button';
import { useSelector } from 'react-redux';

const Landing2= () => {

  const auth = useSelector((state) => state.auth)
  const [loggedIn,setLoggedIn]=useState(false)
  useEffect(() => {
    if (auth?._id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [auth]);
  
    return (
      <div className=''>
        <TextReveal className="text-7xl sm:text-6xl text-right">
          Spend less time setting up and more time making smart decisions.
        </TextReveal>
        <GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={10}
  showBorder={false}
  className="text-8xl sm:text-5xl"
>
  Why Emailify ?
</GradientText>
<div className='flex mt-20 justify-between'>
<TextAnimate className="text-5xl font-extrabold ml-30">Faster than anyone🚀</TextAnimate>

      <GradientText   colors={['#d48ecd', '#1d4f99', '#0af211', '#f20a25', '#d1c40d']}
  animationSpeed={5}
  showBorder={false}
  className="text-6xl">
<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>
</GradientText>
</div>
<h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center mt-20 mb-20">
      Trusted By <AuroraText>Millions of Users</AuroraText>
    </h1>
<MarqueeDemo/>
<div className='flex justify-center mt-10'>
<a href={loggedIn?"/surveys":""} className='none'>
<InteractiveHoverButton className="">{loggedIn?"Continue to the Dashboard":"Get Started"}</InteractiveHoverButton>
</a>
</div>
<div className='h-10'></div>
      </div>

    );
  };
export default Landing2
