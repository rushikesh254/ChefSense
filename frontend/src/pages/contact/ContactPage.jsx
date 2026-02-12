import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div
      className="min-h-screen pt-20 px-4 text-stone-900"
      style={{
        background: `linear-gradient(
      180deg,
      #fff 0%,
      #fff7f2 40%,
      #ffffff 100%
    )`,
      }}
    >
      <div className="max-w-4xl mx-auto ">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            Get in touch
          </h1>
          <p className="text-stone-600">
            We&apos;d love to hear from you. Please fill out this form.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}

          <Card className="bg-gradient-to-b from-stone-50/80 to-stone-100/60 backdrop-blur-sm border-stone-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-stone-900">Email</h3>
                    <p className="text-stone-600">support@chefsense.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-stone-900">Live Chat</h3>
                    <p className="text-stone-600">Available Mon-Fri, 9am-5pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-stone-900">Office</h3>
                    <p className="text-stone-600">Prayagraj Up</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="bg-gradient-to-b from-white to-stone-50 border-stone-200 shadow-sm">
            <CardContent className="p-8">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-stone-700 mb-2 block">
                      First name
                    </label>
                    <Input placeholder="Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700 mb-2 block">
                      Last name
                    </label>
                    <Input placeholder="Surname" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="user@gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">
                    Message
                  </label>
                  <Textarea placeholder="How can we help you?" />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
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
