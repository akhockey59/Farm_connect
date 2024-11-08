import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [hovered, setHovered] = useState(false);
  
  /*const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "cover",
    maxHeight: "100vh",
    backgroundImage: "url('https://th.bing.com/th/id/OIP.0liPD94pEzdC-mIkbkAHEwHaFE?rs=1&pid=ImgDetMain')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };*/
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
     // Full viewport width
    backgroundImage: "url('https://thumbs.dreamstime.com/b/close-up-image-white-smoke-clouds-against-black-background-creating-abstract-ethereal-visual-close-up-image-white-322664831.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div style={containerStyle}>
      <div
        className="mx-auto w-full max-w-md space-y-6 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          boxShadow: hovered
            ? "0 10px 20px rgba(255,0,255), 0 6px 6px rgba(0, 0, 0, 0.3)"
            : "0 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
          transform: hovered ? "scale(1.05)" : "scale(1)", // Subtle zoom effect on hover
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              style={{
                position: "relative",
                display: "inline-block",
                color: "#2563eb",
                textDecoration: "none",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#2563eb";
                e.target.style.textShadow = "none";
              }}
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;