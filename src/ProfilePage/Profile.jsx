"use client";
import React, { useState } from "react";
import { FaLaptop, FaMobileAlt, FaTabletAlt, FaUser } from "react-icons/fa";
import styles from "./Profile.module.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState([
    { label: "Full Name", value: "John Doe" },
    { label: "Email", value: "john.doe@example.com" },
    { label: "Date of Birth", value: "1990-01-01" },
    { label: "Address", value: "123 Main St, City, Country" },
  ]);

  const devices = [
    {
      icon: <FaLaptop size={24} color="#666" />,
      name: "MacBook Pro",
      location: "New York, USA",
      status: "Active now",
      isActive: true,
    },
    {
      icon: <FaMobileAlt size={24} color="#666" />,
      name: "iPhone 13",
      location: "New York, USA",
      status: "2 hours ago",
      isActive: false,
    },
    {
      icon: <FaTabletAlt size={24} color="#666" />,
      name: "iPad Pro",
      location: "New York, USA",
      status: "1 day ago",
      isActive: false,
    },
  ];

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => setIsEditing(false);

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (index, event) => {
    const newPersonalInfo = [...personalInfo];
    newPersonalInfo[index].value = event.target.value;
    setPersonalInfo(newPersonalInfo);
  };

  const handleSignOut = (deviceName) =>
    console.log(`Sign out from ${deviceName}`);

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
          <h1 className={styles.profileName}>John Doe</h1>
          <p className={styles.profileEmail}>john.doe@example.com</p>
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
                    type="text"
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
                    onClick={() => handleSignOut(device.name)}
                  >
                    Sign Out
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
