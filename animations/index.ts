import gsap, { Power3 } from 'gsap'

interface StaggerVars {
  opacity?: number
  [propName: string]: any
}

export const stagger = (target: gsap.TweenTarget, fromVars: StaggerVars, toVars: StaggerVars): gsap.core.Tween => {
  return gsap.fromTo(target, { opacity: 0, ...fromVars }, { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut })
}
