"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ProfileImageUploader() {
    const [preview, setPreview] = useState<string>("https://api.dicebear.com/7.x/initials/svg?seed=EcoWarrior&backgroundColor=10b981");
    const [loading, setLoading] = useState(false);

    // We will use a Ref to link a beautiful custom button directly to the ugly HTML file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // FETCH IMAGE ON PAGE LOAD
    useEffect(() => {
        axios.get("/api/images")
            .then(res => {
                if (res.data && res.data.base64Image) {
                    setPreview(res.data.base64Image);

                }
            })
            .catch(err => {
                console.log("No custom image found. Using default.");
            });
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            setPreview(base64String);
            setLoading(true);
            try {
                await axios.post("/api/images", { base64Image: base64String, contentType: file.type });
            } catch (error) {
                console.error("Failed To save to MongoDB", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="flex items-center gap-8">
            {/* The Actual Display Image */}
            <div
                className="relative rounded-full overflow-hidden border border-[#2D3033] shadow-lg bg-[#101214] flex-shrink-0"
                style={{ width: '96px', height: '96px', minWidth: '96px', minHeight: '96px' }}
            >
                <img
                    src={preview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                />
            </div>

            {/* Explicit Actions Panel */}
            <div className="flex flex-col gap-3 items-start">

                {/* Hidden HTML Input Component */}
                <input
                    title="Upload Profile Picture"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    ref={fileInputRef} // Linked!
                    className="hidden"
                />

                {/* The Custom Button */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="text-xs font-semibold px-5 py-2 border border-[#2D3033] rounded bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm active:scale-95"
                >
                    {loading ? "Uploading to Cloud..." : "Upload New Image"}
                </button>

                <span className="text-xs font-mono text-slate-500">
                    JPG or PNG formats. Max limit of 1MB.
                </span>
            </div>
        </div>
    );
}