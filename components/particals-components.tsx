"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim" // loads tsparticles-slim

export function ParticlesComponent() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    // console.log(container);
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false, // Particles should be contained within the section
        },
        background: {
          color: {
            value: "transparent", // Background color is handled by the section
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true, // No click interaction
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse", // Particles move away on hover
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#d8a111", // White particles
          },
          links: {
            enable: false, // No links between particles
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true, // Random movement for more natural feel
            speed: 0.5, // Slower speed for subtle movement
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50, // Fewer particles overall
          },
          opacity: {
            value: 0.5,
            random: true, // Random opacity for subtle variation
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 10 }, // Wider range for size, including some bigger ones
            random: true,
          },
        },
        detectRetina: true,
      }}
    />
  )
}
