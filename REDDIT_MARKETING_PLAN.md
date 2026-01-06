# STEADYBILL: 30-Day Detailed Reddit Post Plan

This document contains the **actual text** for 30 days of Reddit posts. 
**Note:** Reddit hates "copy-paste" spam. Use these as templates—adjust the wording slightly each time to keep it organic.

---

### Week 1: Launch & Feedback
*Goal: Community building and R&D.*

#### Day 1: r/sideproject
**Title:** I was tired of messy invoices and awkward payment chasing, so I built STEADYBILL.
**Body:**
Hey r/sideproject,
I've been freelancing for years and the part I hate most isn't the work,it's the billing. Chasing clients for $50 feels like begging.
So I built STEADYBILL. It’s a modern invoicing platform with a twist:
 **Auto-Pursue**. It handles those annoying follow-ups for you so you can keep your relationship friendly while the system does the dirty work.
It’s live now at https://steadybill.pro. I’d love for a few people to stress-test the free tier (50 invoices included). What do you guys think?

#### Day 2: r/design_critiques
**Title:** Feedback requested: Does this invoice UI look "premium" enough for agencies?
**Body:**
[Attach Screenshot of a SteadyBill Invoice]
Working on a SaaS called STEADYBILL. The goal is to make invoices that actually look good—not just boring PDFs. 
I’m using a violet-faceted shield logo and a minimalist layout. My worry is that it might be *too* clean? Do you think an agency client would feel "impressed" receiving this? 
Be as harsh as you want.

#### Day 3: r/freelance
**Title:** How do you guys handle the "Where's my money?" conversation without sounding desperate?
**Body:**
I have a client who is 14 days overdue. They're a nice person, but I hate sending that "just checking in" email for the 3rd time. 
Do you guys have a specific script, or do you just wait? I'm trying to automate this part of my life because it's draining my soul.

#### Day 4: r/freelance (Follow-up)
**Title:** I built a tool that handles client follow-ups automatically.
**Body:**
Following up on my post yesterday—the consensus seems to be that we all hate chasing money. 
I actually spent the last few months coding a solution called STEADYBILL. It has an "Auto-Pursue" feature that sends the reminders for you using a "billing assistant" persona. 
I'm looking for 5 freelancers to try it out for free and tell me if it actually gets you paid faster. If you're interested, it's at steadybill.pro.

#### Day 5: r/webdev
**Title:** [Showoff Saturday] Built a high-performance billing platform (React, Node, Mongo)
**Body:**
Hey guys, finally finished the v1 of STEADYBILL. 
**Stack:** Vite/React on the front, Node/Express on the back. 
**Lessons learned:** Handling CORS for global payment gateways (Flutterwave) is a nightmare. Also, password regex validation is a trap—I originally made mine way too strict and blocked half my beta users. 
Happy to answer any tech questions!

#### Day 6: r/smallbusiness
**Title:** Tired of paying $30/mo just to send a few invoices?
**Body:**
I’m a small business owner too, and I found it ridiculous that most tools charge a "tax" just to let you bill your clients. 
I built STEADYBILL. Our Pro plan is $4.5/mo (or $1 to start). No hidden fees. If you're just starting out, the free tier gives you 50 invoices for life. 
Just trying to give back to the community. Check it out: https://steadybill.pro

#### Day 7: r/sideproject
**Title:** Week 1 Update: 10 users onboarded to STEADYBILL.
**Body:**
The feedback from this sub was amazing. I fixed the landing page responsiveness and relaxed the signup rules based on your comments. 
If you haven't checked it out, it's an invoicing tool that "auto-pursues" your late payers. 10 people joined this week—let's see where we get by Week 4!

---

### Week 2: Feature Spotlights
*Goal: Highlighting unique selling points.*

#### Day 8: r/entrepreneur
**Title:** Why the "0.3% charge" model is the future of SaaS billing.
**Body:**
Most invoicing platforms want a monthly fee + a cut of the transaction. 
At STEADYBILL, we’re keeping it low ($4.5/mo Pro) because we believe in small builders. I’d love to know: for your business, do you prefer a fixed monthly cost or a "pay-as-you-go" percentage?

