"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/elements/loading/loading";

function Profil() {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const { status, data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedName = newName || session.user.name;
    const updatedEmail = newEmail || session.user.email;
    const updatedPhone = newPhone || session.user.phone;

    await update({
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
    });
    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id,
          name: updatedName,
          email: updatedEmail,
          phone: updatedPhone,
        }),
      });

      if (response.ok) {
        router.push("/profil");
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "authenticated") {
    return (
      <div className="bg-slate-100 p-4 w-full h-full space-y-4">
        <div className="rounded-md bg-white p-4">
          <h1 className="font-bold text-slate-900 text-font-size-one p-3">
            my information
          </h1>
          <span className="border-2 w-full bg-slate-100 flex" />
          <div className="p-3 space-y-2">
            <p className="">Name: {session?.user?.name}</p>
            <p className="">Email: {session?.user?.email}</p>
            <p className="">Phone Number: {session?.user?.phone}</p>
          </div>
        </div>
        <div className="rounded-md bg-white p-4">
          <h1 className="font-bold text-slate-900 text-font-size-one p-3">
            Update Information
          </h1>
          <span className="border-2 w-full bg-slate-100 flex" />
          <form
            className="flex flex-wrap gap-4 items-center justify-center p-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="border-3 p-2 rounded-md flex-grow"
              value={newName}
              placeholder={session?.user?.name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="email"
              className="border-3 p-2 rounded-md flex-grow"
              value={newEmail}
              placeholder={session?.user?.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="text"
              className="border-3 p-2 rounded-md flex-grow"
              value={newPhone}
              placeholder={session?.user?.phone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
            <button className="bg-mainColor text-white px-6 py-2 rounded-md">
              Update
            </button>
          </form>
          {loading && <Loading />}
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-6 py-2 rounded-md"
          >
            signOut
          </button>
        </div>
      </div>
    );
  }
}

export default Profil;
