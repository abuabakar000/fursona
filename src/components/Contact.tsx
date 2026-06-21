"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Send, Sparkles, AlertCircle, Heart } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    foundFrom: "Just wandering around 🌿",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { playSound } = useAudio();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validation
    if (!formData.name.trim() || !formData.species.trim() || !formData.message.trim()) {
      setError("Please fill out your Name, Species, and Message! 🐾");
      setIsSubmitting(false);
      playSound("pop");
      return;
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "user_default";

      if (serviceId === "service_default" || templateId === "template_default" || publicKey === "user_default") {
        console.warn("EmailJS keys are not configured in environment variables. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local to send real emails.");
      }

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            species: formData.species,
            found_from: formData.foundFrom,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        playSound("success");

        // Fire confetti for celebration!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#fb923c", "#fcd34d", "#fca5a5", "#fdba74"],
        });
      } else {
        const errText = await response.text();
        console.error("EmailJS sending failed:", errText);
        throw new Error(errText);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setIsSubmitting(false);
      setError("Oh noes! Something went wrong, try again! 😿");
      playSound("pop");
    }
  };

  const socialLinks = [
    { name: "FurAffinity", icon: "🐾", url: siteConfig.socials.furaffinity },
    { name: "Twitter/X", icon: "🐦", url: siteConfig.socials.twitter },
    { name: "Discord", icon: "💬", url: "https://discord.com" },
    { name: "Telegram", icon: "✈️", url: siteConfig.socials.telegram },
    { name: "Instagram", icon: "📸", url: "https://instagram.com" }
  ];

  return (
    <section id="contact" className="w-full px-6 py-16 md:py-24 bg-amber-50/20 border-t-2 border-dashed border-amber-200">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
            Let's Be Friends! 🐾
          </h2>
          <p className="text-orange-900/80 font-sans max-w-xl mx-auto text-base sm:text-lg">
            Spotted a cool sona? Want to chat? Send me a friendly boop message!
          </p>
        </div>

        {/* Notebook container */}
        <div className="relative">
          {/* Spiral binding rings at the top */}
          <div className="absolute top-[-18px] left-0 right-0 flex justify-around px-8 pointer-events-none z-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-3.5 h-7 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full border-2 border-gray-600 shadow-sm" />
                <div className="w-2.5 h-2.5 bg-amber-950 rounded-full -mt-1 border border-orange-900/20" />
              </div>
            ))}
          </div>

          {/* Form Sheet (Looks like notebook paper) */}
          <div className={`bg-white border-4 border-orange-950 pt-10 pb-8 px-6 md:px-12 shadow-[6px_8px_0px_rgba(120,53,4,0.15)] relative ${sketchyBorderStyles.card}`}>
            {/* Margins/Lined paper background red margin line */}
            <div className="absolute top-0 bottom-0 left-10 md:left-14 w-0.5 bg-red-400/60" />

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left relative pl-8 md:pl-12">
                {error && (
                  <div className="p-3 bg-red-50 border-2 border-red-300 text-red-800 rounded-lg flex items-center space-x-2 text-sm font-medium font-sans">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block font-comic font-bold text-orange-950 text-sm">
                      Your Name / Handle:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => playSound("click")}
                      placeholder="e.g. FluffyTail"
                      className="w-full px-4 py-2.5 bg-amber-50/20 border-2 border-orange-900/40 rounded-lg font-sans focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-medium"
                    />
                  </div>

                  {/* Fursona Species */}
                  <div className="space-y-2">
                    <label className="block font-comic font-bold text-orange-950 text-sm">
                      Your Fursona Species:
                    </label>
                    <input
                      type="text"
                      name="species"
                      value={formData.species}
                      onChange={handleChange}
                      onFocus={() => playSound("click")}
                      placeholder="e.g. Red Fox, Dragon, Bunny"
                      className="w-full px-4 py-2.5 bg-amber-50/20 border-2 border-orange-900/40 rounded-lg font-sans focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Dropdown Find Source */}
                <div className="space-y-2">
                  <label className="block font-comic font-bold text-orange-950 text-sm">
                    Where did you find me?
                  </label>
                  <select
                    name="foundFrom"
                    value={formData.foundFrom}
                    onChange={handleChange}
                    onFocus={() => playSound("click")}
                    className="w-full px-4 py-2.5 bg-white border-2 border-orange-900/40 rounded-lg font-sans focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors cursor-pointer text-sm font-medium"
                  >
                    <option value="Twitter/X">Twitter/X</option>
                    <option value="Discord">Discord</option>
                    <option value="FurAffinity">FurAffinity</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Just wandering around 🌿">Just wandering around 🌿</option>
                  </select>
                </div>

                {/* Message Box */}
                <div className="space-y-2">
                  <label className="block font-comic font-bold text-orange-950 text-sm">
                    Your Message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => playSound("click")}
                    rows={4}
                    placeholder="Say hi, share your sona, or just leave a pawprint! 🐾"
                    className="w-full px-4 py-2.5 bg-amber-50/20 border-2 border-orange-900/40 rounded-lg font-sans focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-y text-sm font-medium"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center space-x-2 px-8 py-3.5 bg-orange-500 text-white font-comic text-lg font-black border-2 border-orange-950 shadow-[4px_5px_0px_#7c2d12] hover:shadow-[1px_2px_0px_#7c2d12] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 disabled:bg-orange-350 disabled:cursor-not-allowed ${sketchyBorderStyles.button}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending boop envelope...</span>
                        <Sparkles className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Send a Boop! 🐾</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Success Speech bubble details
              <div className="py-12 px-4 md:px-8 text-center flex flex-col items-center space-y-6 pl-8 md:pl-12">
                <div className="w-20 h-20 bg-orange-100 rounded-full border-2 border-orange-500 flex items-center justify-center text-3xl animate-bounce shadow-md">
                  🎉
                </div>
                <div className="space-y-3">
                  <h3 className="font-comic text-2xl md:text-3xl font-black text-orange-950 uppercase">
                    Boop received! 🐾
                  </h3>
                  <p className="text-orange-950 max-w-md mx-auto text-sm md:text-base leading-relaxed font-sans font-medium">
                    Citrini will get back to you soon!
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", species: "", foundFrom: "Just wandering around 🌿", message: "" });
                  }}
                  className={`px-6 py-2.5 bg-amber-100 text-orange-950 font-comic font-black text-xs sm:text-sm border-2 border-orange-950 shadow-[2px_3px_0px_#451a03] hover:shadow-[1px_1px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 ${sketchyBorderStyles.button}`}
                >
                  Send another message
                </button>
              </div>
            )}

            {/* Find Me Online Row - Circular sticker style buttons */}
            <div className="pt-8 border-t border-dashed border-orange-900/10 mt-8 text-center pl-8 md:pl-12">
              <h3 className="font-comic text-base sm:text-lg font-black text-orange-950 mb-4 select-none">
                Find Me Online! 🌐
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className={`px-3 py-1.5 bg-orange-100/50 hover:bg-orange-500 hover:text-white border-2 border-orange-950 font-comic font-black text-[10px] sm:text-xs flex items-center space-x-1 shadow-[2px_2px_0px_#451a03] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1.5px_0px_#451a03] transition-all duration-150 ${sketchyBorderStyles.badge}`}
                  >
                    <span className="text-sm leading-none select-none">{social.icon}</span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
