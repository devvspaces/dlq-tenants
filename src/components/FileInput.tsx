"use client";

import React, { ChangeEvent, useState } from "react";

const FileInput = ({
  maxSize,
  onFileChange,
}: {
  maxSize: number;
  onFileChange: (file: File) => void;
}) => {
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    // Check for the type and size of uploaded file
    if (file) {
      if (file.type !== "text/csv") {
        setError(`File should be in csv format.`);
        return;
      } else if (file.size > maxSize) {
        setError(`File size exceeds ${maxSize / (1024 * 1024)} MB.`);
        return;
      }
      setError("");
      onFileChange(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <div className="text-sm text-[red]">{error}</div>}
    </div>
  );
};

export default FileInput;
