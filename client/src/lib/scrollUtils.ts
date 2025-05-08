/**
 * Smooth scrolling utilities for the luxury shoe shop website
 */

/**
 * Smoothly scrolls to the specified element
 * 
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (in pixels)
 * @param duration - Duration of the scroll animation in milliseconds
 */
export const scrollToElement = (elementId: string, offset = 0, duration = 1000): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Smoothly scrolls to the top of the page
 * 
 * @param duration - Duration of the scroll animation in milliseconds
 */
export const scrollToTop = (duration = 500): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Checks if an element is in the viewport
 * 
 * @param element - The DOM element to check
 * @param offset - Optional offset to adjust when the element is considered in view
 * @returns boolean - True if the element is in the viewport
 */
export const isElementInViewport = (element: HTMLElement, offset = 0): boolean => {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0 + offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
    rect.right >= 0 + offset
  );
};

/**
 * Creates a parallax scrolling effect for an element
 * 
 * @param element - The DOM element to apply the parallax effect to
 * @param speed - The speed of the parallax effect (higher means more movement)
 * @param direction - Direction of movement ('up' or 'down')
 */
export const applyParallaxEffect = (element: HTMLElement, speed = 0.5, direction = 'up'): void => {
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const translateY = direction === 'up' 
      ? scrollPosition * speed * -1 
      : scrollPosition * speed;
    
    element.style.transform = `translateY(${translateY}px)`;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Call once to set initial position
  handleScroll();
  
  // Return cleanup function to remove event listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Creates a scroll snap points array from elements with a specific class
 * 
 * @param className - The class name of elements to create snap points from
 * @param offset - Optional offset from the top of each element
 * @returns Array of scroll positions
 */
export const createScrollSnapPoints = (className: string, offset = 0): number[] => {
  const elements = document.getElementsByClassName(className);
  const snapPoints: number[] = [];
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    const position = element.offsetTop - offset;
    snapPoints.push(position);
  }
  
  return snapPoints;
};

/**
 * Find the nearest scroll snap point based on current scroll position
 * 
 * @param snapPoints - Array of scroll positions that act as snap points
 * @param currentPosition - The current scroll position
 * @returns The nearest snap point position
 */
export const findNearestSnapPoint = (snapPoints: number[], currentPosition: number): number => {
  let closestPoint = snapPoints[0];
  let closestDistance = Math.abs(currentPosition - closestPoint);
  
  for (let i = 1; i < snapPoints.length; i++) {
    const distance = Math.abs(currentPosition - snapPoints[i]);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPoint = snapPoints[i];
    }
  }
  
  return closestPoint;
};

/**
 * Scroll to the next section when scrolling down
 * 
 * @param sections - NodeList or array of section elements
 * @param offset - Optional offset from the top of each section
 */
export const setupSectionScrolling = (sections: NodeListOf<Element> | HTMLElement[], offset = 80): void => {
  let isScrolling = false;
  let currentSectionIndex = 0;
  
  const handleScroll = (e: WheelEvent) => {
    if (isScrolling) return;
    
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 800);
    
    const direction = e.deltaY > 0 ? 1 : -1;
    currentSectionIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
    
    const section = sections[currentSectionIndex] as HTMLElement;
    const position = section.offsetTop - offset;
    
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('wheel', handleScroll);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('wheel', handleScroll);
  };
};
