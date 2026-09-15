import React, { useState } from "react";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";

type TabType = "login" | "register";

const Auth: React.FC = () => {
  const [tab, setTab] = useState<TabType>("login");

  // Form fields
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Verification & loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const changeTab = (choice: TabType) => {
    setTab(choice);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add login API logic here
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Add registration API logic here
      // On success, set pending email to switch to verification screen:
      setPendingEmail(email);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add verification API logic here
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      // Add resend code API logic here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <Card
        className="w-full max-w-md shadow-lg"
        title="Welcome to TaskFlow"
        subtitle="Sign in or create an account"
      >
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            className={`rounded-md py-2 text-sm font-semibold transition ${
              tab === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => changeTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`rounded-md py-2 text-sm font-semibold transition ${
              tab === "register"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => changeTab("register")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        ) : pendingEmail ? (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
              Enter the verification code sent to <strong>{pendingEmail}</strong>.
            </p>
            <Input
              label="Verification Code"
              type="text"
              placeholder="6-digit code"
              value={verificationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>
                setVerificationCode(e.target.value)
              }
              required
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={loading}
                onClick={handleResendVerification}
              >
                Resend Code
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setPendingEmail("");
                setVerificationCode("");
              }}
            >
              Use different email
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First Name"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLastName(e.target.value)}
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            {/* Honeypot field for bot detection */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Auth;