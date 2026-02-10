import { Button } from "@/components/ui/button"
import HeroImage from "../assets/images/hero-image.svg"

function HomePage() {
  return (
    <section className="relative flex min-h-svh items-center justify-center bg-background px-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Welcome to <span className="text-primary">QuizDot</span>
          </h1>
          <p className="max-w-md text-muted-foreground">
            Think fast. Choose smart.  
            Test your knowledge with quick, fun, and challenging quizzes.
          </p>
          <div className="flex items-center gap-4">
            <Button className="w-48 hover:scale-105 hover:shadow-xl cursor-pointer transition-transform hover:bg-primary/80" onClick={() => window.location.href = '/dashboard'}>
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={HeroImage}
            alt="Quiz illustration"
            className="w-full max-w-md select-none"
          />
        </div>
      </div>
    </section>
  )
}

export default HomePage
