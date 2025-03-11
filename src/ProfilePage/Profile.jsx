"use client";
import React, { useState, useEffect } from "react";
import { FaLaptop, FaUser } from "react-icons/fa";
import styles from "./Profile.module.css";
import { Toaster, toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [profileName, setProfileName] = useState("John Doe");
  const [profileEmail, setProfileEmail] = useState("john.doe@example.com");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:5000/api/auth/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setPersonalInfo([
            { label: "Full Name", value: data.fullName },
            { label: "Email", value: data.email },
            { label: "Date of Birth", value: data.dateOfBirth },
            { label: "Address", value: data.address },
          ]);
          setProfileName(data.fullName);
          setProfileEmail(data.email);
        });

      fetch(`http://localhost:5000/api/auth/user/${userId}/active-devices`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.activeDevices)) {
            setDevices(
              data.activeDevices.map((device) => ({
                icon: <FaLaptop size={24} color="#666" />, // Assuming all devices use the same icon
                name: device.deviceName,
                location: device.ipAddress,
                status: new Date(device.loginTimestamp).toLocaleString(),
                id: device._id, // Ensure the _id is included
              }))
            );
          } else {
            toast.success("Error: Expected an array of devices");
          }
        });
    }
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const updatedData = {
        fullName: personalInfo.find((info) => info.label === "Full Name").value,
        email: personalInfo.find((info) => info.label === "Email").value,
        dateOfBirth: personalInfo.find((info) => info.label === "Date of Birth")
          .value,
        address: personalInfo.find((info) => info.label === "Address").value,
      };

      fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("User data updated");
          setIsEditing(false);
        })
        .catch((error) => toast.success("Error updating user data:", error));
    }
  };

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (index, event) => {
    const newPersonalInfo = [...personalInfo];
    newPersonalInfo[index].value = event.target.value;
    setPersonalInfo(newPersonalInfo);
  };

  const handleSignOut = (deviceId) => {
    const userId = localStorage.getItem("userId");
    fetch(
      `http://localhost:5000/api/auth/user/${userId}/active-devices/${deviceId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          setDevices(devices.filter((device) => device.id !== deviceId));
          toast.success("Signed out from device");
        } else {
          throw new Error("Failed to sign out from device");
        }
      })
      .catch((error) => toast.error("Error signing out from device:", error));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <FaUser size={32} color="#4a77e5" />
          </div>
          <h1 className={styles.profileName}>{profileName}</h1>
          <p className={styles.profileEmail}>{profileEmail}</p>
        </header>

        <section className={styles.infoSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            {isEditing ? (
              <div>
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
                <button className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className={styles.editButton} onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
          <div className={styles.infoGrid}>
            {personalInfo.map((info, index) => (
              <div key={index} className={styles.infoItem}>
                <label className={styles.infoLabel}>{info.label}</label>
                {isEditing ? (
                  <input
                    type={info.label === "Date of Birth" ? "date" : "text"}
                    value={info.value}
                    onChange={(event) => handleInputChange(index, event)}
                    className={styles.infoInput}
                  />
                ) : (
                  <p className={styles.infoValue}>{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.devicesSection}>
          <h2 className={styles.sectionTitle}>Active Devices</h2>
          <div className={styles.deviceList}>
            {devices.map((device, index) => (
              <article key={index} className={styles.deviceItem}>
                <div className={styles.deviceIcon}>{device.icon}</div>
                <div className={styles.deviceInfo}>
                  <h3 className={styles.deviceName}>{device.name}</h3>
                  <p className={styles.deviceLocation}>{device.location}</p>
                </div>
                <div className={styles.deviceStatus}>
                  <p
                    className={
                      device.isActive
                        ? styles.statusTextactive
                        : styles.statusText
                    }
                  >
                    {device.status}
                  </p>
                  <button
                    className={styles.signOutButton}
                    onClick={() => handleSignOut(device.id)}
                  >
                    Sign Out
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Toaster position="bottom-right" visibleToasts={1} />
      </main>
    </>
  );
};

export default Profile;
