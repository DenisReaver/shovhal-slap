"use client";

import { useState, useEffect, useRef } from "react";
import { shovhalQuotes } from "@/lib/quotes";

export default function SlapScene() {
  const [isSlapping, setIsSlapping] = useState(false);
  const [quote, setQuote] = useState("");
  const [slapCount, setSlapCount] = useState(0);

  // Список озвученных фраз Шовхала (добавляй сколько хочешь)
  const voiceLines = [
    "/audio/shovhal_01.mp3",
    "/audio/shovhal_02.mp3",
    "/audio/shovhal_03.mp3",
    "/audio/shovhal_04.mp3",
    "/audio/shovhal_05.mp3",
    "/audio/shovhal_06.mp3",
    // добавляй сюда свои
  ];

  const slapSoundRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  // Предзагружаем звук пощёчины один раз
  useEffect(() => {
    slapSoundRef.current = new Audio("/audio/slap.mp3");
    slapSoundRef.current.preload = "auto";
  }, []);

  const slap = () => {
    if (isSlapping) return;

    setIsSlapping(true);
    setSlapCount(prev => prev + 1);

    // Рандомная цитата (текст)
    const randomQuote = shovhalQuotes[Math.floor(Math.random() * shovhalQuotes.length)];
    setQuote(randomQuote);

    // Звук пощёчины
    if (slapSoundRef.current) {
      slapSoundRef.current.currentTime = 0;
      slapSoundRef.current.play().catch(() => {}); // игнорируем ошибки автоплея
    }

    // Рандомная озвучка Шовхала
    const randomVoice = voiceLines[Math.floor(Math.random() * voiceLines.length)];
    if (voiceRef.current) voiceRef.current.pause();
    voiceRef.current = new Audio(randomVoice);
    voiceRef.current.play().catch(() => {});

    // Анимация + сброс
    setTimeout(() => {
      setIsSlapping(false);
      setTimeout(() => setQuote(""), 1500);
    }, 1800);
  };

  return (
    <>
      {/* Скрытые аудио-элементы (необязательно, но можно) */}
      <audio preload="auto" src="/audio/slap.mp3" />

      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-black/90 border-4 border-red-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Шовхал */}
            <div className="relative bg-gradient-to-b from-red-950 to-black flex items-center justify-center p-8">
              <img src="/shovhal.png" alt="Шовхал" className="max-h-96 rounded-lg shadow-2xl" />
              {quote && (
                <div className="absolute top-8 left-8 right-8 bg-red-900/95 text-white text-2xl md:text-4xl font-bold text-center p-6 rounded-xl border-4 border-red-600 animate-pulse shadow-2xl">
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
                  className={`max-h-80 transition-all duration-300 ${
                    isSlapping ? "translate-x-[-30px] rotate-12" : ""
                  }`}
                />
                {isSlapping && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-9xl font-bold text-red-600 opacity-90 animate-ping">
                      ПОЛУЧИ!
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center space-y-6">
                <button
                  onClick={slap}
                  disabled={isSlapping}
                  className={`
                    bg-red-700 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed
                    text-white text-2xl px-16 py-10 font-bold rounded-2xl
                    transform transition-all hover:scale-110 active:scale-95 shadow-2xl
                  `}
                >
                  {isSlapping ? "ЩАС ПОЛУЧИШЬ..." : "ДАТЬ ПОЩЁЧИНУ СУБО"}
                </button>

                <p className="text-gray-300 text-xl">
                  Пощёчин выдано: <span className="text-red-500 font-bold text-3xl">{slapCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}