"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [profile, setProfile] = useState({ role: "admin", allowedProjects: [], allowedAchievements: [] });

  useEffect(() => {
    if (auth.currentUser) {
      getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "var(--font-jetbrains-mono), monospace", background: "var(--bg-color)", minHeight: "100vh", color: "var(--text-color)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "20px", marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", letterSpacing: "2px", margin: 0 }}>ENNOVATE // ADMIN_PANEL</h1>
        <button onClick={handleLogout} style={{ background: "transparent", color: "var(--dim)", border: "1px solid var(--border)", padding: "8px 16px", cursor: "pointer", textTransform: "uppercase" }}>[ LOGOUT ]</button>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "16px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "1px dashed #333", paddingBottom: "10px" }}>STATUS: {profile.role === "superadmin" ? "SUPER_ADMIN (FULL ACCESS)" : "RESTRICTED_ADMIN"}</h2>
        <p style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>Welcome {auth.currentUser?.email}. Your permissions dictate what modules you can edit.</p>
      </section>

      {profile.role === "superadmin" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
           <div style={{ border: "1px solid var(--border)", padding: "20px", background: "rgba(255,255,255,0.02)" }}>
              <h3>Manage Admins</h3>
              <p style={{ fontSize: "11px", color: "var(--dim)" }}>Create new admins and assign them specific project/achievement IDs.</p>
              <button style={{ background: "var(--text-color)", color: "var(--bg-color)", border: "none", padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}>OPEN MODULE</button>
           </div>
           <div style={{ border: "1px solid var(--border)", padding: "20px", background: "rgba(255,255,255,0.02)" }}>
              <h3>All Projects</h3>
              <p style={{ fontSize: "11px", color: "var(--dim)" }}>Edit descriptions, tags, upload photos for any project.</p>
              <button style={{ background: "var(--text-color)", color: "var(--bg-color)", border: "none", padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}>OPEN MODULE</button>
           </div>
           <div style={{ border: "1px solid var(--border)", padding: "20px", background: "rgba(255,255,255,0.02)" }}>
              <h3>All Achievements</h3>
              <p style={{ fontSize: "11px", color: "var(--dim)" }}>Edit descriptions, titles, upload photos for any achievement.</p>
              <button style={{ background: "var(--text-color)", color: "var(--bg-color)", border: "none", padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}>OPEN MODULE</button>
           </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
           <div style={{ border: "1px solid var(--border)", padding: "20px" }}>
              <h3>Assigned Projects</h3>
              <ul style={{ paddingLeft: "20px", fontSize: "12px", color: "var(--dim)" }}>
                {profile.allowedProjects?.length > 0 ? profile.allowedProjects.map(id => <li key={id}>{id}</li>) : <li>No projects assigned. Contact Super Admin.</li>}
              </ul>
           </div>
           <div style={{ border: "1px solid var(--border)", padding: "20px" }}>
              <h3>Assigned Achievements</h3>
              <ul style={{ paddingLeft: "20px", fontSize: "12px", color: "var(--dim)" }}>
                {profile.allowedAchievements?.length > 0 ? profile.allowedAchievements.map(id => <li key={id}>{id}</li>) : <li>No achievements assigned. Contact Super Admin.</li>}
              </ul>
           </div>
        </div>
      )}
    </div>
  );
}
