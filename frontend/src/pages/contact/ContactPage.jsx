import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, MessageSquare } from 'lucide-react'

const ContactPage = () => {
  const handleSend = (e) => {
    e.preventDefault()
    console.log('send')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border-2  p-5 rounded-lg bg-white">
        {/* header */}
        <div className="mb-10">
          <h1 className="text-3xl capitalize font-bold text-stone-900 mb-2">
            Get in touch
          </h1>
          <p className="text-stone-500 text-sm">
            We'll get back to you within 24 hours.
          </p>
        </div>

        {/* form */}
        <form className="space-y-4" onSubmit={handleSend}>
          <Input placeholder="Your name" />
          <Input type="email" placeholder="you@email.com" />
          <Textarea placeholder="How can we help you?" rows={4} />
          <Button variant="primary" type="submit" className="w-full" size="lg">
            Send Message
          </Button>
        </form>

        {/* contact info */}
        <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-5 text-sm text-stone-500">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            support@chefsense.ai
          </span>
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mon–Fri, 9am–5pm
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Prayagraj, Uttar Pradesh
          </span>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
