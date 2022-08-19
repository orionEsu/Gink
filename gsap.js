const timeline = gsap.timeline({ default: { duration: 1 } });

timeline
  .from(
    '.logo-login',
    {
      duration: 0.5,
      opacity: 0,
      scale: 0,
      ease: 'back',
    },
    0.4
  )
  .from(
    '.log__input',
    {
      duration: 0.3,
      y: 50,
      rotate: 5,
      stagger: 0.2,
      opacity: 0,
      ease: 'circ.out',
    },
    '<.2'
  )
  .fromTo(
    '.log__btn',
    {
      y: 20,
    },
    {
      duration: 0.01,
      ease: 'rough',
      y: 0,
      opacity: 1,
    },
    '>'
  );

// gsap.from('.signup__btn', { duration: 0.5, y: -20, opacity: 0, ease: 'back' });

// gsap.fromTo('.log__input', {
//     // duration: .2,
//     y: -50,
//     // rotation: 10,
//     opacity: 0,
//     ease: 'block',
// }, {
//     duration: .3,
//     rotate: 0,
//     y: 0,
//     opacity: 1,
//     stagger: .5,
//     ease: 'block',
// })
