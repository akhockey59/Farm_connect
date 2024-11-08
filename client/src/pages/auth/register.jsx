import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [hovered, setHovered] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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
            ? "0 10px 20px rgba(255,0,255), 0 6px 6px rgba(0, 0, 139)"
            : "0 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
          transform: hovered ? "scale(1.05)" : "scale(1)", // Subtle zoom effect on hover
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{
                position: "relative",
                display: "inline-block",
                color: "#2563eb",
                textDecoration: "none",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#00008B"; // Glowing color on hover
                e.target.style.textShadow = "0 0 10px #f59e0b, 0 0 20px #f59e0b";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#f59e0b";
                e.target.style.textShadow = "none";
              }}
            >
              Login
            </Link>
          </p>
        </div>
        
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          inputStyle={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #c18788",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          inputHoverStyle={{
            boxShadow: "0px 4px 8px rgba(255, 0, 0, 0.2)",
            backgroundColor: "#c18788",
            borderColor: "#2563eb",
          }}
        />
        
      </div>
    </div>
  );
}

export default AuthRegister;