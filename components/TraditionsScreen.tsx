
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getBotResponse } from '../services/geminiService';

interface TraditionsScreenProps {
  onBack: () => void;
}

const RitualItem = ({ title, description }: { title: string, description: string }) => (
  <div>
    <h3 className="font-bold text-amber-900">{title}</h3>
    <p className="text-amber-800">{description}</p>
  </div>
);

// FIX: Updated onQuestionClick prop type to accept a function that returns a Promise, matching the async handleSendMessage function.
const SampleQuestionButton = ({ question, onQuestionClick }: { question: string, onQuestionClick: (q: string) => void | Promise<void> }) => (
  <button
    onClick={() => onQuestionClick(question)}
    className="bg-amber-100 text-amber-800 text-sm p-2 rounded-lg border border-amber-300 hover:bg-amber-200 transition-colors text-left"
  >
    {question}
  </button>
);

export const TraditionsScreen: React.FC<TraditionsScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', text: "Greetings! I'm Kail Podh, your guide to this festival. Feel free to ask me anything about the traditions.", sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Why do Kodavas worship weapons during Kail Podh?",
    "What traditional foods are prepared for Kail Podh?",
    "How is Kail Podh different from other festivals in Karnataka?",
    "What’s the significance of hunting in Kodava culture?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(messageText);
      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
      };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process that. Please try again.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-100 to-orange-200 p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left Column: Info */}
        <div className="flex flex-col space-y-6">
          <header>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 tracking-tight">
              👉 Rituals & Revelry of Kail Podh 🛡🌾
            </h1>
            <p className="mt-4 text-amber-800">
              Let’s explore the vibrant customs and cultural expressions that make Kail Podh a cherished Kodava festival:
            </p>
          </header>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-200/50 space-y-4">
            <RitualItem title="Katti Puje (Weapon Worship)" description="Families clean and decorate ancestral weapons, offering prayers to honor their martial lineage." />
            <RitualItem title="Traditional Dress" description="Men wear kupya-chele and women adorn themselves in elegant Kodava saris, showcasing their unique draping style." />
            <RitualItem title="Feasting & Fellowship" description="Homes prepare traditional dishes like pandi curry (pork), kadambuttu (rice dumplings), and seasonal delicacies." />
            <RitualItem title="Folk Songs & Dance" description="Community halls echo with Kodava songs, dances, and tales of bravery passed down generations." />
            <RitualItem title="Nature Reverence" description="The festival also marks respect for the forest and wildlife, aligning with the Kodava ethos of living in harmony with nature." />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <img src="https://picsum.photos/seed/tradition1/400/300" alt="Decorated weapons" className="rounded-lg shadow-md object-cover h-40 w-full" />
            <img src="https://picsum.photos/seed/tradition2/400/300" alt="Kodava folk dance" className="rounded-lg shadow-md object-cover h-40 w-full" />
            <img src="https://picsum.photos/seed/tradition3/400/300" alt="Traditional feast" className="rounded-lg shadow-md object-cover h-40 w-full" />
          </div>

          <button
            onClick={onBack}
            className="self-start bg-amber-200 text-amber-900 font-bold py-2 px-6 rounded-full hover:bg-amber-300 transition-all duration-300 border border-amber-400"
          >
            ← Back to Home
          </button>
        </div>

        {/* Right Column: Chatbot */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/80 flex flex-col h-[85vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">⚔️</div>}
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-amber-800 text-white rounded-br-none' : 'bg-amber-100 text-amber-900 rounded-bl-none'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">⚔️</div>
                <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-amber-100 text-amber-900 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-amber-200">
            {messages.length <= 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {sampleQuestions.map(q => <SampleQuestionButton key={q} question={q} onQuestionClick={handleSendMessage} />)}
                </div>
            )}
            <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about Kail Podh..."
                className="flex-1 w-full px-4 py-2 bg-amber-50 border border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-amber-800 text-white rounded-full p-2.5 hover:bg-amber-900 disabled:bg-amber-400 transition-colors"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
