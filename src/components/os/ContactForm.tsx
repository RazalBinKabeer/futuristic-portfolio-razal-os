"use client";

import { useState } from 'react';
import { sendContactEmail } from '@/app/actions';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulated, setSimulated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError("Web3Forms access key is missing in environment variables.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          subject: `Razal OS Portfolio - Message from ${name}`,
          from_name: "Razal OS System",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setSimulated(false);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(result.message || "Failed to transmit message.");
      }
    } catch (err: any) {
      setError("Secure port communication failure. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full h-full p-6 bg-black/30 flex flex-col items-center justify-center text-center gap-4 select-none">
        <CheckCircle2 className="w-12 h-12 text-color-accent-cyan animate-pulse" />
        <div className="flex flex-col gap-1.5">
          <h4 className="h3 text-base font-mono tracking-wide text-white">TRANSMISSION SECURE</h4>
          <p className="text-xs text-text-muted max-w-sm leading-relaxed">
            Your identity packets have been successfully routed.
            {simulated ? " (Simulated transmission outputted to developer logs)" : " Message delivered successfully."}
          </p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-4 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-xs font-mono text-white cursor-pointer"
        >
          Send Another Transmission
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-full p-6 bg-black/30 flex flex-col gap-4 font-mono text-xs select-none">
      <div className="border-b border-white/5 pb-2 flex items-center justify-between">
        <span className="text-color-accent-orange text-[10px]">SECURE_MAIL_CHANNEL // PORT:587</span>
        <span className="text-text-dimmed">RECIPIENT: RAZAL</span>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-lg">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Name Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-name" className="text-text-muted">SENDER_NAME:</label>
        <input 
          id="form-name"
          type="text" 
          required
          disabled={isSubmitting}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Elena Rostova"
          className="bg-black/30 border border-white/5 focus:border-color-accent-indigo outline-none px-3 py-2.5 rounded-lg text-white font-sans text-sm transition-colors"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-email" className="text-text-muted">REPLY_EMAIL:</label>
        <input 
          id="form-email"
          type="email" 
          required
          disabled={isSubmitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. elena@nexus.com"
          className="bg-black/30 border border-white/5 focus:border-color-accent-indigo outline-none px-3 py-2.5 rounded-lg text-white font-sans text-sm transition-colors"
        />
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-1.5 flex-grow">
        <label htmlFor="form-msg" className="text-text-muted">MESSAGE_BODY:</label>
        <textarea 
          id="form-msg"
          required
          disabled={isSubmitting}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Input transmission data stream here..."
          className="bg-black/30 border border-white/5 focus:border-color-accent-indigo outline-none px-3 py-2.5 rounded-lg text-white font-sans text-sm transition-colors resize-none flex-grow min-h-[100px]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-bg-dark hover:bg-neutral-200 disabled:bg-white/20 disabled:text-text-muted transition-colors font-semibold rounded-lg text-xs tracking-wider cursor-pointer shadow-lg mt-2 font-sans"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            DISPATCHING TRANSMISSION...
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            DISPATCH SECURE TRANSMISSION
          </>
        )}
      </button>
    </form>
  );
}
