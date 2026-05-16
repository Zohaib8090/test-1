/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows access via ngrok, bore.pub, and other external tunnels during development
  // This is a top-level property in Next.js 14.2+
  allowedDevOrigins: [
    "*.ngrok-free.app", 
    "*.bore.pub",
    "6f98-2400-adc1-1dc-7a00-80cd-a90e-a17e-b4b.ngrok-free.app"
  ],
  // Prevent native modules from being bundled by Turbopack, which causes silent Node.js crashes
  serverExternalPackages: ['sqlite3', 'sqlite'],
};

export default nextConfig;
