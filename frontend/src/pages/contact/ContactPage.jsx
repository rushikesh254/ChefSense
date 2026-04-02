import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ContactPage() {
  // state for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // handle form submission
  function handleSend(e) {
    // check if all fields are filled

    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all the fields");
      return;
    }
    toast.success("Message sent successfully!");
    // console.log(name, email, message);
    //todo: later send the form data to backend
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border p-8">
        {/* header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-2">
            Get in touch
          </h1>
          <p className="text-stone-500 text-sm">
            We'll get back to you within 24 hours.
          </p>
        </div>

        {/* form */}
        <form className="space-y-4" onSubmit={handleSend}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@email.com"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            rows={4}
          />

          <Button
            variant="primary"
            type="submit"
            className="w-full h-11 mt-2 rounded-full font-bold"
          >
            Send Message
          </Button>
        </form>

        {/* contact info */}
        <div className="mt-10 pt-6 border-t flex flex-col gap-3 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            support@chefsense.ai
          </div>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mon–Fri, 9am–5pm
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Prayagraj, Uttar Pradesh
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
