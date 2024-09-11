import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function UpdateMultiStatus({ url, item, updated, list }) {
  const [staticItem, setStaticItem] = useState();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (item) setStaticItem(item);
  }, [item]);

  const handleStatus = (item) => {
    setActiveItem(activeItem === item.id ? null : item.id);
  };

  const handleUpdateMultiStatus = async (value) => {
    let NewValue = value;
    Swal.fire({
      title: "Update!",
      text: "Are you sure you want to change status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, changed status",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      setActiveItem(null);
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("status", NewValue);
        formData.append("_method", "put");

        try {
          const response = await updateData(url, formData, false);
          if (response.status === "success") {
            if (updated) {
              updated();
            } else {
              setStaticItem({ status: NewValue });
            }

            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 100);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  if (!staticItem) return null;

  return (
    <div
      className={`dropStatus ${staticItem.status}`}
      id={`target-${staticItem.id}`}
    >
      <span
        className={
          staticItem.status === 1
            ? "active"
            : staticItem.status === 0
            ? "inactive"
            : staticItem.status
        }
        onClick={() => handleStatus(staticItem)}
      >
        {list.find((status) => status.value === staticItem.status)?.label ||
          "Unknown"}
      </span>
      <div
        className={`listStatus ${
          activeItem === staticItem.id ? "visible" : ""
        }`}
      >
        {list.map(({ value, label }) => (
          <span
            key={value}
            className={staticItem.status === value ? `${label} disable` : label}
            onClick={() => handleUpdateMultiStatus(value)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
