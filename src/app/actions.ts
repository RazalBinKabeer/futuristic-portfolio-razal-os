"use server";

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactData) {
  const { name, email, message } = data;

  // 1. Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  // Check email formatting
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // 2. Telemetry logs
  console.log(`[Razal OS Server Action] Incoming contact request from ${name} <${email}>`);

  // 3. Dispatch via Web3Forms API
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!web3formsKey) {
    console.log("=================================================");
    console.log("[Razal OS Server Action] WEB3FORMS_ACCESS_KEY missing in .env.local!");
    console.log("[SIMULATION MODE ACTIVE] Writing contact email payload:");
    console.log(`From: "${name}" <${email}>`);
    console.log(`Message Content:\n${message}`);
    console.log("=================================================");
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, simulated: true };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        name: name,
        email: email,
        message: message,
        subject: `Razal OS Portfolio - Message from ${name}`,
        from_name: "Razal OS System",
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      console.error("[Razal OS Server Action] Web3Forms API Error:", result);
      return { success: false, error: "Failed to dispatch via Web3Forms." };
    }
  } catch (error: any) {
    console.error("[Razal OS Server Action] Dispatch failure:", error);
    return { success: false, error: error.message || "Network failure during dispatch." };
  }
}
