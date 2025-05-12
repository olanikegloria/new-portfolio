export default function ThreeDFallbackMessage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-6 bg-secondary/20 rounded-lg cyber-border max-w-md">
        <h3 className="text-xl font-bold mb-2 gradient-text">Gaming Setup Visualization</h3>
        <p className="text-muted-foreground">
          A custom 3D gaming/developer setup will be displayed here when deployed.
          <br />
          (3D preview is not available in this environment)
        </p>
      </div>
    </div>
  )
}