#### Day 9: r/freelance
**Title:** Stop sending invoices as Word Docs or plain PDFs. 
**Body:**
Clients treat a Word Doc like a suggestion. They treat a secure payment portal like an obligation. 
I’ve seen payout speeds double just by giving the client a "Pay Now" button (Flutterwave/Stripe) instead of bank details in a footer. I built STEADYBILL to make this "Modern Checkout" accessible to everyone. 

#### Day 10: r/startups
**Title:** Integrating African Payment Gateways (Flutterwave) into a Global SaaS.
**Body:**
If you're building a global platform, don't sleep on Flutterwave. It’s been a challenge getting the CORS and subaccount logic right for our users at STEADYBILL, but it opens up a huge market. 
Anyone else working with cross-border payments right now? Let's swap notes.

#### Day 11: r/sideproject
**Title:** Is "Invoice Chatting" overkill? I built it anyway.
**Body:**
I noticed my clients and I would have 10 emails just to clarify one line item on a bill. 
In STEADYBILL, I added a chat box directly on the public invoice. You can resolve queries in seconds without leaving the page. 
Founder's intuition or feature creep? You tell me. steadybill.pro

#### Day 12: r/smallbusiness
**Title:** How to automate your retainer billing in 5 minutes.
**Body:**
If you have clients on monthly retainers, you shouldn't be manually creating invoices every month. 
I built a "Set & Forget" recurring system into STEADYBILL. Once it's set, the system bills the client and "pursues" them if they miss a date. Pure freedom. 

#### Day 13: r/entrepreneur
**Title:** How a professional invoice portal helped me close a $2,000 agency client.
**Body:**
First impressions don't stop at the pitch. If your billing process looks like you're still in college, big clients will hesitate. 
I used STEADYBILL for my latest agency deal, and the client specifically mentioned how "clean" the payment portal was. Perception is reality. 

#### Day 14: r/selfhosted
**Title:** Hypothetical: Would you use a self-hosted invoicing portal?
**Body:**
I’m currently running STEADYBILL as a SaaS, but I’ve had requests for a self-hosted version for privacy-obsessed founders. 
If I released a Dockerized version of a full invoicing/CRM/Auto-Pursue system, would that be something this sub would actually use? 

---

### Week 3: Transparency & Tech
*Goal: Building trust through "Build in Public" honesty.*

#### Day 15: r/startups
**Title:** My $0/mo Infrastructure for a Scaling SaaS.
**Body:**
Vite + React (Netlify) for the Front. Node + Express (Render/Railway) for the Back. Mongo (Atlas) for the DB. 
I’m keeping overhead at nearly zero while STEADYBILL grows. The goal is to pass those savings to the users with our $4.5/mo Pro plan. Ask me anything about the setup.

#### Day 16: r/sideproject
**Title:** The "Overly Strict Regex" that almost killed my signup conversion.
**Body:**
Funny story: I set my password requirements to `/^[A-Z][a-zA-Z]{6,10}[0-9]{1,7}[\W]{1}$/`. 
Basically, it forced a specific sequence that was impossible to guess. 50% of people quit the signup page. 
I just updated it to a standard "8 chars, letters & numbers." Check out the new, much friendlier signup at steadybill.pro. Lower friction = higher growth.

#### Day 17: r/freelance
**Title:** AMA: I’m building a tool to help you stop chasing money. 
**Body:**
I'm the founder of STEADYBILL. I'm obsessed with removing the "friction" from freelancing. 
Ask me about:
- Managing 10+ clients
- Automating late fee reminders
- Modern checkout aesthetics
- How to get paid faster
I'm around all day!

#### Day 18: r/smallbusiness
**Title:** What’s the #1 most annoying thing about your current billing software?
**Body:**
I’m building STEADYBILL to be the "Anti-Quickbooks." No clutter. No confusing accountants. 
Tell me your biggest frustration with your current tool, and I'll see if I can code a solution for it this weekend. 

