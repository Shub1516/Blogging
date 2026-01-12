// WritePostCard.jsx
"use client";
import { react, useEffect, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { FaImage, FaSpinner } from "react-icons/fa";
import { Select, SelectItem } from "@heroui/react";
import Editor from "./Editor";
import dynamic from "next/dynamic";
import { createSupabaseBrowserClient } from "../lib/supabase/client"; // Use client-side client
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { uploadToR2 } from "./actions/upload";
import { useRouter } from "next/navigation";
import defaultImage from "../../../public/placeholder-image.avif";

export default function EditPostDetails({ post }) {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || ""); // Changed to null/object for JSON
    const [categories, setCategories] = useState(new Set([]));
    const [isUploading, setIsUploading] = useState(false);
    const [bannerFile, setBannerFile] = useState(null);
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    useEffect(() => {
        if (post?.category) {
            const categoryArray =
                typeof post.category === "string"
                    ? JSON.parse(post.category)
                    : post.category;
            setCategories(new Set(categoryArray));
        }
    }, []);

    console.log("post is", categories);
    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Post not found
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the current user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            redirect("/login");
        }

        const file = await handleImageUpload();

        if (!file) {
            toast.error("Error", {
                description: "pload a file first!",
            });
        }

        //console.log("submit event is",e.target.id)
        var isPublish = false;
        if (e.target.id === "publish-button") {
            isPublish = true;
        }
        const { error } = await supabase
            .from("posts")
            .update({
                title: title,
                banner_image: file,
                content: content, // The Editor.js JSON object
                published: isPublish,
                category: Array.from(categories),
                lastmodified_at: new Date().toISOString(), // Optional: update the timestamp
            })
            .eq("id", post.id) // Matches the post where the ID equals your variable
            .eq("posted_by", user.id); // Security: ensures only the owner can update

        if (!error) {
            toast.success("Success", {
                description: "Post published successfully!",
            });
            router.refresh();
        } else {
            toast.error("Error", {
                description: "Error Posting",
            });
        }
    };

    const handleImageUpload = async (e) => {
        if (!bannerFile) return;
        //setIsUploading(true);
        const formData = new FormData();
        formData.append("file", bannerFile);

        const result = await uploadToR2(formData);

        if (result.success) {
            console.log("uploaded image", result);
            setBannerFile(result.url);
            toast.success("Banner Added!", {
                description: "Your banner is added success",
            });
            return result.url;
        } else {
            alert("Upload failed: " + result.message);
        }
        // setIsUploading(false);
    };

    const handleImage = (e) => {
        setIsUploading(true);
        const file = e.target.files[0];
        if (!file) return;
        console.log("file on edit is", file);
        setBannerFile(file);
        setIsUploading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
                {/* ... Header remains same ... */}
                <div className="relative group w-full h-64 bg-slate-100 rounded-2xl mb-8 overflow-hidden mt-3 border-2 border-dashed border-transparent hover:border-red-400 transition-all">
                    {/* The Image Display */}
                    <Image
                        src={post.banner_image || defaultImage} // Fallback if empty
                        width={900}
                        height={400}
                        alt={post.title}
                        className="w-full h-full object-contain"
                    />

                    {/* The Upload Overlay */}
                    <label
                        htmlFor="banner-upload"
                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                    >
                        {isUploading ? (
                            <FaSpinner className="animate-spin text-3xl" />
                        ) : (
                            <>
                                <FaImage className="text-3xl mb-2" />
                                <span className="text-sm font-semibold">
                                    Click to Change Banner
                                </span>
                            </>
                        )}
                    </label>

                    {/* Hidden File Input */}
                    <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage} // This triggers your existing handleImage function
                    />
                </div>
                {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
                <span className="flex justify-end text-green-500">
                    {bannerFile ? "Image added" : ""}
                </span>
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Post Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        maxLength={100}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Category
                    </label>
                    <Select
                        placeholder="Select a category"
                        selectionMode="multiple"
                        variant="bordered"
                        selectedKeys={categories}
                        onSelectionChange={setCategories}
                        // 1. Force the icon to the end using the slot prop
                        // Optional: stops the arrow from flipping
                        classNames={{
                            base: "w-full",
                            trigger: [
                                "h-14",
                                "bg-white",
                                "border-2",
                                "border-gray-100",
                                "group-data-[focus=true]:border-red-500",
                                "rounded-2xl",
                                "pr-4", // Add right padding to ensure space for the arrow
                            ],
                            // 2. Target the selector icon slot specifically
                            selectorIcon: "right-4 left-auto", // Force right alignment, remove left
                            popoverContent:
                                "bg-white border border-gray-100 shadow-xl rounded-2xl",
                            listbox: "bg-white",
                        }}
                    >
                        <SelectItem key="technology" className="rounded-xl">
                            Technology
                        </SelectItem>
                        <SelectItem key="art" className="rounded-xl">
                            Art
                        </SelectItem>
                        <SelectItem key="science" className="rounded-xl">
                            Science
                        </SelectItem>
                    </Select>
                </div>

                {/* Editor Component */}
                <div className="">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Content
                    </label>
                    <Editor
                        content={content}
                        onChange={setContent}
                        isReadOnly={false}
                    />
                </div>
                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                    {/* ... Image upload label remains same ... */}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            id="draft-button"
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            id="publish-button"
                            className="px-8 py-2 rounded-lg bg-linear-to-r from-[#f32a3b] to-pink-500 text-white font-semibold hover:opacity-90 transition"
                        >
                            Publish
                        </button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </div>
    );
}
