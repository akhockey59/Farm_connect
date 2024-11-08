import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center bg-cover bg-center w-1/2 px-12"
        style={{
          backgroundImage: "url('https://wallpaperaccess.com/full/7214580.jpg')",
          backgroundSize: "cover",    // Ensures the image covers the container
          backgroundPosition: "center", // Keeps the image centered
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
        }}
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Farm Connect
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
