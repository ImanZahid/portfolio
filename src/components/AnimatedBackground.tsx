import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Dark space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Distant golden stars (far away glowing dots) */}
      {Array.from({ length: 100 }, (_, i) => (
        <motion.div
          key={`distant-star-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 223, 0, 0.4) 50%, transparent 100%)",
            boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(255, 215, 0, 0.6)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Twinkling stars */}
      {Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Shooting stars */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            width: "100px",
            left: "-100px",
            top: `${Math.random() * 80}%`,
            transformOrigin: "left center",
            rotate: "-45deg",
          }}
          animate={{
            x: ["0vw", "120vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3 + Math.random() * 2,
            repeatDelay: 5 + Math.random() * 10,
          }}
        />
      ))}

      {/* Galaxy explosion nebula clouds */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 30%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(16, 185, 129, 0.2) 30%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Explosion particles */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 360) / 20;
        const distance = 200 + Math.random() * 100;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background: `rgba(${Math.random() > 0.5 ? "139, 92, 246" : "59, 130, 246"}, 0.8)`,
              boxShadow: `0 0 10px rgba(${Math.random() > 0.5 ? "139, 92, 246" : "59, 130, 246"}, 0.8)`,
            }}
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * distance],
              y: [0, Math.sin((angle * Math.PI) / 180) * distance],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
              repeatDelay: 5 + Math.random() * 5,
            }}
          />
        );
      })}

      {/* Cosmic dust overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Distant galaxies (small spiral effects) */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`galaxy-${i}`}
          className="absolute w-20 h-20 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + (i % 3) * 30}%`,
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.2) 30%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