#### Day 19: r/entrepreneur
**Title:** Breaking down our first X signups. 
**Body:**
Total transparency: Here’s where our traffic came from this month. Reddit has been #1. 
Lessons: Be human, don't be "salesy," and solve a real pain point (ours is chasing money). STEADYBILL is growing slowly but surely. 

#### Day 20: r/design
**Title:** Modern Glassmorphism in a Functional SaaS.
**Body:**
We went with a "Glassmorphic" design for the STEADYBILL dashboard. It uses heavy blurs and violet accents. 
Is this the new standard for B2B SaaS, or is it a trend that will die out next year?

#### Day 21: r/freelance
**Title:** Launch Special: Free Pro Access for 5 testers.
**Body:**
I want to give back to the r/freelance community. 
The first 5 people to sign up at steadybill.pro and DM me their email will get a month of Pro access (Auto-Pursue, Unlimited Clients) for free. I just want your honest feedback in return. 

---

### Week 4: Conversion & Persistence
*Goal: Converting free users to Pro.*

#### Day 22: r/sideproject
**Title:** 30 Days of STEADYBILL: The Journey so far.
**Body:**
It’s been a wild month. We fixed responsiveness, overhauled the password system, and added a "Watch Demo" section. 
Small wins add up. If you’re building something, don't stop. steadybill.pro is proof that consistency works. 

#### Day 23: r/smallbusiness
**Title:** If you’re still "chasing" money manually, you’re losing money. 
**Body:**
Your time is worth at least $50/hour. If you spend 2 hours a month checking your bank and emailing clients, you just lost $100. 
STEADYBILL Pro is $4.5/mo and does it all for you. The math is simple. 

#### Day 24: r/entrepreneur
**Title:** The "Auto-Pursue" effect: 20% faster payments for my beta users.
**Body:**
Results are in: Users who enabled Auto-Pursue are getting settled 20% faster than those who don't. 
People respond to automated system reminders faster than they respond to "nice" emails from a friend. Psychology is key to cashflow. 

#### Day 25: r/freelance
**Title:** Never beg for a payment again. 
**Body:**
It’s 2026. Your invoicing tool should be your bodyguard. 
I built STEADYBILL to handle the "hard part" of business. You do the work, the system gets the cash. Pure and simple. Try it for free at steadybill.pro.

#### Day 26: r/startups
**Title:** Handling Multi-Currency (NGN/USD/EUR) without massive fees.
**Body:**
A technical deep-dive into how we handle global payouts at STEADYBILL. If you're building a marketplace or billing tool, here's how to avoid the 3% conversion "tax" most gateways hide. 

#### Day 27: r/sideproject
**Title:** Looking for 10 'Early Adopters' for a Lifetime Discount.
**Body:**
I’m preparing to move out of the "Early Launch" phase. I want a core group of power users to help shape the roadmap. 
DM me if you're a heavy freelancer/agency owner who wants to use STEADYBILL Pro for a fraction of the cost forever. 

#### Day 28: r/entrepreneur
**Title:** The "3-Day Sprint" that fixed my landing page. 
**Body:**
My mobile conversion was trash. Turns out, my font weights were too heavy and the buttons were massive. 
One weekend of CSS refactoring later, and signups jumped 30%. Never ignore the "polish." steadybill.pro

#### Day 29: r/freelance
**Title:** Launch week is almost over—Free 50 invoices masih available!
**Body:**
Final shoutout to all the freelancers who joined. The "50 complimentary invoices" offer is still live for new users. No catch, just help. 

#### Day 30: r/smallbusiness
**Title:** STEADYBILL is officially LIVE. 
**Body:**
After 30 days of testing with this community, we are officially out of beta. 
Thank you for the design critiques, the tech advice, and the support. To celebrate, we’re keeping the Pro plan at an introductory $4.5/mo for the next month. 
Let's make 2026 the year we all get paid on time. 🚀 https://steadybill.pro
