"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { shovhalQuotes } from "@/lib/quotes";
import { Card } from "@/components/ui/card";

export default function SlapScene() {
  const [isSlapping, setIsSlapping] = useState(false);
  const [quote, setQuote] = useState("");
  const [slapCount, setSlapCount] = useState(0);

  const slap = () => {
    if (isSlapping) return;

    setIsSlapping(true);
    setSlapCount(prev => prev + 1);

    // Рандомная цитата
    const randomQuote = shovhalQuotes[Math.floor(Math.random() * shovhalQuotes.length)];
    setQuote(randomQuote);

    // Звук пощёчины (можно добавить <audio> потом)
    // new Audio("/slap-sound.mp3").play();

    setTimeout(() => {
      setIsSlapping(false);
      setTimeout(() => setQuote(""), 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full bg-black/90 border-red-800 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Шовхал */}
          <div className="relative bg-gradient-to-b from-red-950 to-black flex items-center justify-center p-8">
            <img 
              src="/shovhal.png" 
              alt="Шовхал Чупанов" 
              className="max-h-96 rounded-lg shadow-2xl"
            />
            {quote && (
              <div className={`absolute top-8 left-8 right-8 bg-red-900/95 text-white text-2xl md:text-4xl font-bold text-center p-6 rounded-xl border-4 border-red-600 animate-pulse shadow-2xl transition-all`}>
                {quote}
              </div>
            )}
          </div>

          {/* Субо + кнопка */}
          <div className="bg-black flex flex-col items-center justify-center p-12 gap-8">
            <div className="relative">
              <img 
                src={isSlapping ? "/subo-slapped.png" : "/subo-neutral.png"}
                alt="Субо"
                className={`max-h-80 transition-all duration-200 ${
                  isSlapping ? "animate-pulse scale-95" : ""
                } ${isSlapping ? "rotate-12" : "rotate-0"}`}
                style={{
                  transform: isSlapping ? "translateX(-20px) rotate(12deg)" : "rotate(0deg)",
                }}
              />
              {isSlapping && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-8xl font-bold text-red-600 opacity-80 animate-ping">
                    ПОЛУЧИ!
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <Button 
                onClick={slap}
                disabled={isSlapping}
                size="lg"
                className="bg-red-700 hover:bg-red-600 text-xl px-12 py-8 font-bold transform transition-all hover:scale-110 active:scale-95"
              >
                {isSlapping ? "Щас прилетит..." : "Дать пощёчину Субо"}
              </Button>
              <p className="text-gray-400 mt-4 text-lg">
                Пощёчин выдано: <span className="text-red-500 font-bold">{slapCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}