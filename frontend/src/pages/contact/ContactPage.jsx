import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  { icon: Mail, title: "Email", detail: "support@chefsense.ai" },
  { icon: MessageSquare, title: "Live Chat", detail: "Mon–Fri, 9am–5pm" },
  { icon: MapPin, title: "Office", detail: "Prayagraj, UP" },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Get in touch
          </h1>
          <p className="text-stone-600">
            We'd love to hear from you. Fill out the form and we'll get back to
            you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="border-stone-200">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-brand-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-stone-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-stone-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="border-stone-200">
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-stone-700 mb-1.5 block">
                      First name
                    </label>
                    <Input placeholder="Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700 mb-1.5 block">
                      Last name
                    </label>
                    <Input placeholder="Surname" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-1.5 block">
                    Email
                  </label>
                  <Input type="email" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-1.5 block">
                    Message
                  </label>
                  <Textarea placeholder="How can we help you?" rows={4} />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
